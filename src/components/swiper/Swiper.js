import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Swiper.css';
import tick from './tick.svg';
import cross from './cross.svg';

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.swipeRight = this.swipeRight.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
  }

  swipeRight() {
    this.props.swipeRight(this.props.worker);
  }

  swipeLeft() {
    this.props.swipeLeft(this.props.worker);
  }

  render() {
    return (
      <div>
        <button onClick={this.swipeLeft}>
          <img src={cross} alt="left" />
        </button>
        <button onClick={this.swipeRight}>
          <img src={tick} alt="right" />
        </button>
      </div>
    );
  }
}

Swiper.propTypes = {
  swipeLeft: PropTypes.func.isRequired,
  swipeRight: PropTypes.func.isRequired,
  worker: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rating: PropTypes.number,
    swiped: PropTypes.bool,
    liked: PropTypes.bool,
  }).isRequired,
};

export default Swiper;
