import { connect } from 'react-redux';
import WorkerCard from './WorkerCard';
import { swipeLeft, swipeRight } from '../../actions';

// only render two workers - less load on render
function getFirstTwoWorkers(workers) {
  const filteredAndSortedWorkers = workers
    .filter(worker => !worker.swiped)
    .sort((a, b) => a.id - b.id);
  if (filteredAndSortedWorkers.length > 2) {
    return [
      filteredAndSortedWorkers[0],
      filteredAndSortedWorkers[1],
    ];
  }
  return filteredAndSortedWorkers;
}

const mapStateToProps = state => ({
  workers: getFirstTwoWorkers(state.workers),
});

const mapDispatchToProps = dispatch => ({
  swipeLeft: worker => dispatch(swipeLeft(worker.id)),
  swipeRight: worker => dispatch(swipeRight(worker.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerCard);
