import styled from 'styled-components';
import {mapRange} from '../../../../utils/map-range/map-range';

export const Image = styled.img`
  // global
  object-fit: cover;
  position: fixed;
  z-index: -1;
  transform: translate(-50%, -50%);

  // sizes
  width: 90%;
  max-width: 800px;

  height: ${({width}) => width}px;
  max-height: 800px;

  // filters
  filter: ${({speed}) => {
    const sepia = Math.round(mapRange(speed, 0.84, 1, 100, 0, true));
    const hueRotate = Math.round(mapRange(speed, 0.84, 1, 250, 0, true));
    const saturate = Math.round(mapRange(speed, 0.84, 1, 500, 100, true));
    const blur = Math.round(mapRange(speed, 0.84, 1, 10, 5, true));

    return `
      sepia(${sepia}%)
      hue-rotate(${hueRotate}deg)
      saturate(${saturate}%)
      blur(${blur}px)
      opacity(0.3)
    `;
  }};
`;
