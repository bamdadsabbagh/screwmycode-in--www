import {useAtom} from 'jotai';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {setArtworkAtom} from '../../../atoms/artwork.atoms';
import {setAudioTitleAtom} from '../../../atoms/audio-title.atoms';
import {isLoadedAtom} from '../../../atoms/load.atoms';
import {setPauseAtom} from '../../../atoms/play-pause.atoms';
import {setSpeedAtom} from '../../../atoms/speed.atoms';
import {
  getProviderFromRouter,
} from '../../../utils/get-provider/get-provider-from-router';
import {usePlayerLoading} from './use-player-loading';

interface UsePlayerLayoutOptions {
  title: string;
  speed: number;
  image: string;
}

interface UsePlayerLayout {
  metaDescription: string;
  metaUrl: string;
  isLoaded: boolean;
}

/**
 * Entry hook for the player layout
 * @param root0
 * @param root0.title
 * @param root0.speed
 * @param root0.image
 */
export function usePlayerLayout({
  title,
  speed,
  image,
}: UsePlayerLayoutOptions): UsePlayerLayout {
  const router = useRouter();

  const [isLoaded] = useAtom(isLoadedAtom);
  const [, setSpeed] = useAtom(setSpeedAtom);
  const [, setAudioTitle] = useAtom(setAudioTitleAtom);
  const [, setArtwork] = useAtom(setArtworkAtom);
  const [, setPause] = useAtom(setPauseAtom);

  const [metaDescription] = useState(`${title} - ${speed} - ${getProviderFromRouter(router)}`);
  const metaUrl = 'https://www.screwmycode.in/' + router.asPath;

  usePlayerLoading();

  useEffect(() => {
    setSpeed(speed.toString());
  }, [setSpeed, speed]);

  useEffect(() => {
    setAudioTitle(title);
  }, [setAudioTitle, title]);

  useEffect(() => {
    setArtwork(image);
  }, [setArtwork, image]);

  useEffect(() => () => {
    setPause();
  });

  return {
    metaDescription,
    metaUrl,
    isLoaded,
  };
}
