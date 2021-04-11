import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfoStack from './infoStack';
import MovieStack from './movieStack';
import {Platform} from 'react-native';

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'Movie') {
            iconName += 'film';
          } else if (route.name === 'Info') {
            iconName += 'information-circle';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? '#F09839' : 'grey'}
              size={20}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#f09839',
        inactiveTintColor: '#000',
        keyboardHidesTabBar: true,
        labelStyle: {fontSize: 14},
      }}>
      <Tabs.Screen name="Movie" component={MovieStack} />
      <Tabs.Screen name="Info" component={InfoStack} />
    </Tabs.Navigator>
  );
};
