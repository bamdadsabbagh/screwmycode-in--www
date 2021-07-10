import React, { useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import PropTypes from 'prop-types'
import { speedAtom } from '../../../atoms/speed.atom'
import PlayerComponent from '../../../components/player/player.component'
import SliderComponent from '../../../components/slider/slider.component'
import IndicatorsComponent from '../../../components/indicators/indicators.component'
import { IsYoutubeIdValidUtils } from '../../../utils/is-youtube-id-valid.utils'
import { StyledContainer, StyledTitle } from '../../../pages-styles/youtube/[id].styles'

const propTypes = {
    'title': PropTypes.string.isRequired,
    'url': PropTypes.string.isRequired,
}

/**
 * @function
 * @name YoutubeIdPage
 * @description /youtube/:id
 * @param {*} props - react component props
 * @param {string} props.title - title corresponding to the current youtube id
 * @param {string} props.url - audio corresponding to the current youtube id
 * @returns {React.ReactElement} - react component
 */
export default function YoutubeIdPage ({ title, url, 'speed': speedFromProps }) {

    const router = useRouter ()
    const [speed, setSpeed] = useRecoilState (speedAtom)

    /**
     * @function
     * @name onMount
     * @description on mount: get query parameters and apply to state
     */
    function onMount () {

        if (speed === parseFloat (speedFromProps)) return

        setSpeed (parseFloat (speedFromProps))

    }

    useEffect (onMount, [])

    /**
     * @function
     * @name onSpeedChange
     * @description change url query parameter on speed change
     */
    async function onSpeedChange () {

        await router.replace (`/youtube/${router.query.id}/${speed}`, undefined, { 'shallow': true })

    }

    useEffect (onSpeedChange, [speed])

    const description = `${title} - ${speed} - ScrewMyCode.In`

    return (
        <>
            <Head>
                <title>{description}</title>
                <meta itemProp="description" content={description}/>
                <meta name="twitter:description" content={description}/>
                <meta property="og:description" content={description}/>
            </Head>
            <StyledContainer>
                <StyledTitle>
                    {title}
                </StyledTitle>
                <PlayerComponent url={url}/>
                <IndicatorsComponent/>
                <SliderComponent/>
            </StyledContainer>
        </>
    )

}

YoutubeIdPage.propTypes = propTypes

/**
 * @function
 * @name getServerSideProps
 * @description next.js convention
 * @param {*} context - next.js context
 * @returns {*} - props to feed the above component
 */
export async function getServerSideProps (context) {

    const { id, 'speed': speedFromParams } = context.params
    let speed = speedFromParams

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
