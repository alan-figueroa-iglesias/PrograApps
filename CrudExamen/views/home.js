import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {collection, addDoc, getDocs, deleteDoc, getFirestore, doc, updateDoc} from 'firebase/firestore';
import { firebaseConfig } from '../firebase_config';
import  {firestore}  from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { NumberInput } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { Button } from "@rneui/themed";

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default function App () {
  const navigation = useNavigation();

    const [data, setdata] = useState({
      nproducto:"",
      descripcion:"",
      precio:"",
    });

    const [id, setid] = useState("");

    const changeText = (key, value) => {
      setdata({...data, [key]: value});
    }

    const editar = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      querySnapshot.forEach((doc) => {
        if (doc.data().nproducto === data.nproducto){
          setid(doc.id);
        }
      });

      if(id === '') {
      } else {
        const docRef = doc(db, "productos", id);
        updateDoc( docRef, {
          nproducto: data.nproducto,
          descripcion: data.descripcion,
          precio: data.precio,
        });
        Alert.alert("Mensaje", "Producto actualizado");
      }
    }

    const onSend = async() => {
      const docRef = await addDoc(collection(db, 'productos/'),data);
    }

  return (<>
    <View style={{textAlign:'center', width:400}}>
      <Text style={{fontSize:30, padding:30, marginTop:50}}>Ingresar los datos a modificar</Text>
    </View>
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View>
        <Input placeholder='Nombre del producto' style={styles.input} onChangeText={(value) => changeText('nproducto', value)} value={data.username}/>
      </View>
      <View>
        <Input placeholder='Descripción del producto' style={styles.input} onChangeText={(value) => changeText('descripcion', value)}/>
      </View>
      <View>
        <Input placeholder='Precio' keyboardType='numeric' style={styles.input} onChangeText={(value) => changeText('precio', value)} />
      </View>
      <View style={{padding:10}}>
        <Button radius='lg' color='blue' onPress={() => {editar()}} title="Editar producto"/>
      </View>
      <View style={{padding:10}}>
        <Button radius='lg' color='purple' onPress={() => navigation.goBack()} title="Regresar"/>
      </View>
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