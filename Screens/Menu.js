import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View} from 'react-native';

import Profile from './Profile';
import RoomsMenu from './RoomsMenu';

const MenuScreen = createDrawerNavigator();

const Logout = ({navigation}) => 
{
    navigation.navigate("Login");
    return (<View></View>);
}

const Menu = () => 
{
    return (
            <MenuScreen.Navigator initialRouteName="Profile" drawerStyle={{backgroundColor:"#fff"}} drawerContentOptions={{activeBackgroundColor:"#00cc00", activeTintColor:"#fff",inactiveTintColor:"#00cc00"}}>
                <MenuScreen.Screen name="Rooms" component={RoomsMenu}/>
                <MenuScreen.Screen name="Profile" component={Profile}/>
                <MenuScreen.Screen name="Logout" component={Logout}/>
            </MenuScreen.Navigator>
    );
}

export default Menu;