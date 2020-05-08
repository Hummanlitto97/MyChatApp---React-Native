import React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Menu from './Screens/Menu';

const Stack = createStackNavigator();

export default function App() 
{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options=
        {{
          title:"Login Screen",
          headerStyle:{
            backgroundColor:"#00cc00"
          },
          headerTintColor:"#fff",
        }} />
        <Stack.Screen name="Sign-up" component={SignUp}/>
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
