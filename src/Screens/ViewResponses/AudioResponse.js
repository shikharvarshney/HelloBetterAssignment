import React, {Component} from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import R from '../../../Utils/R';
import Styles from './styles';

export default class ResponseRow extends Component {
  audioRecorderPlayer = new AudioRecorderPlayer();

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      currentTime: '00:00:00',
    };
  }

  playAudio = async () => {
    const {
      item: {audioPath},
    } = this.props;

    this.setState({isPlaying: true});

    this.audioRecorderPlayer.stopPlayer();

    await this.audioRecorderPlayer.startPlayer(audioPath);
    this.audioRecorderPlayer.setVolume(1.0);

    this.audioRecorderPlayer.addPlayBackListener((e) => {
      console.log('event is', e);

      this.setState({
        currentTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });

      if (e.current_position === e.duration) {
        this.stopAudio();
      }
    });
  };

  stopAudio = () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    this.setState({isPlaying: false});
  };

  pauseAudio = () => {
    this.audioRecorderPlayer.pausePlayer();
    this.setState({isPlaying: false});
  };

  render() {
    const {
      item: {duration},
    } = this.props;

    const {isPlaying, currentTime} = this.state;

    return (
      <TouchableOpacity
        style={Styles.audioResponseStyle}
        onPress={isPlaying ? this.pauseAudio : this.playAudio}>
        <Image
          source={isPlaying ? R.Images.Controls.Pause : R.Images.Controls.Play}
          style={Styles.playIconStyle}
        />

        <Text style={{color: 'white'}}>
          {currentTime.substring(0, 5)} / {duration.substring(0, 5)}
        </Text>
      </TouchableOpacity>
    );
  }
}
