import {StyleSheet} from 'react-native';
import R from '../../../../Utils/R';

const {AppColor} = R.Colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    ...StyleSheet.absoluteFill,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  buttonContainerStyle: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  circularButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: AppColor.Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
