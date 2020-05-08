import React, {useState} from 'react';
import firebase from 'firebase';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';

import FirebaseConf from '../Configs/FirebaseSDK';

const styles = StyleSheet.create({
    input:
    {
        textAlign:"center",
        padding:2,
        color:"#00cc00"
    },
    main:
    {
        flex:1,
        backgroundColor:"#000",
        borderColor:"#00cc00",
        borderWidth:5        
    },
    secondMain:
    {
        flex:1,
        margin:10,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#000",
        borderColor:"#00cc00",
        borderWidth:5   ,
        borderRadius:20
    },
    inputUnderline:
    {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:"#00cc00"
    },
    label:
    {
        color:"#00cc00",
        fontSize:30
    }
});

const SignUp = ({navigation}) => 
{
    if(!firebase.apps.length)
    {
        firebase.initializeApp(FirebaseConf);
    }
    states = 
    {
        name: useState(''),
        email: useState(''),
        password: useState(''),
        avatar: useState(''),
        nickname: useState('')
    }

    const onChangeEmail = (email) => {
        states.email[1](email);
    };
    const onChangePassword = (pass) => {states.password[1](pass)};

    const onChangeNick = (nick) => {states.nickname[1](nick)}; 
    const onPressSignup = () => 
    {
        firebase.auth().createUserWithEmailAndPassword(states.email[0],states.password[0])
        .then(() => 
        {
            firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}`).set(
                {
                    nickname:"lol"
                    /*Public:
                    {
                        nickname:"Petras"
                    },
                    Private:
                    {
                        email:states.email[0]
                    }*/
                });
            navigation.navigate("Login");
        })
        .catch(() => {alert("Neteisingi duomenys registracijai")})
    };
return(
    <View style={styles.main}>
        <View style={styles.secondMain}>
            <Text style={styles.label}>Email:</Text>
            <TextInput placeholder="example@gmail.com" value={states.email[0]} onChangeText={onChangeEmail}/>
            <Text style={styles.label}>Password:</Text>
            <TextInput value={states.password[0]} onChangeText={onChangePassword}/>
            <Text style={styles.label}>Nickname:</Text>
            <TextInput value={states.nickname[0]} onChangeText={onChangeNick}/>
            <Text>Upload your image:</Text>
            <Button title="Sign Up" onPress={onPressSignup}/>
        </View>
    </View>
);
}

export default SignUp;