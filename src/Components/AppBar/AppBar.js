import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import R from '../../../Utils/R';
import Styles from './styles';

export default function AppBar(props) {
  const {onPress} = props;

  return (
    <View style={Styles.videoHeaderContainer}>
      <SafeAreaView />
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={onPress}>
        <Image style={R.CommonStyles.iconStyle} source={R.Images.Back} />
        <Text style={Styles.videoHeaderTitleStyle}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
