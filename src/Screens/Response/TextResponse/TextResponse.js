import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import R from '../../../../Utils/R';
import {AppBar, AppButton} from '../../../Components';
import {writeRecord} from '../../../Database/Database';
import Styles from './styles';

export default class TextResponse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
    };
  }

  onBackButtonClick = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  saveResponse = () => {
    const {response} = this.state;
    writeRecord({
      id: Date.now(),
      responseType: 1,
      videoPath: '',
      audioPath: '',
      text: response.trim(),
      time: new Date().toTimeString(),
    });

    this.onBackButtonClick();
  };

  onTextChange = (text) => {
    this.setState({response: text});
  };

  render() {
    return (
      <View
        style={R.CommonStyles.containerStyle}
        keyboardShouldPersistTaps="handled">
        <AppBar onPress={this.onBackButtonClick} />
        <ScrollView style={Styles.contentContainer}>
          <Text style={Styles.questionTextStyle}>
            What's your reason for being here? Why now?
          </Text>

          <TextInput
            style={Styles.responseTextStyle}
            placeholder="Start writing here"
            numberOfLines={0}
            multiline
            onChangeText={this.onTextChange}
          />
        </ScrollView>

        <View style={Styles.buttonStyle}>
          <AppButton title="Save" onPress={this.saveResponse} />
        </View>
      </View>
    );
  }
}
