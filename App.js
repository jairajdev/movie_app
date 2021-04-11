import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './src/navigation/bottomTab';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
      <StatusBar backgroundColor="#000" />
    </>
  );
}
