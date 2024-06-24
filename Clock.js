import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text,  } from "react-native";
export default function Clock(){
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth()+1;
    var day = currentTime.getDate();
    return(
        <View style={styles.container}>
            <View style={[styles.textContainer]}>
            <Text style={{color:'white'}}>{day} /{month} /{year}</Text>
            <Text style={[styles.textStyle]}>{formattedTime} </Text>
            
            </View>
        </View>

    );

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fc0384'
    },
    textContainer:{
        backgroundColor:'#fca103',
        width:'80%',
        height:300,
        borderRadius:50,
        elevation:8,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    textStyle:{
        color:'#03fcd3',
        textAlign:'center',
        fontSize:40,
        fontWeight:'900'
    },
    
})