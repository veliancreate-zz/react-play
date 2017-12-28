import SWIPE_WORKER from './types';
import { swipeRight, swipeLeft } from './';

describe('Actions', () => {
  it('swipeLeft', () => {
    expect(swipeRight(1)).toEqual({
      type: SWIPE_WORKER,
      payload: {
        id: 1,
        swiped: true,
        liked: true,
      },
    });
  });
  it('swipeRight', () => {
    expect(swipeLeft(2)).toEqual({
      type: SWIPE_WORKER,
      payload: {
        id: 2,
        swiped: true,
        liked: false,
      },
    });
  });
});
