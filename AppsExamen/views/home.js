import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {Input} from 'react-native-elements';
import {collection, addDoc, getDocs, deleteDoc, getFirestore} from 'firebase/firestore';
import { firebaseConfig } from '../firebase_config';

import { initializeApp } from 'firebase/app';
import { NumberInput } from 'native-base';

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default function App () {

    const [data, setdata] = useState({
      nproducto:"",
      desc:"",
      precio:"",
    });

    const changeText = (key, value) => {
      setdata({...data, [key]: value});
    }

    const Agregar = () => {
      if(data.nproducto == '' || data.desc == '' || data.precio == ''){
        Alert.alert('Favor de llenar todos los campos')
      }else{
        onSend(data);
        Alert.alert("Mensaje", "Producto agregado")
      }
    }

    const onSend = async() => {
      const docRef = await addDoc(collection(db, 'productos/'),data);
    }

    const allUsers = async() => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }

  return (<>
    <View style={{textAlign:'center', width:200}}>
      <Text style={{fontSize:30, padding:30, marginTop:50}}>Agregar Productos</Text>
    </View>
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View>
        <Input placeholder='Nombre del productos' style={styles.input} onChangeText={(value) => changeText('nproducto', value)} value={data.username}/>
      </View>
      <View>
        <Input placeholder='Descripción del producto' style={styles.input} onChangeText={(value) => changeText('desc', value)}/>
      </View>
      <View>
        <Input placeholder='Precio' keyboardType='numeric' style={styles.input} onChangeText={(value) => changeText('precio', value)} />
      </View>
      <View style={{padding:10}}>
        <Button onPress={() => {Agregar()}} title="Agregar producto"/>
      </View>
      <View style={{padding:10}}>
        <Button color='blue' onPress={() => {allUsers();}} title="Ver productos"/>
      </View>
      {/* <View style={{padding:10}}>
        <Button color='red' onPress={() => {Eliminar();}} title="Eliminar"/>
      </View> */}
    </ScrollView></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});