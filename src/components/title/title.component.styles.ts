import styled from 'styled-components';
import {mediaQueries} from '../../app/styles/breakpoints';

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  height: 100%;

  margin-bottom: 3em;

  font-size: 3em;
  font-weight: 900;

  & a {
    transition: color 200ms ease-in-out;

    &:hover {
      color: ${(props) => props.theme.highlight};
    }
  }

  ${mediaQueries.below.tablet} {
    font-size: 2em;
  }
`;
