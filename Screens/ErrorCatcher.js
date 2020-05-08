import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
 
const styles = StyleSheet.create({
    errorMain:
    {
        flex:1,
        backgroundColor:"red"
    },
    errText:
    {
        color:"white",
        fontSize:20
    }
} );
class ErrorCatcher extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            errorName:null
        }
    }

    static getDerivedStateFromError(error)
    {
        return {errorName:error.name};
    }

    componentDidCatch(error,information)
    {
        alert("Error");
    }

    render()
    {
        if(this.state.errorName)
        {
            this.props.navigation.navigate("Login");
            return (
            <View style={styles.errorMain}>
                <Text style={styles.errText}>{this.state.errorName}</Text>
            </View>);
        }
        return this.props.children;
    }
}

export default ErrorCatcher;