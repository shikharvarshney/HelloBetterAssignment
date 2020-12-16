import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Video from 'react-native-video';
import R from '../../../Utils/R';
import {ResponseTypePicker, AppBar} from '../../Components';
import Styles from './styles';
import Controls from './Controls';
import Header from './Header';

const AnimationDuration = 800;

export default class VideoPlayer extends Component {
  timeout = null;
  playerRef = null;

  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      videoEnded: false,
      showControl: false,
      controlAnimation: new Animated.Value(0),
      responseAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    // this.onVideoPlayerTouch();
  }

  onVideoEnded = () => {
    this.startControlAnimation(0, 100);

    this.setState(
      {
        videoEnded: true,
      },
      () => {
        this.startResponseAnimation(1);
      },
    );
  };

  onVideoPlayerTouch = () => {
    const {showControl, videoEnded} = this.state;
    this.setState({
      showControl: !showControl,
    });

    // If control were shown earlier then hide it and clear interval for auto hide
    if (showControl) {
      this.startControlAnimation(0);
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
    //  show control and schedule a timeout for auto hide
    else {
      this.startControlAnimation(1);
      this.updateControlTimeout();
    }
  };

  updateControlTimeout = () => {
    this.timeout = setTimeout(this.onVideoPlayerTouch, 40000);
  };

  startControlAnimation = (toValue, duration = AnimationDuration) => {
    const {controlAnimation} = this.state;

    Animated.timing(controlAnimation, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  startResponseAnimation = (toValue) => {
    const {responseAnimation} = this.state;

    Animated.timing(responseAnimation, {
      toValue,
      duration: AnimationDuration,
      useNativeDriver: true,
    }).start();
  };

  headerAnimatedStyle = () => {
    const {controlAnimation} = this.state;

    const translationInterpolation = controlAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 0],
    });

    return {
      transform: [{translateY: translationInterpolation}],
    };
  };

  controlAnimatedStyle = () => {
    const {controlAnimation} = this.state;

    const translationInterpolation = controlAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    return {
      transform: [{translateY: translationInterpolation}],
      ...Styles.bottomContainer,
    };
  };

  responseContainerAnimatedStyle = () => {
    const {responseAnimation} = this.state;
    const translationInterpolation = responseAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 0],
    });

    return {
      transform: [{translateY: translationInterpolation}],
      ...Styles.bottomContainer,
    };
  };

  onPlay = () => {
    this.setState({paused: false});
    clearTimeout(this.timeout);
    this.updateControlTimeout();
  };

  onPause = () => {
    this.setState({paused: true});
    clearTimeout(this.timeout);
    this.updateControlTimeout();
  };

  onVideoResponse = () => {
    this.navigateToScreen('VideoResponse');
  };

  onAudioResponse = () => {
    this.navigateToScreen('AudioResponse');
  };

  onTextResponse = () => {
    this.navigateToScreen('TextResponse');
  };

  onBackPress = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  navigateToScreen = (screen) => {
    const {navigation} = this.props;

    navigation.navigate(screen);
  };

  render() {
    const {paused, videoEnded, showControl} = this.state;

    const headerAnimatedStyle = this.headerAnimatedStyle();
    const controlAnimatedStyle = this.controlAnimatedStyle();
    const responseContainerAnimatedStyle = this.responseContainerAnimatedStyle();

    return (
      <View style={[R.CommonStyles.containerStyle]}>
        <TouchableOpacity
          onPress={this.onVideoPlayerTouch}
          activeOpacity={1}
          disabled={videoEnded}
          style={StyleSheet.absoluteFill}>
          <Video
            ref={(ref) => {
              this.playerRef = ref;
            }}
            
            onLoad={() => {
              this.playerRef.seek(0);
            }}
            onEnd={this.onVideoEnded}
            style={StyleSheet.absoluteFill}
            source={R.Videos.CourseIntro}
            fullscreen
            resizeMode="cover"
            onPlaybackResume={() => {
              console.log('resumed');
            }}
            paused={paused}
          />

          {(showControl || videoEnded) && (
            <View
              style={[StyleSheet.absoluteFill, {backgroundColor: '#303030af'}]}
            />
          )}
        </TouchableOpacity>
        
        <View style={[StyleSheet.absoluteFill]} pointerEvents="box-none">
          <Animated.View style={headerAnimatedStyle}>
            <AppBar onPress={this.onBackPress} />
          </Animated.View>

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center' }}
            onPress={this.onBackPress}>
            <Image style={[R.CommonStyles.iconStyle, {marginLeft: 20, marginTop: -20, tintColor: videoEnded === true ? 'white' : 'transparent'}]} source={R.Images.Back} />
          </TouchableOpacity>

          <Animated.View style={controlAnimatedStyle}>
            <Controls
              isPaused={paused}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onStop={this.onVideoEnded}
            />
          </Animated.View>

          <Animated.View style={responseContainerAnimatedStyle}>
            <ResponseTypePicker
              onVideoResponse={this.onVideoResponse}
              onAudioResponse={this.onAudioResponse}
              onTextResponse={this.onTextResponse}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}
