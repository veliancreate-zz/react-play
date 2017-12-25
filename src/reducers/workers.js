import { SWIPE_WORKER } from '../actions/types';

function workers(state = [], action = {}) {
  switch (action.type) {
    case SWIPE_WORKER: {
      console.log(action);
      const swipedWorkerInfo = action.payload;
      return state.map((worker) => {
        if (worker.id === swipedWorkerInfo.id) {
          worker.swiped = true;
          worker.liked = swipedWorkerInfo.liked;
        }
        return {
          ...worker,
        };
      });
    }
    default:
      return state;
  }
}

export default workers;
