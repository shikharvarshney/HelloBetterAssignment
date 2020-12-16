import {Dimensions} from 'react-native';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('screen');

const BorderRadius = {
  s: 5,
  m: 8,
  l: 10,
};

const Spacing = {
  s: 8,
  m: 16,
  l: 24,
};

export {Spacing, BorderRadius, ScreenHeight, ScreenWidth};
