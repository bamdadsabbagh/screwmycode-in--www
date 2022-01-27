import React from 'react';
import {render as defaultRender} from '@testing-library/react';
import TopPage from '../pages/top';
import {
  WithStyledComponents,
} from '../app/components/with-styled-components/with-styled-components';

const render = () => {
  const {container} = defaultRender(
    <WithStyledComponents>
      <TopPage
        top={[
          {
            id: '1',
            title: 'title',
            description: 'description',
            url: 'url',
            image: 'image',
            date: 'date',
          },
        ]}
      />
    </WithStyledComponents>,
  );

  return {
    container,
  };
};

describe('TopPage', () => {
  describe('container', () => {
    it('should be in the document, visible and not empty', () => {
      const {container} = render();
      expect(container).toBeInTheDocument();
      expect(container).toBeVisible();
      expect(container).not.toBeEmptyDOMElement();
    });
  });
});