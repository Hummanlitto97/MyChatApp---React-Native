import React, {useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

const styles = StyleSheet.create();

const Message = ({nickname, image, content}) =>
{
    return(
        <View>
            <Text>{nickname}</Text>
            <View>
                <Image source={image}/>
                <View>
                    <Text>{content}</Text>
                </View>
            </View>
        </View>
    );
}

export default Message;