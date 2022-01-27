import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {
  IndicatorsComponent,
} from '../../components/indicators/indicators.component';
import {LoadingComponent} from '../../components/loading/loading.component';
import {MetaComponent} from '../../components/meta/meta.component';
import {
  PlayerSpeedComponent,
} from '../../components/player-speed/player-speed.component';
import {DefaultLayout} from '../default/default.layout';
import {AudioModule} from '../../modules/audio/audio.module';
import {PlayerModule} from '../../modules/player/player.module';
import {usePlayerLayout} from './hooks/use-player-layout';

const propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  provider: PropTypes.string.isRequired,
  youtubeId: PropTypes.string,
};

const defaultProps = {
  youtubeId: undefined,
};

/**
 * Layout for the player page
 *
 * @param {object} props - Component props
 * @param {string} props.title - Title of the track
 * @param {string} props.image - Base64 image of the track
 * @param {string} props.imageUrl - Image url of the track
 * @param {string} props.url - URL of the track
 * @param {number} props.speed - Speed of the track
 * @param {string} props.provider - Provider of the track (YouTube or SoundCloud)
 * @param {string} [props.youtubeId] - YouTube ID of the track
 * @returns {React.ReactElement} - Rendered component
 */
export function PlayerLayout({
  title,
  image,
  imageUrl,
  url,
  speed,
  provider,
  youtubeId = defaultProps.youtubeId,
}) {
  const {
    metaDescription,
    metaUrl,
    isLoaded,
  } = usePlayerLayout({title, speed, image});

  return (
    <>
      <Head>
        <title>{metaDescription}</title>
      </Head>
      <MetaComponent
        customTitle
        description={metaDescription}
        image={imageUrl}
        url={metaUrl}
      />
      <DefaultLayout customMeta>
        <AudioModule
          url={
            provider === 'soundcloud'
              ? url
              : `https://api.screwmycode.in/youtube/${youtubeId}/audio`
          }
        />
        {!isLoaded
          ? <>
            <LoadingComponent />
          </>
          : <>
            <PlayerModule />
            <IndicatorsComponent />
            <PlayerSpeedComponent />
          </>
        }
      </DefaultLayout>
    </>
  );
}

PlayerLayout.propTypes = propTypes;
PlayerLayout.defaultProps = defaultProps;
