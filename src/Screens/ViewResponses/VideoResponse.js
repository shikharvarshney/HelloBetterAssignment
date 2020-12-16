import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import R from '../../../Utils/R';

export default class ResponseRow extends Component {
  videoPlayerRef = null;

  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      aspectRadio: 9 / 16,
      paused: true,
      rate: 0,
    };
  }

  onVideoLoaded = (data) => {
    const {
      duration,
      naturalSize: {height, width},
    } = data;

    this.videoPlayerRef?.seek(0);

    this.setState({duration, aspectRadio: width / height});
  };

  playVideo = () => {
    this.setState({paused: false, rate: 1});
  };

  pauseVideo = () => {
    this.setState({paused: true, rate:0});
  };

  onVideoEnded = () => {
    
    this.setState({paused: true, duration:0, rate:0});
    this.videoPlayerRef?.seek(0);
    
  };

  render() {
    const {
      item: {videoPath},
    } = this.props;

    const {aspectRadio, paused, rate} = this.state;

    return (
      <View>
        <Video
          ref={(ref) => {
            this.videoPlayerRef = ref;
          }}
          onLoad={this.onVideoLoaded}
          onEnd={this.onVideoEnded}
          repeat={false}
          style={{width: '90%', alignSelf: 'center', aspectRatio: aspectRadio}}
          source={{uri: videoPath}}
          resizeMode="cover"
          onPlaybackResume={() => {
            console.log('resumed');
          }}
          paused={paused}
          rate={rate}
        />

        <View style={{marginTop: 10, marginHorizontal: 20}}>
          <TouchableOpacity onPress={paused ? this.playVideo : this.pauseVideo}>
            <Image
              source={paused ? R.Images.Controls.Play : R.Images.Controls.Pause}
              style={R.CommonStyles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
