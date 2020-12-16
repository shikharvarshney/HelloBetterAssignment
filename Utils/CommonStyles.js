import {StyleSheet} from 'react-native';
import {Spacing} from './Dimen';

const CommonStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },

  screenPadding: {
    padding: Spacing.l,
  },

  centerContent: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default CommonStyles;
