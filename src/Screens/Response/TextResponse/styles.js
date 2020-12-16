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

  responseTextStyle: {
    fontSize: 18,
    color: '#888888',
    marginTop: 20,
    fontWeight: '600',
    minHeight: 100,
  },

  buttonStyle: {
    marginHorizontal: Spacing.l,
    marginBottom: Spacing.l,
  },
});

export default styles;
