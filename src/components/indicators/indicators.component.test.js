import React from 'react';
import { render as defaultRender, screen } from '@testing-library/react';
import { IndicatorsComponent } from './indicators.component';
import { WithStyledComponents } from '../../app/components/with-styled-components/with-styled-components';

const render = () => {
  const { container } = defaultRender (
    <WithStyledComponents>
      <IndicatorsComponent />
    </WithStyledComponents>,
  );

  return {
    container,
    percentage: {
      title: screen.getByRole ('heading', { name: 'percentage' }),
      value: screen.getByRole ('textbox', { name: 'percentage' }),
    },
    semitones: {
      title: screen.getByRole ('heading', { name: 'semitones' }),
      value: screen.getByRole ('textbox', { name: 'semitones' }),
    },
  };
};

describe ('IndicatorsComponent', () => {
  describe ('container', () => {
    it ('should be in the document', () => {
      const { container } = render ();
      expect (container).toBeInTheDocument ();
    });

    it ('should be visible', () => {
      const { container } = render ();
      expect (container).toBeVisible ();
    });

    it ('should not be empty', () => {
      const { container } = render ();
      expect (container).not.toBeEmptyDOMElement ();
    });
  });

  describe ('percentage', () => {
    describe ('title', () => {
      it ('should be visible', () => {
        const { percentage } = render ();
        expect (percentage.title).toBeVisible ();
      });

      it ('should display percent', () => {
        const { percentage } = render ();
        expect (percentage.title).toHaveTextContent ('percent');
      });
    });

    describe ('value', () => {
      it ('should be disabled', () => {
        const { percentage } = render ();
        expect (percentage.value).toBeDisabled ();
      });

      it ('should display 0.0 %', () => {
        const { percentage } = render ();
        expect (percentage.value).toHaveValue ('0.0 %');
      });
    });
  });

  describe ('semitones', () => {
    describe ('title', () => {
      it ('should be visible', () => {
        const { semitones } = render ();
        expect (semitones.title).toBeVisible ();
      });

      it ('should display percent', () => {
        const { semitones } = render ();
        expect (semitones.title).toHaveTextContent ('semitone');
      });
    });

    describe ('value', () => {
      it ('should be disabled', () => {
        const { semitones } = render ();
        expect (semitones.value).toBeDisabled ();
      });

      it ('should display 0.0 st', () => {
        const { semitones } = render ();
        expect (semitones.value).toHaveValue ('0.0 st');
      });
    });
  });
});
