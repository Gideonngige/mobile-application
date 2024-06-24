import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, Image } from 'react-native';


export default function Weather(){
    const [city, setCity] = useState("Lamu");
    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [description, setDescription] = useState(0);
    const [icon, setIcon] = useState('');
    const [windSpeed, setWindSpeed] = useState(0);
    const API_KEY = '1e2b1c4a18787d3b51e6b5070e19d4de';
    const fetchWeatherData = async ({city}) => {
        city = city.trim();
        try{
            const response = await axios.get(
                 `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            )
            console.log(response.data.main.temp);
            console.log(response.data.main.humidity);
            console.log(response.data.main.pressure);
            console.log("Weather " + response.data.weather[0].description);
            console.log("Weather icon " + response.data.weather[0].icon);
            console.log("Wind Speed " + response.data.wind.speed);
            console.log(response.data);
            setTemp(response.data.main.temp);
            setHumidity(response.data.main.humidity);
            setPressure(response.data.main.pressure);
            setDescription(response.data.weather[0].description);
            setIcon(response.data.weather[0].icon);
            setWindSpeed(response.data.wind.speed);
            return response.data;
            
        }
        catch(error){
            alert(error);
            //console.error('Error fetching weather data:', error);
            return null;
        }
    }
    useEffect(() => {
        fetchWeatherData({city});
    }, []);
    return(
        <View>
        <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
        </View>
        <View style={styles.weather}>
        <ScrollView>
            <TextInput style={styles.inputs}
            value={city}
            onChangeText={setCity}
            placeholder='Enter name of your city'
            />
            <TouchableOpacity
            onPress={() => fetchWeatherData({city})}
            style={styles.search}
            >
                <Text style={styles.searchText}>Search Weather</Text>
            </TouchableOpacity>
            <View style={styles.results}>
                <Text style={styles.resultsHeader}>{city} Weather</Text>
                <Text style={styles.resultsText}>Temperature: {temp} Degrees Celcius</Text>
                <Text style={styles.resultsText}>Humidity: {humidity}</Text>
                <Text style={styles.resultsText}>Clouds: {description}</Text>
                <Text style={styles.resultsText}>Wind Speed: {windSpeed} km/hr</Text>
                <View style={styles.image}>
                <Image
                source={{uri:`https://openweathermap.org/img/wn/${icon}.png`}}
                style={{width:100, height:100}}
                 />
                 </View>
            </View>
            </ScrollView>
            </View>
            <StatusBar />
        </View>

    );
}
const styles = StyleSheet.create({
    header:{
        backgroundColor:'orange',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
    },
    headerText:{
        color:'white',
        fontSize:25,
        fontWeight:'900',
    },
    weather:{
        backgroundColor:'black',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    search:{
        backgroundColor:'orange',
        width:300,
        height:30,
        margin:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        elevation:3,
    },
    searchText:{
        color:'white',
        fontSize:20,
        fontWeight:'900',

    },
    inputs:{
        backgroundColor:'orange',
        color:'black',
        fontSize:20,
        width:300,
        margin:10,
        
    },
    resultsHeader:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'900',
    },
    results:{
        backgroundColor:'white',
        margin:10,
    },
    resultsText:{
        color:'orange',
    },
    image:{
        alignItems:'center',
        justifyContent:'center',
    },
    
})