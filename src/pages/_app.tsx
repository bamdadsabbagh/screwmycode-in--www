/* eslint-disable react/forbid-prop-types */
import 'sass-reset';

import {AppProps} from 'next/app';
import React, {ReactElement} from 'react';
import {ThemeWrapper} from 'src/app/components/theme-wrapper/theme-wrapper';
import {HeaderComponent} from 'src/components/header/header.component';

import {useApp} from '../app/hooks/use-app/use-app';

// noinspection JSUnusedGlobalSymbols
export default function MyApp({Component, pageProps}: AppProps): ReactElement {
  useApp();

  return (
    <ThemeWrapper>
      <>
        <HeaderComponent />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </>
    </ThemeWrapper>
  );
}
