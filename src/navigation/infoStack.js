import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Info} from '../screens';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#000'},
      headerTitleStyle: {fontWeight: '600', color: '#FFF'},
    }}>
    <Stack.Screen name="Info" component={Info} options={{title: 'Info'}} />
  </Stack.Navigator>
);
