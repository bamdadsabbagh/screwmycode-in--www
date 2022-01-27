import React from 'react';
import {render as defaultRender} from '@testing-library/react';
import {HowlerComponent} from './howler.component';

const render = () => {
  const {container} = defaultRender(
    <HowlerComponent url="http://localhost" />,
  );

  return {
    container,
  };
};

describe('HowlerComponent', () => {
  describe('container', () => {
    it('should be in the document and visible', () => {
      const {container} = render();
      expect(container).toBeInTheDocument();
      expect(container).toBeVisible();
    });
  });
});