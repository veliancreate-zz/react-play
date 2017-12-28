import React from 'react';
import sinon from 'sinon';
import Hammer from 'hammerjs';
import { EventEmitter } from 'events';
import { shallow } from 'enzyme';
import WorkerCard from './WorkerCard';
import WorkerViewer from '../workerViewer/WorkerViewer';
import Swiper from '../swiper/Swiper';
import dummyWorkers from '../../dummyWorkers';

class FakeHammerManager extends EventEmitter {
  add() {
    return this;
  }
}

describe('WorkerCard', () => {
  let sandbox;
  let props;
  let clock;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    clock = sinon.useFakeTimers();
    props = {
      workers: dummyWorkers,
      swipeLeft: sandbox.stub(),
      swipeRight: sandbox.stub(),
    };
    sandbox.stub(Hammer, 'Manager').returns(new FakeHammerManager());
    sandbox.stub(Hammer, 'Swipe').returns({});
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  function swipeLeftExpectations(instance) {
    expect(instance.state.didSwipeLeft).toBe(true);
    expect(instance.state.swipedWorker).toBe('Hilary Clinton');
    clock.tick(510);
    expect(instance.state.didSwipeLeft).toBe(false);
    expect(props.swipeLeft.callCount).toBe(1);
  }

  function swipeRightExpectations(instance) {
    expect(instance.state.didSwipeRight).toBe(true);
    expect(instance.state.swipedWorker).toBe('Hilary Clinton');
    clock.tick(510);
    expect(instance.state.didSwipeRight).toBe(false);
    expect(props.swipeRight.callCount).toBe(1);
  }

  it('does not render swiper if there is no workers', () => {
    props.workers = [];
    const wrapper = shallow(<WorkerCard {...props} />);
    expect(wrapper.find(Swiper).length).toBe(0);
  });

  it('renders swiper if there are workers', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    expect(wrapper.find(Swiper).length).toBe(1);
  });

  it('renders WorkerViewer', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    expect(wrapper.find(WorkerViewer).length).toBe(1);
  });

  it('swipeRight', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    const instance = wrapper.instance();
    instance.swipeRight();
    expect(instance.state.didSwipeRight).toBe(true);
    expect(instance.state.swipedWorker).toBe('Hilary Clinton');
    clock.tick(510);
    expect(instance.state.didSwipeRight).toBe(false);
    expect(props.swipeRight.callCount).toBe(1);
  });

  it('swipeLeft', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    const instance = wrapper.instance();
    instance.swipeLeft();
    expect(instance.state.didSwipeLeft).toBe(true);
    expect(instance.state.swipedWorker).toBe('Hilary Clinton');
    clock.tick(510);
    expect(instance.state.didSwipeLeft).toBe(false);
    expect(props.swipeLeft.callCount).toBe(1);
  });

  it('adds liked class to first feedback on swipeRight and removes after 500ms', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    const instance = wrapper.instance();
    instance.swipeRight();
    wrapper.update();
    expect(wrapper.find('.feedback').last().props().className.includes('liked')).toBe(true);
    clock.tick(510);
    wrapper.update();
    expect(wrapper.find('.feedback').last().props().className.includes('liked')).toBe(false);
  });

  it('adds liked class to first feedback on swipeLeft and removes after 500ms', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    const instance = wrapper.instance();
    instance.swipeLeft();
    wrapper.update();
    expect(wrapper.find('.feedback').first().props().className.includes('disliked')).toBe(true);
    clock.tick(510);
    wrapper.update();
    expect(wrapper.find('.feedback').first().props().className.includes('disliked')).toBe(false);
  });

  it('will call swipe right when swiped with positive value', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    const instance = wrapper.instance();
    instance.manager.emit('swipe', { deltaX: 1, offsetDirection: 4 });
    swipeRightExpectations(instance);
  });

  it('will call swipe left when swiped with negative value', () => {
    const wrapper = shallow(<WorkerCard {...props} />);
    const instance = wrapper.instance();
    instance.manager.emit('swipe', { deltaX: -1, offsetDirection: 4 });
    swipeLeftExpectations(instance);
  });
});
