import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Text,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    main:
    {
        flex:1,
        backgroundColor:"#000",
        flexDirection:"row",
        height:100,
        borderColor:"#00cc00",
        borderWidth:5,
        overflow:"hidden"
    },
    secondMain:
    {
        flex:1,
        margin:10,
        flexDirection:"row",
        backgroundColor:"#00cc00"
    },
    roomImage:
    {
        width:50,
        height:50
    },
    roomTitle:
    {
        color:"white",
        fontSize:20
    },
    textMiddle:
    {
        justifyContent:"center",
        margin:5
    }
});


const Room = ({title, navigation, onClickEvent}) =>
{
    return(
        <TouchableOpacity onPress={onClickEvent}>
            <View style={styles.main}>
                <View style={styles.secondMain}>
                    <View style={styles.textMiddle}>
                        <Image style={styles.roomImage} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                    </View>
                    <View style={styles.textMiddle}>
                        <Text style={styles.roomTitle} >{title}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Room;