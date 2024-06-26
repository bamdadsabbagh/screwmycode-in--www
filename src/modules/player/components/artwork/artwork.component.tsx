import React, {ReactElement} from 'react';
import {isDesktop} from 'react-device-detect';
import {WebGlComponent} from './components/web-gl/web-gl.component';
import {NativeComponent} from './components/native/native.component';

export function ArtworkComponent(): ReactElement {
  return <div>{isDesktop ? <WebGlComponent /> : <NativeComponent />}</div>;
}
