import React, {Component} from 'react';
import {Text, View, AppState} from 'react-native';
import R from '../../../Utils/R';
import {AppButton} from '../../Components';
import {readRecord} from '../../Database/Database';

export default class Home extends Component {
  constructor(props) {
    super(props);

    const data = readRecord();

    this.state = {
      hasResponses: data.length > 0,
    };

    this.addFocusListener();
  }

  addFocusListener = () => {
    const {navigation} = this.props;

    navigation.addListener('focus', () => {
      const {hasResponses} = this.state;

      if (hasResponses) {
        return;
      }

      const data = readRecord();
      this.setState({hasResponses: data.length > 0});
    });
  };

  redirectToVideoPlayer = () => {
    this.redirectToScreen('VideoPlayer');
  };

  redirectToResponseScreen = () => {
    this.redirectToScreen('ViewResponses');
  };

  redirectToScreen = (screen) => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {hasResponses} = this.state;

    return (
      <View
        style={[
          R.CommonStyles.containerStyle,
          R.CommonStyles.screenPadding,
          R.CommonStyles.centerContent,
        ]}>
        <AppButton title="Start Course" onPress={this.redirectToVideoPlayer} />
        {hasResponses && (
          <AppButton
            style={{marginTop: 20}}
            title="View Responses"
            onPress={this.redirectToResponseScreen}
          />
        )}
      </View>
    );
  }
}
