import React from 'react';
import { Animated } from 'react-native';
import R from 'res/R';

export default class Bird extends React.Component<any> {
  private animatedValue: any;

  constructor(props: any) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.body.velocity.y);
  }

  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    this.animatedValue.setValue(this.props.body.velocity.y);
    const rotation = this.animatedValue.interpolate({
      inputRange: [-10, 0, 10, 20],
      outputRange: ['-20deg', '0deg', '15deg', '45deg'],
      extrapolate: 'clamp',
    });

    const image = R.images[`bird${this.props.pose}`];

    return (
      <Animated.Image
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
          transform: [{ rotate: rotation }],
        }}
        resizeMode="stretch"
        source={image}
      />
    );
  }
}
