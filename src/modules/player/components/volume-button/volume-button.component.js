import React from 'react'
import { Icon } from '@iconify/react'
import volumeOff from '@iconify/icons-mdi/volume-off'
import volumeHigh from '@iconify/icons-mdi/volume-high'
import { Button } from '../../player.module.styles'
import { useStore } from '../../../../store'

/**
 * @returns {React.ReactElement} react component
 */
export function VolumeButtonComponent () {

    const volume = useStore ((state) => state.volume)
    const isMuted = useStore ((state) => state.isMuted)

    return (
        <>
            <Button>
                {volume === 0 || isMuted
                    ? <Icon icon={volumeOff}/>
                    : <Icon icon={volumeHigh}/>
                }
            </Button>
        </>
    )

}