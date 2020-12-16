import {StyleSheet} from 'react-native';
import R from '../../../Utils/R';

const {BorderRadius} = R.Dimen;
const {AppColor, TextColor} = R.Colors;

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 50,
    backgroundColor: AppColor.Primary,
    borderRadius: BorderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    color: TextColor.Primary,
  },
});

export default styles;
