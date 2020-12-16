import {StyleSheet} from 'react-native';
import R from '../../../../Utils/R';

const {Spacing} = R.Dimen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 24,
    flex: 1,
  },

  questionTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444444',
  },

  audioBackground: {
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    marginHorizontal: Spacing.l,
    marginBottom: Spacing.l,
    alignItems: 'center',
  },

  recordButtonContainerStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  dontWorryTextStyle: {
    color: R.Colors.TextColor.Disabled,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
