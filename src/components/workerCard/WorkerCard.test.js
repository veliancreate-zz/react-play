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
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    props = {
      workers: dummyWorkers,
      swipeLeft: sandbox.stub(),
      swipeRight: sandbox.stub(),
    };
    sinon.stub(Hammer, 'Manager').returns(new FakeHammerManager());
    sinon.stub(Hammer, 'Swipe').returns({});
  });

  it('does not render swiper if there is no workers', () => {
    props.workers = [];
    const wrapper = shallow(<WorkerCard props={{ ...props }} />);
    expect(wrapper.find(Swiper).length).toBe(0);
  });
});
