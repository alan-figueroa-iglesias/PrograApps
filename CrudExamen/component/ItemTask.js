import React from 'react'
import {StyleSheet,Text, View, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const ItemTask = (props) => (
   <View style={styles.cardView}>
       <View style={{flexDirection:'column'}} > 
        <Text style={{textTransform: 'uppercase', color:'#000000'}} >
        Nombre: {props.nproducto}</Text>  
        <Text style={{textTransform: 'uppercase', color:'#000000'}} >
        Descripción: {props.descripcion}</Text>    
        <Text style={{textTransform: 'uppercase', color:'#000000'}} >
        Precio: ${props.precio}</Text>          
        </View>    
    <View style={{flexDirection:'row-reverse'}}>
       <TouchableOpacity style={{marginLeft:14}}
           onPress={props.deletetask.bind(this,props)}>
         <Ionicons name="md-trash" size={35} color="red" />
      </TouchableOpacity>
      {/* <TouchableOpacity 
           onPress={props.gettask.bind(this,props)}>
         <Ionicons name="md-create" size={35} color="green" />
      </TouchableOpacity> */}
       </View>

   </View>
  );
  
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        color: "black",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        marginHorizontal:10,
        marginVertical:10,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }
      

});

  export default ItemTask;