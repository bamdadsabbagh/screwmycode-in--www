import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import PropTypes from 'prop-types'
import PlayerComponent from '../../../components/player/player.component'
import SliderComponent from '../../../components/slider/slider.component'
import IndicatorsComponent from '../../../components/indicators/indicators.component'
import { IsYoutubeIdValidUtils } from '../../../utils/is-youtube-id-valid.utils'
import { StyledContainer, StyledTitle } from '../../../pages-styles/youtube/[id]/[speed].styles'
import { GetYoutubeThumbnailUtils } from '../../../utils/get-youtube-thumbnail.utils'
import { repeatAtom } from '../../../atoms/repeat.atom'
import { volumeAtom } from '../../../atoms/volume.atom'

const propTypes = {
    'title': PropTypes.string.isRequired,
    'url': PropTypes.string.isRequired,
    'speed': PropTypes.number.isRequired,
}

/**
 * @function
 * @name YoutubeIdPage
 * @description /youtube/[id]/[speed]
 * @param {*} props - props
 * @param {string} props.title - audio title
 * @param {string} props.url - audio url
 * @param {number} props.speed - audio speed
 * @returns {React.ReactElement} - react component
 */
export default function YoutubePage ({
    title,
    url,
    'speed': speedFromProps,
}) {

    const router = useRouter ()
    const [speed, setSpeed] = useState (speedFromProps)
    const [description, setDescription] = useState (`${title} - ${speedFromProps} - ScrewMyCode.In`)
    const [thumbnail] = useState (GetYoutubeThumbnailUtils (router.query.id))
    const [autoplay, setAutoplay] = useState (false)
    const repeat = useRecoilValue (repeatAtom)
    const [volume, setVolume] = useRecoilState (volumeAtom)

    /**
     * @function
     * @name onMount
     * @description setup autoplay capability
     */
    async function onMount () {

        // https://github.com/video-dev/can-autoplay/issues/36
        import ('can-autoplay')
            .then (module => module.default.video ())
            .then (({ result }) => {

                if (result === true) {

                    setAutoplay (true)

                } else {

                    setAutoplay (false)

                }

            })

    }

    useEffect (onMount, [])

    /**
     * @function
     * @name onSpeed
     * @description update description + route
     */
    async function onSpeed () {

        setDescription (`${title} - ${speed} - ScrewMyCode.In`)

        await router.replace (`/youtube/${router.query.id}/${speed}`)

    }

    useEffect (onSpeed, [speed])

    return (
        <>
            <Head>

                <title>{description}</title>

                <meta itemProp="description" content={description}/>
                <meta itemProp="image" content={thumbnail}/>

                <meta name="twitter:description" content={description}/>
                <meta name="twitter:image" content={thumbnail}/>

                <meta property="og:description" content={description}/>
                <meta property="og:image" content={thumbnail}/>

            </Head>
            <StyledContainer>

                <StyledTitle>
                    {title}
                </StyledTitle>

                <PlayerComponent
                    url={url}
                    playbackRate={speed}
                    loop={repeat}
                    volume={volume}
                    handleVolume={(v) => setVolume (parseFloat (v))}
                    autoplay={autoplay}
                />

                <IndicatorsComponent
                    value={speed}
                />

                <SliderComponent
                    value={speed}
                    handleValue={(s) => setSpeed (parseFloat (s))}
                />

            </StyledContainer>
        </>
    )

}

YoutubePage.propTypes = propTypes

/**
 * @function
 * @name getServerSideProps
 * @description next.js convention
 * @param {*} context - next.js context
 * @returns {*} - props to feed the above component
 */
export async function getServerSideProps (context) {

    const { id, 'speed': speedFromParams } = context.params
    let speed = parseFloat (speedFromParams) || 1

    if (speedFromParams > 1.5) speed = 1.5

    if (speedFromParams < 0.5) speed = 0.5

    const redirectResponse = {
        'redirect': {
            'destination': '/',
            'permanent': false,
        },
    }

    if (!IsYoutubeIdValidUtils (id)) return redirectResponse

    const request = await axios.get (`https://api.screwmycode.in/youtube/${id}`)
    const { 'data': response } = request

    if (!response.success) return redirectResponse

    const { title, url } = response.data

    return {
        'props': {
            title,
            url,
            speed,
        },
    }

}
