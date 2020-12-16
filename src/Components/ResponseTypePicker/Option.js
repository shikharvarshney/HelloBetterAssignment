import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import R from '../../../Utils/R';
import Styles from './styles';

export default function Option(props) {
  const {icon, title, onPress} = props;

  return (
    <TouchableOpacity style={Styles.optionContainerStyle} onPress={onPress}>
      <Image source={icon} style={Styles.optionIconStyle} resizeMode="cover" />
      <Text style={Styles.optionTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
