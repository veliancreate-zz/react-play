import { connect } from 'react-redux';
import WorkerCard from './WorkerCard';
import { swipeLeft, swipeRight } from '../../actions';

// only render two workers - less load on render
function getFirstTwoWorkers(workers) {
  const filteredAndSortedWorkers = workers
    .filter(worker => !worker.swiped)
    .sort((a, b) => a.id - b.id);
  return [
    filteredAndSortedWorkers[0],
    filteredAndSortedWorkers[1],
  ];
}

const mapStateToProps = state => ({
  workers: getFirstTwoWorkers(state.workers),
});

const mapDispatchToProps = dispatch => ({
  swipeLeft: worker => dispatch(swipeLeft(worker)),
  swipeRight: worker => dispatch(swipeRight(worker)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerCard);
