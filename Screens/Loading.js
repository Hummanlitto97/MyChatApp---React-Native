import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const loadingText = "App is Loading";
const Loading = () =>
{

    const [Dots,ChangeDots] = useState(loadingText);
    useEffect(() => 
    {
        const animation = setInterval(() => {
            ChangeDots((text) => 
            {
                if(text.length >= loadingText.length + 3)
                {
                    return loadingText;
                }
                else
                {
                    return text + ".";
                }
            })
        },1000);
        return () => clearInterval(animation);
    },[]);
    return(
        <View>
            <Text>{Dots}</Text>
        </View>
    );
}

export default Loading;