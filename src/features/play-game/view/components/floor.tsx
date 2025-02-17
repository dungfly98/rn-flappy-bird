import React, { Component } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import R from 'res/R';

export default class Floor extends Component<any> {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageIterations = Math.ceil(width / height);

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          overflow: 'hidden',
          flexDirection: 'row',
        }}
      >
        {Array.apply(null, Array(imageIterations)).map((el, idx) => {
          return (
            <FastImage
              style={{ width: height, height: height }}
              key={idx}
              resizeMode="stretch"
              source={R.images.floor}
            />
          );
        })}
      </View>
    );
  }
}
