import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Chat from './Chat';
import RoomList from './RoomList';

const Tabs = createBottomTabNavigator();

const RoomsMenu = () =>
{
  return(
    <Tabs.Navigator initialRouteName="Room List">
      <Tabs.Screen name="Room List" component={RoomList}/>
      <Tabs.Screen name="Chat" component={Chat}/>
    </Tabs.Navigator>
  );
}

export default RoomsMenu;
