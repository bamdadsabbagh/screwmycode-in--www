import {useEffect} from 'react';

declare global {
  interface HTMLAudioElement {
    mozPreservesPitch: boolean;
    preservesPitch: boolean;
  }
}

/**
 * Hook to set the pitch of the audio element
 * @param audio
 */
export function useAudioPitch(audio: HTMLAudioElement): void {
  useEffect(() => {
    if (!(audio instanceof HTMLAudioElement)) {
      return;
    }

    audio.mozPreservesPitch = false;
    audio.preservesPitch = false;
  }, [audio]);
}
