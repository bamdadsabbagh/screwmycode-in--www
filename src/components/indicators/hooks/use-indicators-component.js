import { useMemo } from 'react'
import speedToPercentage from 'speed-to-percentage'
import speedToSemitones from 'speed-to-semitones'
import { useAtom } from 'jotai'
import { speedAtom } from '../../../atoms/speed.atoms'

/**
 * @returns {{string, string}} indicators values
 */
export function useIndicatorsComponent () {

    const [speed] = useAtom (speedAtom)
    const percentage = useMemo (() => speedToPercentage (speed, 1).toString (), [speed])
    const semitones = useMemo (() => speedToSemitones (speed, 1).toString (), [speed])

    return {
        percentage,
        semitones,
    }
    
}