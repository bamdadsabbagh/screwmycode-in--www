import {render as defaultRender} from '@testing-library/react';
import React from 'react';

import {ThemeWrapper} from '../../app/components/theme-wrapper/theme-wrapper';
import {DefaultLayout} from './default.layout';

const render = () => {
  function Children() {
    return <span>test</span>;
  }

  const {container} = defaultRender(
    <ThemeWrapper>
      <DefaultLayout>
        <Children />
      </DefaultLayout>
    </ThemeWrapper>,
  );

  return {
    container,
  };
};

describe('DefaultLayout', () => {
  describe('container', () => {
    it('should be in the document, visible and not empty', () => {
      const {container} = render();
      expect(container).toBeInTheDocument();
      expect(container).toBeVisible();
      expect(container).not.toBeEmptyDOMElement();
    });
  });
});
