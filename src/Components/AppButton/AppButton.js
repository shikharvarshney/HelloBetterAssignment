import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Styles from './styles';

export default function AppButton(props) {
  const {title, titleStyle, style, ...rest} = props;

  return (
    <TouchableOpacity style={[Styles.containerStyle, style]} {...rest}>
      <Text style={[Styles.textStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
