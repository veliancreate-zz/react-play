import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../initialState';
import dummyWorkers from '../../dummyWorkers';
import WorkerCardContainer from './WorkerCardContainer';
import WorkerCard from './WorkerCard';
import { swipeRight, swipeLeft } from '../../actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe(__filename, () => {
  describe('Passing the right props', () => {
    const propsTestInitialState = { workers: dummyWorkers };

    it('passes the first two workers', () => {
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([dummyWorkers[0], dummyWorkers[1]]);
    });

    it('will only pass sorted and filtered workers', () => {
      propsTestInitialState.workers[0].swiped = true;
      propsTestInitialState.workers[1].swiped = true;
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([dummyWorkers[2], dummyWorkers[3]]);
    });

    it('will pass one item if unswiped workers is 1', () => {
      propsTestInitialState.workers[2].swiped = true;
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([dummyWorkers[3]]);
    });

    it('will pass both as undefined if all are swiped', () => {
      propsTestInitialState.workers[0].swiped = true;
      propsTestInitialState.workers[1].swiped = true;
      propsTestInitialState.workers[2].swiped = true;
      propsTestInitialState.workers[3].swiped = true;
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([]);
    });
  });

  describe('Dispatching actions', () => {
    const { workers } = initialState;
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = shallow(<WorkerCardContainer store={store} />);
    });

    it('should dispatch swipeLeft action', () => {
      const expectedAction = swipeLeft(workers[0].id);
      const props = wrapper.find(WorkerCard).props();
      props.swipeLeft(workers[0]);
      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('should dispatch swipeRight action', () => {
      const expectedAction = swipeRight(workers[0].id);
      const props = wrapper.find(WorkerCard).props();
      props.swipeRight(workers[0]);
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});
