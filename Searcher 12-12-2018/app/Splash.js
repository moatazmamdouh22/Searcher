import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator, Image,ImageBackground } from 'react-native';


const styles = StyleSheet.create({
  container: {
backgroundColor:'white',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    paddingTop: 10
  },
  image: {
     marginTop: "40%",
    width: '100%',
    height: '50%',
    marginBottom: 20
  }
});
class Splash extends Component {
    constructor(){
        super();
        setTimeout(async () => { 
            const value = await AsyncStorage.getItem('loginDataClinic');
            const data =JSON.parse(value);        
            if(value){
            
              this.props.navigation.push('home')
            }
           else{
            this.props.navigation.push('Login');
          }
          }, 3000); 
    
    }
      render(){
        return (
    
      <View style={styles.container}>
      <View style={{width:'80%',height:'100%'  ,  alignItems: 'center',}}>
        <Image style={styles.image} source={require('./images/Logo.png')}
        resizeMode="stretch" />
        </View>
      </View>
    
    );
  }
}

export default Splash;