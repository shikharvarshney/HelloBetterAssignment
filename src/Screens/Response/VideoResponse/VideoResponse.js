import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import R from '../../../../Utils/R';
import Styles from './styles';
import {writeRecord} from '../../../Database/Database';

export default class VideoResponse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
    };
  }

  // takePicture = async () => {
  //   if (this.camera) {
  //     const options = {quality: 0.5, base64: true};
  //     const data = await this.camera.recordAsync();
  //     console.log(data.uri);
  //   }
  // };

  startRecording = async () => {
    if (this.camera) {
      this.setState({isRecording: true});

      const options = {quality: 0.5, base64: true};
      const data = await this.camera.recordAsync();

      writeRecord({
        id: Date.now(),
        responseType: 3,
        videoPath: data.uri,
        audioPath: '',
        text: '',
        time: new Date().toTimeString(),
      });

      this.onBackButtonClick();
      console.log(data);
    }
  };

  stopRecording = async () => {
    if (this.camera) {
      this.setState({isRecording: false});
      this.camera.stopRecording();
    }
  };

  onBackButtonClick = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {isRecording} = this.state;

    return (
      <View style={Styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={Styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={Styles.buttonContainerStyle}>
          <TouchableOpacity
            onPress={isRecording ? this.stopRecording : this.startRecording}
            style={Styles.circularButtonStyle}>
            <Image
              style={[
                R.CommonStyles.iconStyle,
                {marginLeft: isRecording ? 0 : 5},
              ]}
              source={
                isRecording ? R.Images.Controls.Stop : R.Images.Controls.Play
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
