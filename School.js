import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity, StatusBar, } from "react-native";
import React, { cloneElement, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataTable } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/core';
import * as Speech from 'expo-speech';

export default function School(){
   
    const database = async () => {
        const db = await SQLite.openDatabaseAsync('school');
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS information (id INTEGER PRIMARY KEY NOT NULL, form INTEGER, info TEXT);
            INSERT INTO information(form, info) VALUES(1,'schools to be opened on Monday,period!');
            `);
            console.log("Table information created!");
        }
    const Stack = createNativeStackNavigator();
    
    function Login({navigation}){
        var [name, setName] = useState('Name');
        const [password, setPassword] = useState('Password');
        const handleLogin = async() => {
            const db = await SQLite.openDatabaseAsync('school');
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                `);
                for await (const row of db.getEachAsync('SELECT * FROM student WHERE id = ?', password.trim())) {
                    if (name.trim() === row.name){
                        var id = row.id
                        var billed = row.billed;
                        var paid = row.paid;
                        var balance = row.balance;
                        var classteacher = row.classteacher;
                        var form  = row.form;
                        var mathematics = row.mathematics;
                        var english = row.english;
                        var kiswahili = row.kiswahili;
                        var chemistry = row.chemistry;
                        var physics = row.physics;
                        var biology = row.biology;
                        var history = row.history;
                        console.log(row.id, row.name, row.form, row.mathematics, row.english, row.kiswahili, row.chemistry, row.physics, row.biology, row.history, row.classteacher);
                        navigation.navigate('Home', {name,id, billed, paid, balance, classteacher, form, mathematics, english, kiswahili, chemistry, physics, biology, history});
                        break;
                    }
                    else{alert('Wrong details')}
                    console.log(row.id, row.name, row.form, row.mathematics, row.english, row.kiswahili, row.chemistry, row.physics, row.biology, row.history);
                    }
            
        }
        return(
            <View style={styles.login}>
            <View style={styles.loginPart}>
            <Text style={styles.loginHeader}>Login</Text>
            <Text style={styles.loginLabel}>Name</Text>
            <TextInput 
            style={styles.loginInput}
            value={name}
            onChangeText={setName}
            keyboardType="text"
            placeholder="enter name"
            />
            <Text style={styles.loginLabel}>Password</Text>
            <TextInput 
            style={styles.loginInput}
            value={password}
            onChangeText={setPassword}
            keyboardType="numeric"
            placeholder="enter password"
            />

            <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            >
                <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
            </View>
            <StatusBar/>
        </View>
        );
    }

    function Home({navigation}){
        const [form1Std, setForm1Std] = useState(0);
        const [form2Std, setForm2Std] = useState(0);
        const [form3Std, setForm3Std] = useState(0);
        const [form4Std, setForm4Std] = useState(0);

        const [form1Mean, setForm1Mean] = useState(0);
        const [form2Mean, setForm2Mean] = useState(0);
        const [form3Mean, setForm3Mean] = useState(0);
        const [form4Mean, setForm4Mean] = useState(0);

        const [form1Grade, setForm1Grade] = useState('A');
        const [form2Grade, setForm2Grade] = useState('A');
        const [form3Grade, setForm3Grade] = useState('A');
        const [form4Grade, setForm4Grade] = useState('A');

        const handleMessages = () => {
            navigation.navigate('Messages',{form});
        }
        const handleResults = () => {
            navigation.navigate('Results',{name,id, form, mathematics, english, kiswahili, chemistry, physics, biology, history});

        }
        const handlePayment = () => {
            alert("Coming soon!!");
        }
        const handleTutorials = () => {
            navigation.navigate('Tutorials');
        }
        const handleAddMarks = () => {
            navigation.navigate('AddMarks');
        }
        useEffect(() => {
            calcTotal();
        },[]);
        
        const calcTotal = async () => {
            const db = await SQLite.openDatabaseAsync('school');
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                `);
                var form1 = 0;
                var form2 = 0;
                var form3 = 0;
                var form4 = 0;
                var form1Sub = 0;
                var form2Sub = 0;
                var form3Sub = 0;
                var form4Sub = 0;
                var totalMarks1 = 0;
                var totalMarks2 = 0;
                var totalMarks3 = 0;
                var totalMarks4 = 0;
                var avg1 = 0;
                var avg2 = 0;
                var avg3 = 0;
                var avg4 = 0;

                for await (const row of db.getEachAsync('SELECT * FROM student WHERE form = 1')) {
                    form1 += 1;
                    form1Sub += 7;
                    totalMarks1 += row.mathematics + row.english + row.kiswahili + row.chemistry + row.physics + row.biology + row.history;
                    }
                    setForm1Std(form1);
                    avg1 = (totalMarks1 / form1Sub).toFixed(2);
                    setForm1Mean(avg1);
                    if (avg1 >= 70 && avg1 <= 100){ setForm1Grade("A");}
                    else if(avg1 >= 60 && avg1 <= 69){setForm1Grade("B")}
                    else if(avg1 >= 40 && avg1 <= 59){setForm1Grade("C")}
                    else{setForm1Grade("D")}

                    console.log("Form 1 are ", form1);
                    console.log('Total marks ', totalMarks1);
                    console.log("Average: ", avg1);
                //for form two
                for await (const row of db.getEachAsync('SELECT * FROM student WHERE form = 2')) {
                    form2 += 1;
                    form2Sub += 7;
                    totalMarks2 += row.mathematics + row.english + row.kiswahili + row.chemistry + row.physics + row.biology + row.history;
                    }
                    setForm2Std(form2);
                    avg2 = (totalMarks2 / form2Sub).toFixed(2);
                    setForm2Mean(avg2);
                    if (avg2 >= 70 && avg2 <= 100){ setForm2Grade("A");}
                    else if(avg2 >= 60 && avg2 <= 69){setForm2Grade("B")}
                    else if(avg2 >= 40 && avg2 <= 59){setForm2Grade("C")}
                    else{setForm2Grade("D")}
                    console.log("Form 2 are ", form2);
                    console.log('Total marks ', totalMarks2);
                //for form three
                for await (const row of db.getEachAsync('SELECT * FROM student WHERE form = 3')) {
                    form3 += 1;
                    form3Sub += 7;
                    totalMarks3 += row.mathematics + row.english + row.kiswahili + row.chemistry + row.physics + row.biology + row.history;
                    }
                    setForm3Std(form3);
                    avg3 = (totalMarks3 / form3Sub).toFixed(2);
                    setForm3Mean(avg3);
                    if (avg3 >= 70 && avg3 <= 100){ setForm3Grade("A");}
                    else if(avg3 >= 60 && avg3 <= 69){setForm3Grade("B")}
                    else if(avg3 >= 40 && avg3 <= 59){setForm3Grade("C")}
                    else{setForm3Grade("D")}
                    console.log("Form 3 are ", form3);
                    console.log('Total marks ', totalMarks3);
                //for form four
                for await (const row of db.getEachAsync('SELECT * FROM student WHERE form = 4')) {
                    form4 += 1;
                    form4Sub += 7;
                    totalMarks4 += row.mathematics + row.english + row.kiswahili + row.chemistry + row.physics + row.biology + row.history;
                    }
                    setForm4Std(form4);
                    avg4 = (totalMarks4 / form4Sub).toFixed(2);
                    setForm4Mean(avg4);
                    if (avg4 >= 70 && avg4 <= 100){ setForm4Grade("A");}
                    else if(avg4 >= 60 && avg4 <= 69){setForm4Grade("B")}
                    else if(avg4 >= 40 && avg4 <= 59){setForm4Grade("C")}
                    else{setForm4Grade("D")}
                    console.log("Form 4 are ", form4);
                    console.log('Total marks ', totalMarks4);

        }
        const route = useRoute();
        const {name, id, billed, paid, balance, classteacher, form, mathematics, english, kiswahili, chemistry, physics, biology, history} = route.params;
        return(
            <View style={styles.home}>
                <ScrollView>
                <View style={styles.navbar}>
                    <TouchableOpacity
                    style={styles.navbarBtn}
                    onPress={handleResults}
                    >
                        <Text style={styles.navbarText}>Results</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.navbarBtn}
                    onPress={handleMessages}
                    >
                        <Text style={styles.navbarText}>Messages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.navbarBtn}
                    onPress={handleAddMarks}
                    >
                        <Text style={styles.navbarText}>Add Marks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.navbarBtn}
                    onPress={handleTutorials}
                    >
                        <Text style={styles.navbarText}>Tutorials</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.details}>
                    <Image source={require('../../app/images/user.png')} style={styles.image}/>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Name {name}</Text>
                        <Text style={styles.nameText}>Form {form}</Text>
                        <Text style={styles.nameText}>Classteacher {classteacher}</Text>
                    </View>

                    <View style={styles.name}>
                        <Text style={styles.nameText}>Total Billed Ksh.{billed}</Text>
                        <Text style={styles.nameText}>Total Paid Ksh.{paid}</Text>
                        <Text style={styles.nameText}>Total Balance Ksh.{balance}</Text>
                        <TouchableOpacity
                        style={styles.paymentBtn}
                        onPress={handlePayment}
                        >
                            <Text style={styles.paymentText}>Make Payment</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Our Students</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title><Text style={styles.header}>Form</Text></DataTable.Title>
                                <DataTable.Title><Text style={styles.header}>Students</Text></DataTable.Title>
                                <DataTable.Title><Text style={styles.header}>Mean Score</Text></DataTable.Title>
                                <DataTable.Title><Text style={styles.header}>Mean Grade</Text></DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>1</DataTable.Cell>
                                <DataTable.Cell>{form1Std}</DataTable.Cell>
                                <DataTable.Cell>{form1Mean}</DataTable.Cell>
                                <DataTable.Cell>{form1Grade}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>2</DataTable.Cell>
                                <DataTable.Cell>{form2Std}</DataTable.Cell>
                                <DataTable.Cell>{form2Mean}</DataTable.Cell>
                                <DataTable.Cell>{form2Grade}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>3</DataTable.Cell>
                                <DataTable.Cell>{form3Std}</DataTable.Cell>
                                <DataTable.Cell>{form3Mean}</DataTable.Cell>
                                <DataTable.Cell>{form3Grade}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>4</DataTable.Cell>
                                <DataTable.Cell>{form4Std}</DataTable.Cell>
                                <DataTable.Cell>{form4Mean}</DataTable.Cell>
                                <DataTable.Cell>{form4Grade}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                        
                    </View>
                    
                </View>
                </ScrollView>
                <StatusBar/>
            </View>
        );
    }

    function Messages({navigation}){
        const [msg, setMsg] = useState();
        const route = useRoute();
        const {form} = route.params;

        useEffect(() => {
            getMessages();
        },[]);
        const getMessages = async () => {
            const db = await SQLite.openDatabaseAsync('school');
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            `);
            for await (const row of db.getEachAsync('SELECT * FROM information WHERE form = ?', form)) {
                console.log(row.id, row.form, row.info);
                setMsg(row.info);
                }
        }
        return(
            <View style={styles.messages}>
                <View style={styles.messagesText}>
                    <Text style={styles.txt}>{msg}</Text>
                </View>
                <View style={styles.messagesText}>
                    <Text style={styles.txt}>Schools to be closed tommorrow.</Text>
                </View>
        </View>
        );
    }

    function Results({navigation}){
        const route = useRoute();
        const {name,id, form, mathematics, english, kiswahili, chemistry, physics, biology, history} = route.params;
        const [meanStd, setMeanStd] = useState(0);
        const [meanGrade, setMeanGrade] = useState('C+');
        const [pricomment, setPricomment] = useState("Good");
        const [clsComment, setClsComment] = useState("Good, Aim hire!");

        useEffect(() => {calcStudentMarks();},[]);
        const calcStudentMarks = () => {
            var total = mathematics + english + kiswahili + chemistry + physics + biology + history;
            var avgStd = (total / 7).toFixed(2);
            setMeanStd(avgStd);
            if(avgStd >= 70 && avgStd <= 100){setMeanGrade("A"); setPricomment('Excellence, Keep Aiming higher!');setClsComment('Excellence, Keep moving!');}
            else if(avgStd >= 60 && avgStd <= 69){setMeanGrade("B");setPricomment('Very Good, Aim higher!'); setClsComment('Very Good, Sky is the limit');}
            else if(avgStd >= 50 && avgStd <= 59){setMeanGrade("C+"); setPricomment('Good, you have potential!');setClsComment("Good, you have the ability!")}
            else{setMeanGrade("C"); setPricomment("Good trial!"); setClsComment('Good trial, pull up your socks!')}
        }
        return (
            <View style={styles.messages}>
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsText}>Name {name}</Text>
                    <Text style={styles.resultsText}>Form {form}</Text>
                    <Text style={styles.resultsText}>Admission No. {id}</Text>
                </View>
                <View style={styles.name}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title><Text style={styles.header}>Term</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.header}>Mean Points</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.header}>Mean Grade</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>1</DataTable.Cell>
                        <DataTable.Cell>{meanStd}</DataTable.Cell>
                        <DataTable.Cell>{meanGrade}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2</DataTable.Cell>
                        <DataTable.Cell>-</DataTable.Cell>
                        <DataTable.Cell>-</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>3</DataTable.Cell>
                        <DataTable.Cell>-</DataTable.Cell>
                        <DataTable.Cell>-</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Year Avg.</DataTable.Cell>
                        <DataTable.Cell>-</DataTable.Cell>
                        <DataTable.Cell>-</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                </View>
                <View>
                    <Text style={styles.commentText}>Principal comment: {pricomment}</Text>
                    <Text style={styles.commentText}>Classteacher comment: {clsComment}</Text>
                    <Text style={styles.commentText}>School closed on: 21/04/2022</Text>
                    <Text style={styles.commentText}>School open on: 6/05/2022</Text>
                </View>

            </View>
        );
    }

    function Tutorials({navigation}){
        const form1Bio =  "1.Introduction to biology:Biology is the scientific study of living organisms.It encompasses various aspects, including the structure, function, growth, evolution, and classification of living things." + 
        "\n2.Definition of Biology:Biology is the scientific study of life and living organisms.\nIt encompasses various aspects, including structure, function, growth, evolution, and interactions.\n3.Branches of Biology\n(a).Zoology: The study of animals\n(b).Botany: The study of plants" +

"\n(c).Microbiology: The study of microorganisms.\n"+
"4.Other branches include:\n (a).ecology\n (b).genetics \n(c).entomology, and \n(d).parasitology.\n"+
"\n5.Importance of Biology:\n"+
"(a).Understanding biology helps us comprehend the natural world and our place in it." +
"It informs medical advancements, environmental conservation, and agricultural practices."+
"\n(b)Understanding the Fundamentals of Life:"+
"\n-Biology provides an unparalleled window into life’s origins, diversity, workings, genetics, and evolution."+
"\n-By studying the basic building blocks that constitute life—such as cells, DNA, proteins, organs, and tissues—scientists uncover secrets of how living organisms grow, develop, adapt, and interact with the environment."+
"\n-Areas like molecular biology, microbiology, physiology, and anatomy reveal life’s operational blueprints. Concepts like DNA’s double helical structure, the genetic code, and bioelectricity form the foundation for advances in medicine, biotechnology, neuroscience, and agriculture.";
        const ReadNotes = () => {
            Speech.speak(form1Bio);
        }
        const [newWord, setNewWord] = useState("");
        const [checkedWord, setCheckedWord] = useState("");
        const [definition, setDefinition] = useState("");
        const [example, setExample] = useState("");
        const Dictionary = async() => {
            let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;
            try{
                const response = await fetch(url);
                const fetchedData = await response.json();
                
                if(response.status === 200){
                    console.log(response.status);
                    let word = fetchedData[0].word;
                    console.log(word);
                    setCheckedWord(word);
                    let def = fetchedData[0].meanings[0].definitions[0].definition;
                    setDefinition(def);
                    let eg = fetchedData[0].meanings[0].definitions[0].example;
                    console.log(def);
                    setExample(eg);
                    alert(
                        word + "\n" + def + "\n" + eg
                    );        

                }
                else{
                    alert('Word not found!');
                }
            }
            catch(error){
                alert('Error while fetching data: ', error);
            }
            setNewWord(" ");

        }
        return(
            <View style={styles.tutorials}>
                <View style={styles.search}>
                    <TextInput
                    style={styles.searchInput}
                    keyboardType="text"
                    placeholder="search here"
                    value={newWord}
                    onChangeText={setNewWord}
                     />
                     <TouchableOpacity
                     style={styles.searchBtn}
                     onPress={Dictionary}
                     >
                        <Text style={styles.searchText}>Search</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                     style={styles.readBtn}
                     onPress={ReadNotes}
                     >
                        <Text style={styles.readText}>Read</Text>
                     </TouchableOpacity>
                </View>
                <ScrollView>
                <View style={styles.subject}>
                    <Text style={{textAlign:'center',color:'white', fontSize:20,fontWeight:'900'}}>Form 1</Text>
                    <Text style={{color:'white', fontSize:15}}>Biology</Text>
                    <View style={{backgroundColor:'white', margin:5}}>
                        <Text style={{color:'black',margin:2,}}>{form1Bio}</Text>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }

    //for teacher to add marks
    function AddMarks({navigation}){
        const [admissionNo, setAdmissionNo] = useState(1);
        const [math, setMath] = useState(0);
        const [eng, setEng] = useState(0);
        const [kisw, setKisw] = useState(0);
        const [chem, setChem] = useState(0);
        const [phyc, setPhyc] = useState(0);
        const [bio, setBio] = useState(0);
        const [hist, setHist] = useState(0);
        const handleNewStudent = () => {
            navigation.navigate("Administration")
        }
        //function for adding new marks for new and existing students
        const addNewMarks = async () => {
        const db = await SQLite.openDatabaseAsync('school');
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            UPDATE student SET mathematics = ${math}, english = ${eng}, kiswahili = ${kisw},chemistry = ${chem},physics = ${phyc}, biology = ${bio},history = ${hist} WHERE id = ${admissionNo};
            `);
            alert('Marks added succesfully!!');
        }
        return (
            <View style={{backgroundColor:'#1069ad', flex:1}}>
                <View>
                    <Text style={{color:'white', margin:5}}>Name: Mr.Kitungu</Text>
                </View>
                    <View style={{backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
                        <Text style={styles.marksText}>Admission Number</Text>
                        <TextInput
                        style={styles.marksInput}
                        placeholder="enter admission number"
                        keyboardType="numeric"
                        value={admissionNo}
                        onChangeText={setAdmissionNo}
                        />
                    </View>
                <View style={styles.mark}>
                <View style={styles.marks}>
                        <Text style={styles.subjectText}>Mathematics</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={math}
                        onChangeText={setMath}
                        />
                        <Text style={styles.subjectText}>English</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={eng}
                        onChangeText={setEng}
                        />
                        <Text style={styles.subjectText}>Kiswahili</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={kisw}
                        onChangeText={setKisw}
                        />
                </View>
                <View style={styles.marks}>
                        <Text style={styles.subjectText}>Chemistry</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={chem}
                        onChangeText={setChem}
                        />
                        <Text style={styles.subjectText}>Physics</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={phyc}
                        onChangeText={setPhyc}
                        />
                        <Text style={styles.subjectText}>Biology</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={bio}
                        onChangeText={setBio}
                        />
                </View>
                <View style={styles.marks}>
                        <Text style={styles.subjectText}>History</Text>
                        <TextInput 
                        style={styles.subjectInput}
                        keyboardType="numeric"
                        value={hist}
                        onChangeText={setHist}
                        />
                        <TouchableOpacity
                        onPress={handleNewStudent}
                        style={styles.subjectBtnC}>
                            <Text style={styles.subjectBtnText}>Admin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.subjectBtnS}
                        onPress={addNewMarks}
                        >
                            <Text style={styles.subjectBtnText}>Submit</Text>
                        </TouchableOpacity>
                </View>
                </View>
                
            </View>
        );
    }
    //for the admistration
    function Administration({navigation}) {
        const [name, setName] = useState("");
        const [form, setForm] = useState();
        const [type, setType] = useState()
        const [messageT, setMessageT] = useState();
        const [billed, setBilled] = useState(21000);
        const [paid, setPaid] = useState(0);
        const [adm, setAdm] = useState();
        const addNewStudent = async () => {
            const db = await SQLite.openDatabaseAsync('school');
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                `);
                var classteacher = " ";
                if(form == 1){
                    classteacher = "Mr.Patrick Omwamba";
                    const result = await db.runAsync('INSERT INTO student (name, form, mathematics, english, kiswahili, chemistry, physics, biology, history, paid, billed, balance, classteacher) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', name,form,null,null,null,null,null,null,null, null,null,null,classteacher); 
                    console.log(result.lastInsertRowId, result.changes);
                }
                else if (form == 2){
                    classteacher = "Madam Grace Wangari";
                    const result = await db.runAsync('INSERT INTO student (name, form, mathematics, english, kiswahili, chemistry, physics, biology, history, paid, billed, balance, classteacher) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', name,form,null,null,null,null,null,null,null, null,null,null,classteacher); 
                    console.log(result.lastInsertRowId, result.changes);

                }
                else if(form == 3){
                    classteacher = "Mr.John Gatungi";
                    const result = await db.runAsync('INSERT INTO student (name, form, mathematics, english, kiswahili, chemistry, physics, biology, history, paid, billed, balance, classteacher) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', name,form,null,null,null,null,null,null,null, null,null,null,classteacher); 
                    console.log(result.lastInsertRowId, result.changes);
                }
                else if(form == 4){
                    classteacher = "Mr.Paul Marungi";
                    const result = await db.runAsync('INSERT INTO student (name, form, mathematics, english, kiswahili, chemistry, physics, biology, history, paid, billed, balance, classteacher) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', name,form,null,null,null,null,null,null,null, null,null,null,classteacher); 
                    console.log(result.lastInsertRowId, result.changes);
                }
                console.log(form);
        }

        const paySchoolFess = async () => {
            const db = await SQLite.openDatabaseAsync('school');
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                UPDATE student SET billed = ${billed}, paid = ${paid}, balance = ${billed} - ${paid} WHERE id = ${adm};
                `);
            console.log("Values changed successfully!");
        }
        const newMessage = async()=>{
            const db = await SQLite.openDatabaseAsync('school');
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS information (id INTEGER PRIMARY KEY NOT NULL, form INTEGER, info TEXT);
                `);
            const result = await db.runAsync('INSERT INTO information (form, info) VALUES (?, ?)', type,messageT); 
            console.log(result.lastInsertRowId, result.changes, result.info);
            console.log("message added!");

        }
        
        return (
            <View style={{alignItems:"center", justifyContent:"center",backgroundColor:'#1069ad', flex:1,}}>
                <ScrollView>
                <View style={{ width:'96%', margin:5,}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'900',textAlign:'center'}}>Admit New Student</Text>

                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'black', fontWeight:'600', margin:5}}>Name</Text>
                    <TextInput
                    style={{backgroundColor:"white",margin:5,minWidth:160,}}
                    value={name}
                    onChangeText={setName}
                     />
                </View>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'black', fontWeight:'600', margin:5,}}>Form</Text>
                    <TextInput
                    style={{backgroundColor:"white",margin:5,minWidth:160,}}
                    value={form}
                    keyboardType="numeric"
                    onChangeText={setForm}
                     />
                </View>
                </View>
                <View style={styles.admit}>
                    <TouchableOpacity
                    style={styles.admitBtn} 
                    onPress={addNewStudent}
                    >
                        <Text style={styles.admitText}>Admit</Text>
                    </TouchableOpacity>
                </View>
                 
                <Text style={{color:'white', fontSize:20, fontWeight:'900',textAlign:'center'}}>Pay School Fees</Text>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'black', fontWeight:'600', margin:5}}>Admission number</Text>
                    <TextInput
                    style={{backgroundColor:"white",margin:5,minWidth:160,}}
                    value={adm}
                    onChangeText={setAdm}
                    keyboardType="numeric"
                     />
                </View>

                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'black', fontWeight:'600', margin:5}}>Billed</Text>
                    <TextInput
                    style={{backgroundColor:"white",margin:5,minWidth:160,}}
                    value={billed}
                    onChangeText={setBilled}
                    keyboardType="numeric"
                     />
                </View>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'black', fontWeight:'600', margin:5}}>Paid</Text>
                    <TextInput
                    style={{backgroundColor:"white",margin:5,minWidth:160,}}
                    value={paid}
                    onChangeText={setPaid}
                    keyboardType="numeric"
                     />
                </View>
                </View>
                <View style={styles.admit}>
                    <TouchableOpacity
                    style={styles.admitBtn} 
                    onPress={paySchoolFess}
                    >
                        <Text style={styles.admitText}>Pay Fees</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.message}>
                    <Text style={styles.messageHeader}>Message</Text>
                    <View style={styles.messageInput}>
                        <Text style={styles.classText}>Class</Text> 
                        <TextInput
                        style={styles.classInput}
                        value={type}
                        onChangeText={setType}
                        keyboardType="numeric"
                         />
                         <Text style={styles.sendText}>Message</Text> 
                        <TextInput
                        style={styles.sendInput}
                        placeholder="enter message"
                        value={messageT}
                        onChangeText={setMessageT}
                        keyboardType="text"
                        
                         />

                <TouchableOpacity
                style={styles.admitBtn}
                onPress={newMessage}
                >
                    <Text style={styles.admitText}>Send</Text>
                </TouchableOpacity>
                    </View>
                </View>
               

                </View>
                </ScrollView>
                
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Messages" component={Messages}></Stack.Screen>
                <Stack.Screen name="Results" component={Results}></Stack.Screen>
                <Stack.Screen name="Tutorials" component={Tutorials}></Stack.Screen>
                <Stack.Screen name="AddMarks" component={AddMarks}></Stack.Screen>
                <Stack.Screen name="Administration" component={Administration}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );

}
const styles = StyleSheet.create({
    login:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    loginPart:{
        backgroundColor:'#1069ad',
        width:'90%',
        borderRadius:10,
        elevation:10,
    },
    loginHeader:{
        fontSize:30,
        fontWeight:'900',
        color:'white',
        textAlign:'center',
    },
    loginLabel:{
        color:'black',
        fontSize:15,
        fontWeight:'500',
        margin:10,
    },
    loginInput:{
        backgroundColor:'white',
        margin:10,
    },
    loginBtn:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        marginLeft:50,
        marginRight:50,
        marginBottom:15,
        height:30,
        borderRadius:10,
        elevation:10,
    },
    loginBtnText:{
        color:'#1069ad',
        fontWeight:'700',
    },
    home:{
        flex:1,
        alignItems:'center',
        
    },
    navbar:{
        flexDirection:'row',
        backgroundColor:'#1069ad',
        width:360,
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
    navbarBtn:{
        backgroundColor:'white',
        padding:10,
        marginRight:5,
    },
    navbarText:{
        color:'#1069ad',
        fontSize:15,
        fontWeight:'900',
    },
    details:{
        alignItems:'center',
        margin:10,
        backgroundColor:'#1069ad',
        borderRadius:10,
    },
    image:{
        width:200,
        height:200,
        borderRadius:50,
        margin:10,
    },
    name:{
        backgroundColor:'white',
        margin:10,
        width:'90%'
    },
    nameText:{
        fontSize:15,
        color:'#1069ad',
        fontWeight:'900',
    },
    paymentBtn:{
        backgroundColor:'black',
        marginLeft:40,
        marginRight:40,
        margin:10,
        alignItems:'center',
        justifyContent:'center',
        height:30,
        borderRadius:10,
        elevation:10,
    },
    paymentText:{
        color:'white'
    },
    header:{
        color:'black',
        fontWeight:'900',
    },
    messages:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#1069ad',
    },
    messagesText:{
        backgroundColor:'white',
        height:'auto',
        margin:10,
        borderBottomRightRadius:20,
        borderTopLeftRadius:20,
    },
    txt:{
        margin:10,
        color:'black',
    },
    resultsHeader:{
        
        margin:10,
        width:'90%'
    },
    resultsText:{
        fontSize:15,
        color:'white',
        fontWeight:'900',
    },
    commentText:{
        color:'white',
        fontSize:15,
    },
    tutorials:{
        flex:1,
        backgroundColor:'#1069ad'
    },
    search:{
        backgroundColor:'black',
        height:40,
        flexDirection:'row',
    },
    searchInput:{
        backgroundColor:'white',
        margin:5,
        width:200,
        borderRadius:10,
        color:'#1069ad',
        textAlign:'center',
        
    },
    searchBtn:{
        backgroundColor:'white',
        margin:5,
        width:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    searchText:{
        color:'#1069ad',
        fontWeight:'900',
    },
    readBtn:{
        backgroundColor:'#1069ad',
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        width:70,
        borderRadius:50,
    },
    readText:{
        color:'white',
        fontSize:15,
        fontWeight:'900',
    },
    mark:{
        flexDirection:"row",
        backgroundColor:'white',
        
    },
    marks:{
        flexDirection:'column',
    },
    marksText:{
        color:'#1069ad',
        margin:5,
    },
    marksInput:{
        backgroundColor:'#1069ad',
        width:230,
        margin:10,
        color:'white',
        textAlign:'center',
        borderRadius:5,
    },
    subjectText:{
        color:'#1069ad',
        margin:5,
    },
    subjectInput:{
        backgroundColor:'#1069ad',
        minWidth:110,
        margin:5,
        color:'white',
    },
    subjectBtnC:{
        backgroundColor:'black',
        margin:5,
        marginTop:25,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    subjectBtnS:{
        backgroundColor:'black',
        margin:5,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        elevation:10,
    },
    subjectBtnText:{
        color:'white',
        fontSize:20,
        fontWeight:'900',
        elevation:10,
    },
    admit:{
        alignItems:"center",
    },
    admitBtn:{
        backgroundColor:"white",
        width:100,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        borderRadius:10,
    },
    admitText:{
        fontSize:20,
        fontWeight:'900',
    },
    message:{
        flexDirection:'column',
    },
    messageHeader:{
        fontSize:20,
        color:'white',
        fontWeight:'900',
        margin:5,
    },
    messageInput:{
        alignItems:"center",
    },
    classText:{
        fontSize:20,

    },
    classInput:{
        backgroundColor:'white',
        width:200,
        margin:5,
    },
    sendText:{
        fontSize:20,
    },
    sendInput:{
        backgroundColor:"white",
        width:'90%',
        height:150,
        borderRadius:10,
        margin:5,
        textAlign:'center',
    },
    sendBtn:{
        backgroundColor:"white",
        width:100,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        borderRadius:10,
    },
});