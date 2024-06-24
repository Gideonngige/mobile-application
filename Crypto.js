import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from 'react-native-paper';
import { StyleSheet, View, StatusBar, Image, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Crypto(){
    const [c1, setC1] = useState(0);
    const [c1Image, setC1Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [cID1, setID1] = useState('');
    const [c2, setC2] = useState(0);
    const [cID2, setID2] = useState('');
    const [c2Image, setC2Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c3, setC3] = useState(0);
    const [cID3, setID3] = useState('');
    const [c3Image, setC3Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c4, setC4] = useState(0);
    const [cID4, setID4] = useState('');
    const [c4Image, setC4Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c5, setC5] = useState(0);
    const [cID5, setID5] = useState('');
    const [c5Image, setC5Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c6, setC6] = useState(0);
    const [cID6, setID6] = useState('');
    const [c6Image, setC6Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c7, setC7] = useState(0);
    const [cID7, setID7] = useState('');
    const [c7Image, setC7Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c8, setC8] = useState(0);
    const [cID8, setID8] = useState('');
    const [c8Image, setC8Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c9, setC9] = useState(0);
    const [cID9, setID9] = useState('');
    const [c9Image, setC9Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const [c10, setC10] = useState(0);
    const [cID10, setID10] = useState('');
    const [c10Image, setC10Image] = useState('https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206');
    const fetchCryptoData = async () => {
        try{
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets',{
                params:{
                    vs_currency:'usd',
                    order:'market_cap_desc',
                    per_page:10,
                    page:1,
                },
            });
            const data = response;
            setC1(data.data[0].id);
            setID1(data.data[0].current_price);
            setC1Image(data.data[0].image);
            setC2(data.data[1].id);
            setID2(data.data[1].current_price);
            setC2Image(data.data[1].image);
            setC3(data.data[2].id);
            setID3(data.data[2].current_price);
            setC1Image(data.data[2].image);
            setC4(data.data[3].id);
            setID4(data.data[3].current_price);
            setC4Image(data.data[3].image);
            setC5(data.data[4].id);
            setID5(data.data[4].current_price);
            setC5Image(data.data[4].image);
            setC6(data.data[5].id);
            setID6(data.data[5].current_price);
            setC6Image(data.data[5].image);
            setC7(data.data[6].id);
            setID7(data.data[6].current_price);
            setC7Image(data.data[6].image);
            setC8(data.data[7].id);
            setID8(data.data[7].current_price);
            setC8Image(data.data[7].image);
            setC9(data.data[8].id);
            setID9(data.data[8].current_price);
            setC9Image(data.data[8].image);
            setC10(data.data[9].id);
            setID10(data.data[9].current_price);
            setC10Image(data.data[9].image);
            
            for (var i = 0; i <= 5; i++){
                console.log(data.data[i].id + " " + data.data[i].current_price + " " + data.data[i].image)
            }
            //console.log('Cryptocurrency data:', data);
        }
        catch(error){
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchCryptoData();
    },[])

    return(
        <View>
            <View style={styles.header}>
            <Text style={styles.headerText}>CRYPTOCURRENCY APP</Text>
            <TouchableOpacity
            style={styles.refresh}
            onPress={fetchCryptoData}
            >
                    <Text style={styles.refreshText}>REFRESH</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text style={styles.tableHeader}>Coin</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeader}>Current Price</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeader}>Icon</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c1}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID1}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c1Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c2}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID2}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c2Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c3}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID3}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c3Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c4}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID4}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c4Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c5}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID5}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c5Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c6}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID6}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c6Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c7}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID7}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c7Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c8}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID8}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c8Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c9}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID9}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c9Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.tableHeader}>{c10}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.tableHeader}>{cID10}</Text></DataTable.Cell>
                        <DataTable.Cell><Image  source={{uri:c10Image}}
            style={{width:50, height:50,}}
            /></DataTable.Cell>
                    </DataTable.Row>
            </DataTable>
            </ScrollView>
            <StatusBar />
            <View style={styles.footer}>
                <Text style={styles.footerText}>Created at G-Tech Company</Text>
                <Text>&copy;2024</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    header:{
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        height:100,
    },
    headerText:{
        fontSize:20,
        color:'white',
        fontWeight:'900',
    },
    tableHeader:{
        fontSize:15,
        color:'black',
        fontWeight:'900',
    },
    footer:{
        backgroundColor:'orange',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    footerText:{
        fontSize:20,
        fontWeight:'900',
    },
    refresh:{
        backgroundColor:'black',
        width:80,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
    refreshText:{
        color:'orange',
        fontWeight:'900',
        elevation:10,
    },
})