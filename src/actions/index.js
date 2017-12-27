import { SWIPE_WORKER } from './types';

export function swipeRight(workerId) {
  return {
    type: SWIPE_WORKER,
    payload: {
      id: workerId,
      swiped: true,
      liked: true,
    },
  };
}

export function swipeLeft(workerId) {
  return {
    type: SWIPE_WORKER,
    payload: {
      id: workerId,
      swiped: true,
      liked: false,
    },
  };
}
