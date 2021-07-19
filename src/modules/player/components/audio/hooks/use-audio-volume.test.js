import { renderHook } from '@testing-library/react-hooks'
import { useAudioVolume } from './use-audio-volume'

describe ('useAudioVolume', () => {

    describe ('volume', () => {

        it ('should default to 1', () => {

            const ref = {
                'current': {
                    'volume': undefined,
                },
            }

            renderHook (() => useAudioVolume (ref))

            expect (ref.current.volume).toBe (1)
        
        })
    
    })

    describe ('volumechange event listener', () => {

        it ('should be added on mount', () => {

            const ref = {
                'current': {
                    'addEventListener': jest.fn (),
                },
            }

            expect (ref.current.addEventListener).toHaveBeenCalledTimes (0)

            renderHook (() => useAudioVolume (ref))

            expect (ref.current.addEventListener).toHaveBeenCalledTimes (1)

        })

        it ('should be removed on unmount', () => {

            const ref = {
                'current': {
                    'addEventListener': jest.fn (),
                    'removeEventListener': jest.fn (),
                },
            }

            const { unmount } = renderHook (() => useAudioVolume (ref))

            expect (ref.current.removeEventListener).toHaveBeenCalledTimes (0)

            unmount ()

            expect (ref.current.removeEventListener).toHaveBeenCalledTimes (1)

        })
    
    })

})