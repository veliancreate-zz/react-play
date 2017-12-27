import workers from './workers';
import * as types from '../actions/types';
import { swipeRight, swipeLeft } from '../actions';
import dummyWorkers from '../dummyWorkers';

describe('reducers/contentWidth', () => {
  it('get default', () => {
    expect(workers())
      .toEqual([]);
  });

  it(`should swipe left ${types.SWIPE_WORKER}`, () => {
    const expectedDummyWorkers = dummyWorkers.map(w => ({ ...w }));
    expectedDummyWorkers[3].swiped = true;
    expect(workers(dummyWorkers, swipeLeft(dummyWorkers[3].id)))
      .toEqual(expectedDummyWorkers);
  });

  it(`should swipe right ${types.SWIPE_WORKER}`, () => {
    const expectedDummyWorkers = dummyWorkers.map(w => ({ ...w }));
    expectedDummyWorkers[2].swiped = true;
    expectedDummyWorkers[2].liked = true;
    expect(workers(dummyWorkers, swipeRight(dummyWorkers[2].id)))
      .toEqual(expectedDummyWorkers);
  });

  it('unrecognised action type', () => {
    const action = {
      type: 'HUNGRY_HIPPOS',
      payload: 'payload',
    };
    expect(workers(dummyWorkers, action))
      .toEqual(dummyWorkers);
  });
});
