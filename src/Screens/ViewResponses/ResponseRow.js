import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import TextResponseRow from './TextResponseRow';
import AudioResponseRow from './AudioResponse';
import VideoResponseRow from './VideoResponse';
import R from '../../../Utils/R';
import Styles from './styles';

export default class ResponseRow extends Component {
  audioRecorderPlayer = new AudioRecorderPlayer();
  videoPlayerRef = null;

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
      item,
      item: {time, responseType},
    } = this.props;

    const isTextResponse = responseType === 1;
    const isAudioResponse = responseType === 2;
    const isVideoResponse = responseType === 3;

    return (
      <View style={Styles.rowContainerStyle}>
        <Text>Saved At: {time.trim()}</Text>

        <View style={Styles.textResponseContainer}>
          <Text style={Styles.textResponseTextStyle}>Response is:{'\n'}</Text>

          {isTextResponse && <TextResponseRow item={item} />}

          {isAudioResponse && <AudioResponseRow item={item} />}

          {isVideoResponse && <VideoResponseRow item={item} />}
        </View>
      </View>
    );
  }
}
