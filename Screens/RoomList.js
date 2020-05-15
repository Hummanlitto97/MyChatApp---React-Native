import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import firebase from 'firebase';

import ErrorCatcher from './ErrorCatcher';
import FirebaseConf from '../Configs/FirebaseSDK';
import Room from './RoomComponents/Room';

const styles = StyleSheet.create({
    main:
    {
        flex:1,
        backgroundColor:"white",
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    texe:
    {
        color:"white"
    },
    menuIcon:
    {
      padding:5
    }
});

const RoomList = ({navigation}) =>
{
    if(!firebase.apps.length)
    {
        firebase.initializeApp(FirebaseConf);
    }
    if(firebase.auth().currentUser == null)
    {
        navigation.navigate("Login");
    }
    const rooms = useState(
        {
            list:[],
            refresh:true
        });


    const UpdateTitle = () => 
    {
        navigation.dangerouslyGetParent().setOptions(
            {
                title:"Rooms List",
                headerLeft:() => 
                    {
                        return (
                          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <View style={styles.menuIcon}>
                              <Ionicons name="md-menu" size={50} color="white" />
                            </View>
                          </TouchableOpacity>
                        );
                    }
            });
    };
    useEffect(() =>  
    {
        UpdateList();
    },[]);

    const UpdateList = () => 
    {
        const refreshedRooms = [];
        let RoomsFirebase = firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Private/rooms`);
        RoomsFirebase.once("value",(snapshot) => 
        {
            snapshot.forEach((childSnapshot) => 
            {
                 firebase.database().ref(`/ChatRooms/${childSnapshot.key.toUpperCase()}`).once("value")
                .then((roomSnapshot) => 
                {
                    refreshedRooms.push({name:roomSnapshot.val().name,key:childSnapshot.key});
                })
                .then(() => 
                {
                    rooms[1]({list:refreshedRooms,refresh:false});
                });
            })
        },
        () => {alert("Error");});
    }

    useLayoutEffect(() => 
    {
        UpdateTitle();
    },[navigation]);

    return(<View>
            {rooms[0].refresh ?  
                <Text>Loading</Text> 
                : 
                <FlatList
                data={rooms[0].list}
                keyExtractor={(room) => { return room.key;}}
                renderItem={({item}) => 
                {
                    return <Room title={item.name} room_id={item.key} navigation={navigation}/>
                }}
                 />}
        </View>
    );
}

export default RoomList;