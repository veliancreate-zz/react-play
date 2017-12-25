import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../initialState';
import WorkerCardContainer from './WorkerCardContainer';
import WorkerCard from './WorkerCard';
import { swipeRight, swipeLeft } from '../../actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe(__filename, () => {
  describe('Passing the right props', () => {
    const workers = [
      {
        id: 3,
        name: 'Hilary Clinton',
        rating: 3,
        liked: false,
        swiped: false,
      },
      {
        id: 2,
        name: 'Replicant Z89765',
        rating: 4,
        liked: false,
        swiped: false,
      },
      {
        id: 4,
        name: 'George W. Bush',
        rating: 3,
        liked: false,
        swiped: false,
      },
      {
        id: 1,
        name: 'Margaret Thatcher',
        rating: 3,
        liked: false,
        swiped: false,
      },
    ];

    const propsTestInitialState = { workers };

    it('passes the first two workers', () => {
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([workers[3], workers[1]]);
    });

    it('will only pass sorted and filtered workers', () => {
      propsTestInitialState.workers[3].swiped = true;
      propsTestInitialState.workers[1].swiped = true;
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([workers[0], workers[2]]);
    });

    it('will pass undefined as the second item if unswiped workers is 1', () => {
      propsTestInitialState.workers[0].swiped = true;
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([workers[2], undefined]);
    });

    it('will pass both as undefined if all are swiped', () => {
      propsTestInitialState.workers[0].swiped = true;
      propsTestInitialState.workers[1].swiped = true;
      propsTestInitialState.workers[2].swiped = true;
      propsTestInitialState.workers[3].swiped = true;
      const store = mockStore(propsTestInitialState);
      const wrapper = shallow(<WorkerCardContainer store={store} />);
      const props = wrapper.find(WorkerCard).props();
      expect(props.workers).toEqual([undefined, undefined]);
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
      const expectedAction = swipeLeft(workers[0]);
      const props = wrapper.find(WorkerCard).props();
      props.swipeLeft(workers[0]);
      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('should dispatch swipeRight action', () => {
      const expectedAction = swipeRight(workers[0]);
      const props = wrapper.find(WorkerCard).props();
      props.swipeRight(workers[0]);
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});
