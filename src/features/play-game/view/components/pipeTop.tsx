import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import R from 'res/R';

export default class PipeTop extends Component<any> {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <FastImage
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
        }}
        resizeMode="stretch"
        source={R.images.pipeTop}
      />
    );
  }
}
