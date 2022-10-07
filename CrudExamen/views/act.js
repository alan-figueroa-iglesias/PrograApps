import React , { useState, useEffect }from 'react';

import { StyleSheet, View, Button, FlatList, ScrollView, Alert, Text} from 'react-native';
import { firebaseConfig } from '../firebase_config';
import {Input} from 'react-native-elements';
import { initializeApp } from 'firebase/app';
import ItemTask from '../component/ItemTask';
import { getFirestore, getDocs, addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const AddProduct = () => {
  const navigation = useNavigation();

    const [newItem, setNewItem] = React.useState({
      nproducto: "",
      descripcion: "",
      precio: 0,
    });

    const [ listTasks , setListTasks] = useState([])
 

    const Agregar = () => {
        if(newItem.nproducto == '' || newItem.descripcion == '' || newItem.precio == ''){
          Alert.alert("Advertencia", "Favor de llenar todos los campos")
        }else{
          onSend(newItem);
          Alert.alert("Notificación", "Producto agregado correctamente");
        }
      }
  
    const onSend = async () => {
      const docRef = await addDoc(collection(db, "productos"), newItem);
      getTasks()
    };

    useEffect(()=>{
        getTasks();
     }, []);    

     

    const deleteTask = async (props) => {
        await deleteDoc(doc(db, "productos", props.id))  
        getTasks();
      
     }

    const getTasks = async() => {
        let list = [];  
        const response = await getDocs(collection(db, "productos"));
              response.forEach( document => {
              let id = document.id
              let nproducto = document.data().nproducto
              let descripcion = document.data().descripcion
              let precio = document.data().precio
              let obj = { id, nproducto, descripcion, precio }
              list.push(obj);
              
            })
           
            setListTasks(list)
     }

     const getTask = async(props) => {
        const response = await db.firestore().collection("productos").doc(props.id).get()
        setId(response.id)
        setNproducto(response.data().nproducto)
        setDescripcion(response.data().descripcion) 
        setPrecio(response.data().precio) 
     }  

    const renderTask = ({ item }) => (
        <ItemTask 
            id={item.id}
            nproducto={item.nproducto}
            descripcion={item.descripcion}
            precio={item.precio}
            deletetask={deleteTask}
            gettask={getTask}
          />
    );

    return (
        <ScrollView >
        <View > 
            <View style={styles.container}>
                <Input placeholder='Nombre del producto' style={styles.input} onChangeText={(text) => setNewItem({ ...newItem, nproducto: text })}  />
                <Input placeholder='Descripción del producto' style={styles.input} onChangeText={(text) => setNewItem({ ...newItem, descripcion: text })} />
                <Input placeholder='Precio' keyboardType='numeric' style={styles.input} onChangeText={(text) => setNewItem({ ...newItem, precio: text })} />
            </View>
                <View style={{marginTop:20}}>
                    <Button color='green' onPress={() => {Agregar()}} title="Agregar Productos"/>
                </View>
                <View style={{marginTop:20}}>
                    <Button color='blue' onPress={() => navigation.navigate("Home")} title="Modificar"/>
                </View>
                <View style={{marginTop:20}}>
                    <Button color='orange' onPress={() => getTasks()} title="Actualizar"/>
                </View>
                <View style={{marginTop:20}}>
                    <Button color='red' onPress={() => navigation.goBack()} title="Regresar"/>
                </View>
                <View style={{marginTop:20}}>
                    <FlatList 
                        data={listTasks}
                        renderItem={renderTask}
                        keyExtractor={item => item.id}
                    />            
                </View>
                
            </View>
        </ScrollView>
    );
}

export default AddProduct;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:50,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },
  });