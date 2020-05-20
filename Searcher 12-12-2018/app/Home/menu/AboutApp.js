import {
    Button,
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    NetInfo,
    Text,
    Image

  } from 'react-native';
  import React, { Component } from 'react';
  import Toast from 'react-native-simple-toast';
  import DeviceInfo from 'react-native-device-info';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      
      alignItems: 'center',
  
    
    },
    loadingText: {
      color: '#fff',
      fontSize: 20,
      paddingTop: 10
    },
    image: {
       marginTop: "20%",
      width: '100%',
      height: 100,
      marginBottom: 20
    },
    myImage : {
      marginTop: 40,
    }
  });

  
   class AboutApp extends Component {
    constructor(){
      super();
      this.state={
        terms:[],
        lang:'',
        lang: DeviceInfo.getDeviceLocale(),
        flag:0,
      }
    }
    static navigationOptions = {
      headerStyle: { backgroundColor:  '#F2F2F2' ,height:40},
     headerTitle: () => (
       <View style={{flex:1}}>
         <Text
             adjustsFontSizeToFit
             style={{
              fontSize:14,
     
            
              // marginLeft:'15%',
              // fontFamily: 'MuseoSansRounded-300',
              // fontWeight: '300',
              // marginRight:'25%',
              color:'#000' // ok
             }}
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'عن التطبيق' :'About App'}</Text>
       </View>
         ),
    //  headerRight: (<View/>)
    };
    componentDidMount() {
      this.setState({flag:0});
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {
      fetch('http://142.93.99.0/api/user/getAboutApp')
      .then((response) => response.json())
      .then((responseJson) => {
         const terms = responseJson;
        //  countries.unshift({
        //    _id:'0',titleAr:'آختار الدولة',titleEN:'Select Country'
        //  })
        this.setState({ terms });
        this.setState({flag:1});
      })
      .catch((error) => {
        this.setState({flag:1});
        console.error(error);
      });
    }else{
      if(this.state.lang.indexOf('ar') != -1 ){
        this.setState({flag:1});
        Toast.show('عذرا لا يوجد أتصال بالانترنت' );
      }
      else {
        this.setState({flag:1});
        Toast.show('Sorry No Internet Connection');
      }
      }
    })
    }
    render() {
      return (
        <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
          {this.state.flag != 0 ?
         <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle="light-content"/>
            <View style={{alignItems:'center',marginTop:5,justifyContent:'center'}}>
            {/* {  this.state.lang.indexOf('ar') != -1? */}
          <Image style={{
            width:90,height:90,
             }}  resizeMode="stretch" source={require('../../images/Logo.png')} />    
             {/* :
             <Image style={{
                width:90,height:70,
                 }}  resizeMode="stretch" source={require('../../image/appNameEN.png')} />
        } */}
        </View>
           
            <ScrollView style={{flex:3,height:'100%',marginTop:10, paddingLeft:10,paddingRight:10,marginBottom:10,flexDirection:'column'}}>
            {this.state.terms.map((i, index) => (
                        //  this.state.lang.indexOf('ar') != -1?
                         <Text key={i._id} style={{ paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>
                         {this.state.lang.indexOf('ar') != -1? i.titleAr:i.titleEN}
                         </Text>
                        //  :<Text key={i._id} style={{ paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>{i.titleEN}</Text>
                      ))}
            </ScrollView>
            </SafeAreaView>
              :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
              <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}
        </ImageBackground>
      );
    }
  }
  export default AboutApp;
 