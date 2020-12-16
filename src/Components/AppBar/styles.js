import {StyleSheet} from 'react-native';
import R from '../../../Utils/R';

const {AppColor, TextColor} = R.Colors;
const {Spacing} = R.Dimen;

const styles = StyleSheet.create({
  videoHeaderContainer: {
    backgroundColor: AppColor.Primary,
    padding: Spacing.m,
  },

  videoHeaderTitleStyle: {
    color: TextColor.Primary,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 16,
  },

  videoControlStyle: {
    backgroundColor: AppColor.Primary,
    height: 100,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
