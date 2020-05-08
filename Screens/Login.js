import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import firebase from 'firebase';

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
    },
    inputBox:
    {
        width:200
    },
    buttonsBox:
    {
        flexDirection:"row",
        margin:10
    }
});
const Login = ({navigation}) =>
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
        avatar: useState('')
    }
    const onChangeEmail = (email) => {
        states.email[1](email);
    };
    const onChangePassword = (pass) => {states.password[1](pass)};

    const onPressSignup = () =>
    {
        navigation.navigate("Sign-up");
    }
    const onPressLogin = () =>
    {
        firebase.auth().signInWithEmailAndPassword(states.email[0],states.password[0])
        .then(success => 
        {
            navigation.navigate("Menu");
        })
        .catch(error => 
        {
            alert("Invalid credentials");
        });
    }

    return(
        <View style={styles.main}>
            <View style={styles.secondMain}>
                <Text style={styles.label}>Email:</Text>
                <View style={styles.inputBox}>
                    <TextInput style={styles.input}  placeholderTextColor="lightblue" placeholder="example@gmail.com" value={states.email[0]} onChangeText={onChangeEmail} selectionColor="white"/>
                    <View style={styles.inputUnderline}></View>
                </View>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.inputBox}>
                    <TextInput style={styles.input}  placeholderTextColor="lightblue" placeholder="password" secureTextEntry={true} value={states.password[0]} onChangeText={onChangePassword} selectionColor="white"/>
                    <View style={styles.inputUnderline}></View>
                </View>
                <View style={styles.buttonsBox}>
                    <Button color="#00cc00" title="Login" onPress={onPressLogin}/>
                    <Button color="#00cc00" title="Sign Up" onPress={onPressSignup}/>
                </View>
                </View>
        </View>
    );
}

export default Login;