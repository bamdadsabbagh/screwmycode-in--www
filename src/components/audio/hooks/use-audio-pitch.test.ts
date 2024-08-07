import {renderHook} from '@testing-library/react-hooks';

import {MOCK_AUDIO} from './use-audio-component.test.mock';
import {useAudioPitch} from './use-audio-pitch';

declare global {
  interface HTMLAudioElement {
    mozPreservesPitch: boolean;
  }
}

afterEach(() => jest.resetAllMocks());

describe('useAudioPitch', () => {
  describe('mozPreservesPitch', () => {
    it('should default to false', () => {
      renderHook(() => useAudioPitch(MOCK_AUDIO));
      expect(MOCK_AUDIO.mozPreservesPitch).toBe(false);
    });
  });
});
