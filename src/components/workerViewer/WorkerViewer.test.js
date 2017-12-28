import React from 'react';
import { shallow } from 'enzyme';
import WorkerViewer from './WorkerViewer';
import dummyWorkers from '../../dummyWorkers';

describe('WorkerViewer', () => {
  let props

  beforeEach(() => {
    props = {
      workers: [dummyWorkers[0], dummyWorkers[1]],
    };
  });

  it('will render the message if no workers', () => {
    props.workers = [];
    const wrapper = shallow(<WorkerViewer {...props} />);
    expect(wrapper.find('.no-workers').text()).toBe('No workers to swipe!');
  });

  it('will not render the message if no workers', () => {
    const wrapper = shallow(<WorkerViewer {...props} />);
    expect(wrapper.find('.no-workers').length).toBe(0);
  });

  it('will render over card and undercard', () => {
    const wrapper = shallow(<WorkerViewer {...props} />);
    expect(wrapper.find('.WorkerCard').length).toBe(2);
    expect(wrapper.find('.undercard').length).toBe(1);
  });

  it('will render image with robot name', () => {
    const wrapper = shallow(<WorkerViewer {...props} />);
    expect(wrapper.find('img').first().props().src).toBe('https://robohash.org/Hilary Clinton?size=1000x1000');
    expect(wrapper.find('img').first().props().alt).toBe('Hilary Clinton');
  });

  it('will render ratings', () => {
    const wrapper = shallow(<WorkerViewer {...props} />);
    const firstWorker = wrapper.find('.WorkerCard').first();
    const svgs = firstWorker.find('.svg');
    let ratings = 0;
    svgs.forEach((svg) => {
      if (svg.props().src === 'star-filled.svg') {
        ratings += 1;
      }
    });
    expect(ratings).toBe(dummyWorkers[0].rating);
  });
});
