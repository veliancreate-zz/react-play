import React from 'react';
import PropTypes from 'prop-types';
import './Swiper.css';
import tick from './tick.svg';
import cross from './cross.svg';

function Swiper(props) {
  return (
    <div>
      <button onClick={props.swipeLeft}>
        <img className="cross" src={cross} alt="left" />
      </button>
      <button onClick={props.swipeRight}>
        <img className="tick" src={tick} alt="right" />
      </button>
    </div>
  );
}

Swiper.propTypes = {
  swipeLeft: PropTypes.func.isRequired,
  swipeRight: PropTypes.func.isRequired,
};

export default Swiper;
