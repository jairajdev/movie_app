import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Movie, MovieDetail} from '../screens';
import {HeaderBackImage} from '../components';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerBackImage: () => <HeaderBackImage />,
      headerBackTitleVisible: false,
      headerStyle: {backgroundColor: '#000'},
      headerTitleStyle: {fontWeight: '600', color: '#FFF'},
    }}>
    <Stack.Screen name="Movie" component={Movie} options={{title: 'Movie'}} />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{title: 'Movie Detail'}}
    />
  </Stack.Navigator>
);
