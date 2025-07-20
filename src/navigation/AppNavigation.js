import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventsProvider } from '../context/EventsContext';
import Home from '../screens/Home';
import EventDetail from '../screens/EventDetail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <EventsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetail}
            options={{
              title: 'Event Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EventsProvider>
  );
};

export default AppNavigator;
