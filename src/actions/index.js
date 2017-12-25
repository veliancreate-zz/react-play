import { SWIPE_WORKER } from './types';

export function swipeRight(worker) {
  return {
    type: SWIPE_WORKER,
    payload: {
      id: worker.id,
      swiped: true,
      liked: true,
    },
  };
}

export function swipeLeft(worker) {
  return {
    type: SWIPE_WORKER,
    payload: {
      id: worker.id,
      swiped: true,
      liked: false,
    },
  };
}
