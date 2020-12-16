import React, {useEffect, useRef, useState} from 'react';
import {View, Image, TouchableOpacity, Animated} from 'react-native';
import R from '../../../Utils/R';
import Styles from './styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

function getPlayButtonContainerStyle(animated) {
  const interpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 120],
  });

  return {width: interpolation};
}

function getPlayButtonStyle(animated) {
  const interpolation = animated.interpolate({
    inputRange: [0, 0.1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const sizeInterpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return {
    opacity: interpolation,
    width: sizeInterpolation,
    height: sizeInterpolation,
    transform: [{translateX: 2}],
  };
}

function getPauseButtonStyle(animated) {
  const interpolation = animated.interpolate({
    inputRange: [0, 0.01],
    outputRange: [0, 1],
  });

  const sizeInterpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return {
    opacity: interpolation,
    width: sizeInterpolation,
    height: sizeInterpolation,
    overflow: 'hidden',
  };
}

function getStopButtonStyle(animated) {
  const interpolation = animated.interpolate({
    inputRange: [0, 0.01],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const sizeInterpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return {
    opacity: interpolation,
    width: sizeInterpolation,
    height: sizeInterpolation,
    overflow: 'hidden',
  };
}

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    const {isPaused} = props;
    this.state = {
      playAnimated: new Animated.Value(isPaused ? 0 : 1),
    };
  }

  onPausedPressed = () => {
    const {onPause} = this.props;
    this.runAnimation(0);
    onPause?.();
  };

  onPlayPressed = () => {
    const {onPlay} = this.props;
    this.runAnimation(1);
    onPlay?.();
  };

  onStopPressed = () => {
    const {onStop, onPause} = this.props;
    onPause?.();
    onStop?.();
  };

  runAnimation = (toValue) => {
    const {playAnimated} = this.state;

    Animated.timing(playAnimated, {
      duration: 500,
      toValue,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const {playAnimated} = this.state;

    const playButtonContainerStyle = getPlayButtonContainerStyle(playAnimated);
    const playButtonStyle = getPlayButtonStyle(playAnimated);
    const pauseButtonStyle = getPauseButtonStyle(playAnimated);
    const stopButtonStyle = getStopButtonStyle(playAnimated);

    return (
      <View style={Styles.videoControlStyle}>
        <Image
          style={R.CommonStyles.iconStyle}
          source={R.Images.Controls.FastForward}
        />

        <Animated.View
          style={[Styles.playButtonContainer, playButtonContainerStyle]}>
          <AnimatedTouchableOpacity
            activeOpacity={1}
            style={pauseButtonStyle}
            onPress={this.onPausedPressed}>
            <Image
              style={[Styles.iconStyle]}
              source={R.Images.Controls.Pause}
              resizeMode="contain"
            />
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            activeOpacity={1}
            onPress={this.onPlayPressed}
            style={playButtonStyle}>
            <Image
              style={[Styles.iconStyle]}
              source={R.Images.Controls.Play}
              resizeMode="contain"
            />
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            style={stopButtonStyle}
            activeOpacity={1}
            onPress={this.onStopPressed}>
            <Animated.Image
              style={[Styles.iconStyle]}
              source={R.Images.Controls.Stop}
              resizeMode="contain"
            />
          </AnimatedTouchableOpacity>
        </Animated.View>
        <Image
          style={R.CommonStyles.iconStyle}
          source={R.Images.Controls.FastForward}
        />
      </View>
    );
  }
}
