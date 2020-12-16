import React, {Component} from 'react';
import {Text} from 'react-native';
import Styles from './styles';

export default class TextResponseRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      item: {text},
    } = this.props;

    return <Text style={Styles.textResponseTextStyle}>{text.trim()}</Text>;
  }
}
