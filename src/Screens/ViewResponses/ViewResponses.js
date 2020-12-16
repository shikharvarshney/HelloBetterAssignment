import React, {Component} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import R from '../../../Utils/R';
import {AppBar} from '../../Components';
import {readRecord} from '../../Database/Database';
import ResponseRow from './ResponseRow';

export default class ViewResponses extends Component {
  constructor(props) {
    super(props);

    const data = readRecord();

    this.state = {
      data,
    };

    data.forEach((item) => {
      console.log('item', item, item.responseType, item.time, item.text);
    });
  }

  renderItem = ({item, index}) => {
    return <ResponseRow item={item} />;
  };

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {data} = this.state;

    return (
      <View style={R.CommonStyles.containerStyle}>
        <AppBar onPress={this.onBackPress} />
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item) => {
            return `${item.id}`;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{width: '100%', height: 0.5, backgroundColor: '#cfcfcf'}}
              />
            );
          }}
        />
      </View>
    );
  }
}
