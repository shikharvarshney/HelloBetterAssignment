import {StyleSheet} from 'react-native';
import R from '../../../Utils/R';

const {
  Dimen: {Spacing, BorderRadius},
  Colors: {AppColor, TextColor},
} = R;

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 250,
    alignItems: 'center',
  },

  textStyle: {
    color: TextColor.Primary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  optionContainerStyle: {
    backgroundColor: AppColor.Primary,
    borderRadius: BorderRadius.l,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionTextStyle: {
    color: TextColor.Primary,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  optionIconStyle: {
    width: 30,
    height: 30,
  },
});

export default styles;
