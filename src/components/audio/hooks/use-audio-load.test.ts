import {renderHook} from '@testing-library/react-hooks';

import {
  MOCK_AUDIO,
  MOCK_URL,
  SPY_AUDIO,
} from './use-audio-component.test.mock';
import {useAudioLoad} from './use-audio-load';

afterEach(() => jest.resetAllMocks());

describe('useAudioLoad', () => {
  describe('src', () => {
    it('should default to url parameter', () => {
      expect(MOCK_AUDIO.src).toBe('');
      renderHook(() => useAudioLoad(MOCK_AUDIO, MOCK_URL));
      expect(MOCK_AUDIO.src).toBe(MOCK_URL);
    });
  });

  describe('events', () => {
    it('should manage 2 events', () => {
      expect(SPY_AUDIO.addEventListener).toHaveBeenCalledTimes(0);
      expect(SPY_AUDIO.removeEventListener).toHaveBeenCalledTimes(0);

      const {unmount} = renderHook(() => useAudioLoad(MOCK_AUDIO, MOCK_URL));
      expect(SPY_AUDIO.addEventListener).toHaveBeenCalledTimes(2);
      expect(SPY_AUDIO.removeEventListener).toHaveBeenCalledTimes(2); // todo should be 0

      unmount();
      expect(SPY_AUDIO.removeEventListener).toHaveBeenCalledTimes(2);
    });

    describe('canplay', () => {
      it('should add on mount', () => {
        renderHook(() => useAudioLoad(MOCK_AUDIO, MOCK_URL));
        expect(SPY_AUDIO.addEventListener.mock.calls[0][0]).toBe('canplay');
        expect(typeof SPY_AUDIO.addEventListener.mock.calls[0][1]).toBe('function');
      });

      it('should remove on unmount', () => {
        const {unmount} = renderHook(() => useAudioLoad(MOCK_AUDIO, MOCK_URL));
        unmount();
        expect(SPY_AUDIO.removeEventListener.mock.calls[0][0]).toBe('canplay');
        expect(typeof SPY_AUDIO.removeEventListener.mock.calls[0][1]).toBe('function');
      });
    });

    describe('loadedmetadata', () => {
      it('should add on mount', () => {
        renderHook(() => useAudioLoad(MOCK_AUDIO, MOCK_URL));
        expect(SPY_AUDIO.addEventListener.mock.calls[1][0]).toBe('loadedmetadata');
        expect(typeof SPY_AUDIO.addEventListener.mock.calls[1][1]).toBe('function');
      });

      it('should remove on unmount', () => {
        const {unmount} = renderHook(() => useAudioLoad(MOCK_AUDIO, MOCK_URL));
        unmount();
        expect(SPY_AUDIO.removeEventListener.mock.calls[1][0]).toBe('loadedmetadata');
        expect(typeof SPY_AUDIO.removeEventListener.mock.calls[1][1]).toBe('function');
      });
    });
  });
});
