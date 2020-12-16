import {StyleSheet} from 'react-native';
import R from '../../../Utils/R';

const {Spacing} = R.Dimen;
const {AppColor, TextColor} = R.Colors;

const styles = StyleSheet.create({
  rowContainerStyle: {
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.m,
    marginBottom: 10,
  },

  textResponseContainer: {
    marginTop: 10,
    padding: Spacing.s,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#afafaf',
    backgroundColor: AppColor.Light,
  },

  textResponseTextStyle: {
    color: TextColor.Light,
    fontWeight: '500',
    fontSize: 15,
  },

  audioResponseStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },

  playIconStyle: {
    width: 16,
    height: 16,
  },
});

export default styles;
