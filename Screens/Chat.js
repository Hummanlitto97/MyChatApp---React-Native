import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Text} from 'react-native';

import Chat_Message from './Chat-Components/Message';

import ErrorCatcher from './ErrorCatcher';
const styles = StyleSheet.create({
    main:
    {
        flex:1,
        backgroundColor:"black"
    },
    texe:
    {
        color:"white"
    }
});


const Chat = () =>
{
    return(
        <View style={styles.main}>
            <Text style={styles.texe}>Chat</Text>
        </View>
    );
}

export default Chat;