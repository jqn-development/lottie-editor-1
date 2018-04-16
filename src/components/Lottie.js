import React, { Component } from 'react';

import lottie from 'lottie-web/build/player/lottie.min';

import Full from './Full';
import Landing from './Landing';

export default class Lottie extends Component {
  state = { err: false };

  componentWillUnmount() {
    if (this.animation) this.ref.destroy();
  }

  play = wrapper => {
    try {
      this.ref = lottie.loadAnimation({
        autoplay: true,
        loop: true,
        ...this.props.config,
        animationData: this.props.src,
        renderer: 'svg',
        wrapper
      });
    } catch (err) {
      this.setState({ err: true });
    }
  };

  render() {
    const { err } = this.state;

    const { fallback, landing, dimensions } = this.props;

    if (err) {
      if (!fallback) return null;

      if (landing) return <Landing>{fallback}</Landing>;

      return fallback;
    }

    const maxHeight = (dimensions && dimensions.height) || null;
    const width = (dimensions && dimensions.width) || null;

    const animation = (
      <Full style={{ maxHeight, width }}>
        <div ref={this.play} />
      </Full>
    );

    if (landing) return <Landing>{animation}</Landing>;

    return animation;
  }
}