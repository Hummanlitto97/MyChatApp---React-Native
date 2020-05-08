import React, {useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet, View, Image,TextInput, TouchableOpacity, Text} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create(
    {
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
            backgroundColor:"#000",
            borderWidth:5,
            borderColor:"#00cc00",
            margin:10
        },
        menuIcon:
        {
          padding:5
        },
        mainInfoSection:
        {
            flex:1,
            borderWidth:5,
            backgroundColor:"#00cc00",
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
        },
        sections:
        {
            marginTop:10,
            flex:6,
            paddingHorizontal:10
        },
        section:
        {
            height:100,
            backgroundColor:"#000",
            borderWidth:5,
            borderColor:"#00cc00"
        },
        secondSection:
        {
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
            backgroundColor:"#00cc00",
            margin:5
        },
        sectionText:
        {
            padding:5,
            color:"#fff"
        },
        profileImage:
        {
            borderRadius:50,
            width:80,
            height:80,
            borderWidth:2.5,
            borderColor:"white"
        },
        profileNickname:
        {
            fontSize:30,
            padding:10,
            color:"#fff"
        },
        label:
        {
            fontSize:20,
            padding:5,
            color:"#fff"
        },
        underLine:
        {
            borderColor:"#000",
            borderBottomWidth:5,
        }
    });

const Profile = ({navigation}) => 
{
    const nickname = useState(
        {
            value:"",
            edit:false
        });
    const email = useState(
        {
            value:"",
            edit:false
        });
    
    if(!firebase.apps.length)
    {
        firebase.initializeApp(FirebaseConf);
    }
    if(firebase.auth().currentUser == null)
    {
        navigation.navigate("Login");
    }
    const GetInfo = () =>
    {
        let lav_email = firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Private/email`);
        let lav_nickname = firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Public/nickname`);

        lav_email.once("value",
        (snapshot) => 
        {
            email[1]({value:snapshot.val(),edit:false});
        },
        () => 
        {
            alert("Error");
        });
        lav_nickname.once("value",
        (snapshot) => 
        {
            nickname[1]({value:snapshot.val(),edit:false});
        },
        () => 
        {
            alert("Error");
        });
    }
    
    /*--------------Nickname control------------*/
    const EditNick = () => 
    {
        nickname[1]({...nickname[0],edit:true});
    }
    const UpdateNick = () => 
    {
        firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Public/nickname`).set(nickname[0].value).catch(() => {alert("Can't edit your nickanme");});
        nickname[1]({...nickname[0],edit:false});
    }
    const CancelNick = () => 
    {
        firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Public/nickname`).once("value",
        (snapshot) => 
        {
            nickname[1]({value:snapshot.val(),edit:false});
        },
        () => 
        {
            alert("Unable to cancel nickname edit");
        });
    }
    const onChangeNick = (nick) => 
    {
        nickname[1]({...nickname[0],value:nick});
    }
    /*----------------------------------------*/
    /*--------------Email control------------*/
    const EditEmail = () => 
    {
        email[1]({...email[0],edit:true});
    }
    const UpdateEmail = () => 
    {
        firebase.auth().currentUser.updateEmail(email[0].value)
        .then(() => 
        {
            firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Private/email`).set(email[0].value).catch(() => {alert("Can't edit your email");});
            email[1]({...email[0],edit:false});
        })
        .catch(() => 
        {
            alert("Unable to update email");
            CancelEmail();
        });
        
    }
    const CancelEmail = () => 
    {
        firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/Private/email`).once("value",
        (snapshot) => 
        {
            email[1]({value:snapshot.val(),edit:false});
        },
        () => 
        {
            alert("Unable to cancel email edit");
        });
    }
    const onChangeEmail = (el) => 
    {
        email[1]({...email[0],value:el});
    }
    /*----------------------------------------*/
    const UpdateTitle = () => 
    {
        navigation.dangerouslyGetParent().setOptions(
            {
                title:"Profile Settings",
                headerTintColor:"#fff",
                headerStyle:{
                    backgroundColor:"#00cc00"
                },
                headerLeft:() => 
                    {
                        return (
                          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <View style={styles.menuIcon}>
                              <Ionicons name="md-menu" size={50} color="#fff" />
                            </View>
                          </TouchableOpacity>
                        );
                    }
            });
    }
    useEffect(() => 
    {
        GetInfo(); 
    },[]);
    useLayoutEffect(() => 
    {
        UpdateTitle();
    },[]);
    return (
        <View style={styles.main}>
            <View style={styles.secondMain}>
                <ScrollView>
            <View style={styles.mainInfoSection}>
                <Image style={styles.profileImage} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                <TextInput style={styles.profileNickname} editable={nickname[0].edit} value={nickname[0].value} onChangeText={onChangeNick}/>
                {nickname[0].edit ?
                <View style={{flex:1,flexDirection:"row"}}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={UpdateNick}>
                            <MaterialIcons name="done" size={30} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonEdit} onPress={CancelNick}>
                            <MaterialIcons name="cancel" size={30} color="#f00"/>
                    </TouchableOpacity>
                </View>
                : 
                <TouchableOpacity style={styles.buttonEdit} onPress={EditNick}>
                    <Feather name="edit-3" size={30} color="#fff"/>
                </TouchableOpacity>}
            </View>
            <View style={styles.sections}>
                <View style={styles.section}>
                        <View style={styles.secondSection}>
                            <View style={{flex:1,flexDirection:"column"}}>
                                <View style={{flex:1,flexDirection:"row",margin:0,padding:0,justifyContent:"center",alignItems:"center"}}>
                                        <Text style={[styles.label,{flex:1}]}>Your email:</Text>
                                        <TextInput style={[styles.sectionText,{flex:1}]} editable={email[0].edit} value={email[0].value} onChangeText={onChangeEmail}/>
                                        {email[0].edit ?
                <View style={{flex:1,flexDirection:"row"}}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={UpdateEmail}>
                            <MaterialIcons name="done" size={30} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonEdit} onPress={CancelEmail}>
                            <MaterialIcons name="cancel" size={30} color="#f00"/>
                    </TouchableOpacity>
                </View>
                : 
                <TouchableOpacity style={styles.buttonEdit} onPress={EditEmail}>
                    <Feather name="edit-3" size={30} color="#fff"/>
                </TouchableOpacity>}
                                </View>
                                <View style={[styles.underLine]}></View>
                            </View>
                        </View>
                </View>
            </View>
            </ScrollView>
            </View>
        </View>
    );
}

export default Profile;