import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import LottieView from 'lottie-react-native';
import R from '../../../../Utils/R';
import {AppBar, AppButton} from '../../../Components';
import Styles from './styles';
import {writeRecord} from '../../../Database/Database';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// Playing audio: https://dzone.com/articles/react-native-record-audio-tutorial

export default class TextResponse extends Component {
  animationRef = null;
  audioRecorderPlayer = null;

  constructor(props) {
    super(props);

    this.audioRecorderPlayer = new AudioRecorderPlayer();

    this.state = {
      recordingStarted: false,
      isPaused: false,
      controlAnimation: new Animated.Value(0),
      recordSecs: 0,
      recordTime: '00:00:00',
      audioPath: '',
    };

    this.checkPermission();
  }

  checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  startControlAnimation = (toValue) => {
    const {controlAnimation} = this.state;

    Animated.timing(controlAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  onBackButtonClick = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  startRecording = async () => {
    const audioPath = Platform.select({
      ios: Date.now() + 'hello.m4a',
      android: 'sdcard/' + Date.now() + 'hello.mp4',
    });

    this.setState({
      recordingStarted: true,
      audioPath: audioPath,
    });
    this.animationRef?.play();
    this.startControlAnimation(1);

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    this.audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('event is', e);
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
    });

    await this.audioRecorderPlayer.startRecorder(audioPath, audioSet);
  };

  stopRecording = async () => {
    this.animationRef?.reset();

    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();

    this.setState({
      recordSecs: 0,
      recordingStarted: false
    });
  };

  saveRecording = () => {
    const {audioPath, recordTime} = this.state;
    writeRecord({
      id: Date.now(),
      responseType: 2,
      videoPath: '',
      audioPath,
      text: '',
      time: new Date().toTimeString(),
      duration: recordTime,
    });

    this.onBackButtonClick();
  };

  animatedSaveButtonStyle = () => {
    const {controlAnimation} = this.state;

    const translationInterpolation = controlAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return {
      transform: [{translateY: translationInterpolation}],
      width: '100%',
    };
  };

  render() {
    const {recordingStarted, recordTime} = this.state;
    const animatedSaveButtonStyle = this.animatedSaveButtonStyle();

    return (
      <View
        style={R.CommonStyles.containerStyle}
        keyboardShouldPersistTaps="handled">
        <AppBar onPress={this.onBackButtonClick} />

        <View style={Styles.contentContainer}>
          <Text style={Styles.questionTextStyle}>
            What's your reason for being here? Why now?
          </Text>
          <View style={[R.CommonStyles.centerContent, {flex: 1}]}>
            <LottieView
              ref={(animation) => {
                this.animationRef = animation;
              }}
              source={R.Animations.Ripple}
            />
            <Text
              style={[
                Styles.questionTextStyle,
                {color: 'white', fontSize: 14},
              ]}>
              {recordTime}
            </Text>
          </View>
        </View>

        <View style={Styles.buttonStyle}>
          <Text style={Styles.questionTextStyle}>
            Press and hold the button to record
          </Text>

          <View
            style={{
              width: '100%',
              height: 60,
              alignItems: 'center',
              alignContent: 'center',
              marginTop: 20,
            }}>
            {/* Start Button */}
            <AnimatedTouchable
              activeOpacity={1}
              disabled={recordingStarted}
              style={[Styles.recordButtonContainerStyle]}
              onPressIn={this.startRecording}
              onPressOut={this.stopRecording}>
              <Image
                source={R.Images.ResponseOption.Audio}
                style={R.CommonStyles.iconStyle}
              />
            </AnimatedTouchable>
          </View>

          <Text style={Styles.dontWorryTextStyle}>
            Don't worry, you can try again before saving it.
          </Text>

          <Animated.View style={animatedSaveButtonStyle}>
            <AppButton title="Save" onPress={this.saveRecording} />
          </Animated.View>
        </View>
      </View>
    );
  }
}
