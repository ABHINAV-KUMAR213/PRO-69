import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
  constructor(){
    super();
    this.state = {
    hasCameraPermissions:null,
    scanned:false,
    scannedData: '',
    buttonState:'normal'
    }
  }
  getCameraPermissions = async()=>{
        const{status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
           hasCameraPermissions:status === "granted",
           buttonState:'clicked',
           scanned:false
        });
    }
    handleBarCodeScanned = async ({type,data})=>{
        this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    });
    }

render(){
  
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            );
        }
        else if(buttonState === 'normal'){
        return(
         <View style = {styles.container}>
         <Image
          style={styles.image}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />
         <Text style = {styles.displayText}>{
             hasCameraPermissions === true ? this.state.scannedData:'REQUEST CAMERA PERMISSIONS'
         }
         </Text>
         <TouchableOpacity 
             onPress = {this.getCameraPermissions}
             style = {styles.scanButton}
             title = "Bar Code Scanner">
             <Text style = {styles.buttonText}>
                 SCAN QR CODE
             </Text>
         </TouchableOpacity>
         </View>
        );
    }
}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    displayText:{
        fontSize:15,
        textDecorationLine:"underline"
    },
    scanButton:{
        backgroundColor:"#2196F3",
        padding:10,
        margin:10,
        borderRadius:10,
        
    },
    buttonText:{
        fontSize:20
    },
    image:{
    width: 150,
    height: 150,
    marginTop: 1,
    alignContent:"center",
    borderRadius:30,
},
});