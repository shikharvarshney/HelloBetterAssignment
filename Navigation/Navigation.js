import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  VideoResponse,
  TextResponse,
  AudioResponse,
  VideoPlayer,
  ViewResponses,
} from '../src/Screens';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => {}}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="VideoResponse" component={VideoResponse} />
        <Stack.Screen name="TextResponse" component={TextResponse} />
        <Stack.Screen name="AudioResponse" component={AudioResponse} />
        <Stack.Screen name="ViewResponses" component={ViewResponses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
