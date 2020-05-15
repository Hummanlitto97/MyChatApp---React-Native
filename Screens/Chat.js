import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Text, FlatList, Button} from 'react-native';
import firebase from 'firebase';
import {Ionicons} from '@expo/vector-icons'

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
    },
    myMessage:
    {
        backgroundColor:"white",
        color:"black"
    },
    friendMessage:
    {
        backgroundColor:"#00cc00",
        color:"white"
    },
    messageContainer:
    {
        height:"auto"
    },
    input:
    {
        backgroundColor:"white",
        color:"black"
    }
});


const Chat = ({navigation, route}) =>
{
    const room = useState({
        id:route.params.id.toUpperCase(),
        title:route.params.title,
        messages:[]
    });

    const currentText = useState("");

    useEffect(() =>  
    {
        UpdateChat();
    },[]);

    const UpdateChat = () => 
    {
        let MessagesFirebase = firebase.database().ref(`/ChatRooms/${room[0].id}/messages`);
        MessagesFirebase.on("value",(snapshot) => 
        {
            const refreshedMessages = [];
            snapshot.forEach((messageSnapshot) => 
            {
                firebase.database().ref(`/Users/${messageSnapshot.val().owner}/Public/nickname`).once("value").then((nick) => 
                {
                    refreshedMessages.push({id:messageSnapshot.key,text:messageSnapshot.val().text,owner:messageSnapshot.val().owner,nickname:nick.val()});
                    room[1]({...room[0],messages:refreshedMessages});
                })
            })
        
        },
        () => {alert("Error");});
    }

    const Message = ({item}) => 
    {
        const mine = item.owner == firebase.auth().currentUser.uid ? styles.myMessage : styles.friendMessage;
        return(<View>
            <Text style={mine}>{item.nickname} says:</Text>
            <Text style={mine}>{item.text}</Text>
        </View>);
    }

    const ExtractKey = (message) => 
    {
        return message.id;
    }

    const writingText = (text) => 
    {
        currentText[1](text);
    }
    const sendMessage = () => 
    {
        let MessagesFirebase = firebase.database().ref(`/ChatRooms/${room[0].id}/messages/${Date.now()}`);
        MessagesFirebase.set({
            text:currentText[0],
            owner:firebase.auth().currentUser.uid
        }).then(currentText[1](""));
    }
    return(
        <View style={styles.main}>
            <FlatList
            data={room[0].messages}
            keyExtractor={ExtractKey}
            renderItem={Message}
            />
            <TextInput style={styles.input} placeholder="Write something..." value={currentText[0]} onChangeText={writingText} />
            <Button color="#00cc00" title="Send Message" onPress={sendMessage}/>
        </View>
    );
}

export default Chat;