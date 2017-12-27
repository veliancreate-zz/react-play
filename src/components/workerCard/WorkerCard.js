import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import './WorkerCard.css';
import WorkerViewer from '../workerViewer/WorkerViewer';
import Swiper from '../swiper/Swiper';

class WorkerCard extends Component {
  constructor(props) {
    super(props);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    this.state = {
      didSwipeRight: false,
      didSwipeLeft: false,
    };
  }

  componentDidMount() {
    this.manager = new Hammer.Manager(this.swipeElem);
    const Swipe = new Hammer.Swipe();
    this.manager.add(Swipe);
    this.manager.on('swipe', this.swipeListener.bind(this));
  }

  componentWillUnmount() {
    this.manager.off('swipe');
    this.manager.destroy();
  }

  swipeListener(e) {
    if (this.props.workers.length === 0) {
      return;
    }
    let deltaX = 0;
    deltaX += e.deltaX;
    const direction = e.offsetDirection;
    if (direction === 4 || direction === 2) {
      if (deltaX > 0) {
        this.swipeRight();
        return;
      }
      this.swipeLeft();
    }
  }

  swipeLeft() {
    if (this.state.didSwipeRight || this.state.didSwipeRight) {
      return;
    }
    const worker = this.props.workers[0];
    this.setState({
      didSwipeLeft: true,
      swipedWorker: worker.name,
    });
    setTimeout(() => {
      this.props.swipeLeft(worker.id);
      this.setState({
        didSwipeLeft: false,
      });
    }, 500);
  }

  swipeRight() {
    if (this.state.didSwipeRight || this.state.didSwipeRight) {
      return;
    }
    const worker = this.props.workers[0];
    this.setState({
      didSwipeRight: true,
      swipedWorker: worker.name,
    });
    setTimeout(() => {
      this.props.swipeRight(worker.id);
      this.setState({
        didSwipeRight: false,
      });
    }, 500);
  }

  render() {
    const { workers } = this.props;
    const swiper = workers.length === 0 ? null : (<Swiper
      swipeRight={this.swipeRight}
      swipeLeft={this.swipeLeft}
    />);
    return (
      <div className="worker-container">
        <div className="workers" ref={(elem) => { this.swipeElem = elem; }}>
          <WorkerViewer workers={this.props.workers} />
        </div>
        <div className={`WorkerCard undercard ${this.state.didSwipeLeft ? 'disliked' : ''}`}>
          <p className="swiped">NOPE!</p>
          <p className="swiped">{this.state.swipedWorker}</p>
        </div>
        <div className={`WorkerCard undercard ${this.state.didSwipeRight ? 'liked' : ''}`}>
          <p className="swiped">LIKED!</p>
          <p className="swiped">{this.state.swipedWorker}</p>
        </div>
        { swiper }
      </div>
    );
  }
}

WorkerCard.propTypes = {
  swipeLeft: PropTypes.func.isRequired,
  swipeRight: PropTypes.func.isRequired,
  workers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rating: PropTypes.number,
    swiped: PropTypes.bool,
    liked: PropTypes.bool,
  })).isRequired,
};

export default WorkerCard;
