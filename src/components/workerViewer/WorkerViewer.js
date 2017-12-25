import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WorkerViewer.css';

class WorkerViewer extends Component {
  fooBar() {
    console.log(this.props);
  }

  render() {
    const { overWorkerName, underWorkerName } = this.props;
    return (
      <div>
        <div className="WorkerCard">
          <img src={`https://robohash.org/${overWorkerName}?size=1000x1000`} alt={`${overWorkerName}`} />
        </div>
        {
          underWorkerName !== ''
            ? <div className="WorkerCard undercard"><img src={`https://robohash.org/${underWorkerName}?size=1000x1000`} alt={`${underWorkerName}`} /></div>
            : null
        }
      </div>
    );
  }
}

WorkerViewer.propTypes = {
  overWorkerName: PropTypes.string.isRequired,
  underWorkerName: PropTypes.string.isRequired,
};

export default WorkerViewer;
