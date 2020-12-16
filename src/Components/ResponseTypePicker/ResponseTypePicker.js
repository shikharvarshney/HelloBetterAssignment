import React from 'react';
import {View, Text, Image} from 'react-native';
import Option from './Option';
import R from '../../../Utils/R';
import Styles from './styles';

export default function ResponseTypePicker(props) {
  const {onVideoResponse, onAudioResponse, onTextResponse} = props;

  return (
    <View style={Styles.containerStyle}>
      <Text style={Styles.textStyle}>How would you like to respond?</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          marginTop: 30,
        }}>
        <Option
          icon={R.Images.ResponseOption.Video}
          title="Video"
          onPress={onVideoResponse}
        />
        <Option
          icon={R.Images.ResponseOption.Audio}
          title="Audio"
          onPress={onAudioResponse}
        />
        <Option
          icon={R.Images.ResponseOption.Text}
          title="Text"
          onPress={onTextResponse}
        />
      </View>
    </View>
  );
}
