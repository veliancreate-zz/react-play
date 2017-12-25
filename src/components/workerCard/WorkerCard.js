import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WorkerCard.css';
import WorkerViewer from '../workerViewer/WorkerViewer';
import Swiper from '../swiper/Swiper';

class WorkerCard extends Component {
  constructor(props) {
    super(props);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
  }

  swipeLeft(worker) {
    this.props.swipeLeft(worker);
  }

  swipeRight(worker) {
    this.props.swipeRight(worker);
  }

  render() {
    const overWorker = this.props.workers[0];
    const underWorker = this.props.workers[1];
    const overWorkerName = overWorker ? overWorker.name : '';
    const underWorkerName = underWorker ? underWorker.name : '';
    const swiper = overWorker ? (<Swiper
      worker={overWorker}
      swipeRight={this.swipeRight}
      swipeLeft={this.swipeLeft}
    />) : null;
    const workerViewer = overWorker ? (<WorkerViewer
      overWorkerName={overWorkerName}
      underWorkerName={underWorkerName}
    />) : <div className="WorkerCard"><p>No workers to swipe!</p></div>;
    return (
      <div className="worker-container">
        { workerViewer }
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
