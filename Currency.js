import React, { useEffect, useState } from "react";
import axios from 'axios';
import { StatusBar,StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

export default function Currency(){
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState("KES");
    const [amount, setAmount] = useState(0);
    const [converted, setConverted] = useState(0);
    const [currency, setCurrency] = useState([]);
    const Convert = async () => {
        try{
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            //console.log("Rates\n", response.data.rates["KES"]);
            //const currencyList = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
            //console.log("List ", currencyList.data);
            const newTo = response.data.rates['KES'];
            if (newTo){
                const newConv = parseFloat(amount) * newTo;
                //const cl = Object.keys(currencyList.data.rates)
                setConverted(newConv.toFixed(2));
                //setCurrency(cl);
                console.log("amount ", amount);
                console.log("Converted ", converted);

                //console.log("currencyList ", cl);
            }
            else{
                console.error('Currency not found');
            }

        }
        catch(error){
            console.log("Error fetching",error);
        }
    }
    const getCurrency = async () => {
        try{
            const currencyList = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
            const cl = Object.keys(currencyList.data.rates);
            setCurrency(cl);
        }
        catch(error){
            console.log("Not found ");
        }
    }
    useEffect(() => {getCurrency()},[]);
    return(
        <View style={{backgroundColor:'white',height:'100%'}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Currency Converter</Text>
            </View>
            <ScrollView>
            <View style={styles.convert}>
                <TextInput 
                style={styles.input}
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                />
                <Text>Select Currency here</Text>
                <ModalDropdown
            style={styles.dropdown}
            options={currency}
            initialScrollIndex={0}
            defaultValue={toCurrency}
            onSelect={(index, value) =>
              setFromCurrency(value)}
          />
                <View style={styles.fromTo}>
                <TextInput 
                style={styles.inputToFrom}
                placeholder="from"
                value={fromCurrency}
                onChangeText={setFromCurrency}
                />
                <TextInput 
                style={styles.inputToFrom}
                editable={false}
                placeholder="to"
                value={toCurrency}
                onChangeText={setToCurrency}
                />
                </View>
            <TouchableOpacity 
            onPress={Convert}
            style={styles.convertButton}
            >
                <Text style={styles.convertText}>Convert</Text>
            </TouchableOpacity>
            <View style={styles.results}>
                <Text style={styles.resultsText}>{amount} {fromCurrency} to {toCurrency} is {converted}</Text>
            </View>
            </View>
           
            </ScrollView>

            <StatusBar />
        </View>
    );
}
const styles = StyleSheet.create({
    input:{
        backgroundColor:'#e37712',
        width:300,
        color:'white',
        fontSize:20,
        marginTop:10,
    },
    inputToFrom:{
        backgroundColor:'#e37712',
        width:140,
        color:'white',
        fontSize:20,
        margin:10,
    },
    fromTo:{
        flexDirection:'row',
    },
    convert:{
        flex:1,
        height:'100%',
        marginTop:10,
        alignItems:'center',
        justifyContent:'center',
    },
    convertText:{
        color:'white',
        fontSize:20,
        fontWeight:'900',

    },
    convertButton:{
        backgroundColor:'#e37712',
        margin:10,
        width:300,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
    header:{
        backgroundColor:'#e37712',
        alignItems:'center',
        justifyContent:'center',
        height:100,
    },
    headerText:{
        color:'white',
        fontSize:30,
        fontWeight:'900',
    },
    results:{
        backgroundColor:'black',
        height:100,
        margin:10,
        width:300,
        alignItems:'center',
        justifyContent:'center',
    },
    resultsText:{
        color:'#e37712',
        fontSize:20,
        fontWeight:'900',
    },
    dropdown: {
        width: 150,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        paddingHorizontal: 10,
        justifyContent: "center",
        color: "#ccc",
        marginTop:10,
      },
})