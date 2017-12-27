import React from 'react';
import PropTypes from 'prop-types';
import './WorkerViewer.css';
import starFilled from './star-filled.svg';
import star from './star.svg';

function WorkerViewer(props) {
  const { workers } = props;
  if (workers.length === 0) {
    return (
      <div className="WorkerCard">
        <p className="no-workers">No workers to swipe!</p>
      </div>);
  }
  const card = workers.map((worker, i) => (
    <div key={worker.id} className={`WorkerCard ${i === 1 ? 'undercard' : ''}`}>
      <img src={`https://robohash.org/${worker.name}?size=1000x1000`} alt={`${worker.name}`} />
      <h2>{worker.name}</h2>
      { [1, 2, 3, 4, 5].map(n => (
        <img
          className="svg"
          key={n}
          src={worker.rating >= n ? starFilled : star}
          alt="rating star"
        />
      )) }
    </div>
  ));
  return (
    <div className="container">
      { card }
      <div className="dummyCard first" />
      <div className="dummyCard second" />
    </div>
  );
}

WorkerViewer.propTypes = {
  workers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rating: PropTypes.number,
    swiped: PropTypes.bool,
    liked: PropTypes.bool,
  })).isRequired,
};

export default WorkerViewer;
