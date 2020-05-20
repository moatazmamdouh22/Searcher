import React, { Component } from 'react';
import {View,Image,Alert,RefreshControl,  ActivityIndicator,  NetInfo, Text,AsyncStorage,TouchableOpacity,ImageBackground,TextInput,ScrollView} from 'react-native';
import Styles from '../myStyles';
import ImageSlider from 'react-native-image-slider';
import Icon  from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
class mostSearch extends Component {
  constructor(){
    super();
    this.state={
      requests:[],
      userDate:{},
      ads:[],
      lang: DeviceInfo.getDeviceLocale(),
      flag:0,
      refreshing: false,


    }
  }
  static navigationOptions = {
    headerStyle: { backgroundColor:  '#F2F2F2',height:40 },
   headerTitle: () => (
     <View style={{width:'100%',flex:1,  justifyContent: 'center',alignItems:'center'}}>
       <Text
         adjustsFontSizeToFit
         style={{
          fontSize:14,
          textAlign: 'center', // ok
          alignSelf: 'center',
        
         
          color:'#000' // ok
         }}
         >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? ' الأكثر بحثا' :'Most Search'}</Text>
         </View>
       ),
  //  headerRight: (<View/>)
  };

 
  // onPressLearnMore(){
  //   alert('Button clicked!');
  // }
  // onPressgalleries(){
  //   this.props.navigation.navigate('Requestdet');
  // }
  onPressAdd=async () =>{
    
    const value = await AsyncStorage.getItem('loginDataClinic');
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {
    
    if(value){

    this.props.navigation.navigate('request2');
  }else{
    this.setState({flag:1});
    Alert.alert(
      this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
      this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',
      [
        // {text: 'Cancel', onPress: () => this.dismiss, style: 'cancel'},
        {text:  this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'login Now', onPress: () => {
          try{
       const { navigation } = this.props;
       navigation.push('Login');
          }catch(e){}
         }
       },
      ],
      { cancelable: true }
    )
     return true;
  }
}else{
  if(this.state.lang.indexOf('ar') != -1 ){
    this.setState({flag:1});
    Toast.show('لايوجد اتصال بالانترنت');
  }
  else {
    this.setState({flag:1});
    Toast.show('No Internet Connection ');
  }
  }
  });
}
onRefresh() {
  this.setState({ refreshing: true }, function() {this.componentDidMount()});
}

  onPressoldquestion=async () =>{
    
    const value = await AsyncStorage.getItem('loginDataClinic');
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {
    
    if(value){
    this.props.navigation.navigate('oldquestion');
  }else{
    this.setState({flag:1});
    Alert.alert(
      this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
      this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',
      [
        // {text: 'Cancel', onPress: () => this.dismiss, style: 'cancel'},
        {text:  this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'login Now', onPress: () => {
          try{
       const { navigation } = this.props;
       navigation.push('Login');
          }catch(e){}
         }
       },
      ],
      { cancelable: true }
    )
     return true;
  }
}else{
  if(this.state.lang.indexOf('ar') != -1 ){
    this.setState({flag:1});
    Toast.show('لايوجد اتصال بالانترنت');
  }
  else {
    this.setState({flag:1});
    Toast.show('No Internet Connection ');
  }
  }
  });
  }
  componentDidMount() {
    this.setState({flag:0});
    this.setState({ refreshing: false })

    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {


  this.getUserData();
      }else{
        if(this.state.lang.indexOf('ar') != -1 ){
          this.setState({flag:1});
          Toast.show('عذرا لا يوجد اتصال بالانترنت');
        }
        else {
          this.setState({flag:1});
          Toast.show('No Internet connection');
        }   
        }
      })
   }
setColor =(i) =>{
  if(i == 0 || i == 1){
   var style={ 
      backgroundColor:'#fff',
      borderColor: 'rgb(17,119,168)',
      borderRadius:5,
      borderWidth: 2,
      marginHorizontal: 5,
      width:'90%',
      alignItems:'center',justifyContent:'center',
      flexWrap:'wrap',
    }
    return style;
  } 
 else if(i == 2){
  var style={ 
    backgroundColor:'rgb(17,119,168)',
    borderColor: 'rgb(17,119,168)',
    borderRadius:5,
    borderWidth: 2,
    marginHorizontal: 5,
    width:'90%',
    alignItems:'center',justifyContent:'center',
    flexWrap:'wrap',
  }
  return style;
  } 
  else if(i == 3){
    var style={ 
      backgroundColor:'#000',
      borderColor: '#000',
      borderRadius:5,
      borderWidth: 2,
      marginHorizontal: 5,
      width:'90%',
      alignItems:'center',justifyContent:'center',
      flexWrap:'wrap',
    }
    return style;
  } 
  else{
    var style={ 
      backgroundColor:'#000',
      marginHorizontal: 5,
      width:'90%',
      alignItems:'center',justifyContent:'center',
      flexWrap:'wrap',
    }
    return style;
  }
}
setColorText=(i)=>{
  if(i == 0 || i == 1){
    style={ fontSize: 13,
      fontWeight: 'bold',
      color: "#000"}
      return style;
  }
  else{
      style={ fontSize: 13,
        fontWeight: 'bold',
        color: "#fff"}
        return style;
    
  }
}
  getUserData= async()=>{
    this.setState({flag:0});
    // if(value){
      // const data =JSON.parse(value);
      // this.setState({userDate:data});
    fetch('http://142.93.99.0/api/user/mostSearch')
    .then((response) => response.json())
    .then((responseJson) => {
       const requests = responseJson;
       const rs =[];

       if(this.state.lang.indexOf('ar') != -1){
        requests.forEach(element => {
        
        rs.push({
          title:element.title ,totalSearch:element.totalSearch
        })
        });
       }else{
        requests.forEach(element => {

          rs.push({
            title:element.title ,totalSearch:element.totalSearch
          })
        });
       }
     
    
      this.setState({ requests:rs});
      this.setState({flag:1});
    })
    .catch((error) => {
      this.setState({flag:1});
      console.error(error);
    });
  // }
  // else{
  //   if(this.state.lang.indexOf('ar') != -1 ){
  //     this.setState({flag:1});
  //     Toast.show('يجب تسجيل الدخول لكي تشاهد طلباتك السابقة');
  //   }
  //   else {
  //     this.setState({flag:1});
  //     Toast.show('You Must Login to show your Recent requests');
  //   }
  // }
  }
      render() {
      
        return (
          <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}>  
         
              <View style={[Styles.container,{paddingTop:0}]}>
              
                      <ScrollView style={{flex:1,width:'100%'}}  refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            } >
                      {this.state.requests.map((i, index) => (
                        <View key={index}  style={[Styles.container2,{height:55,marginTop:5,flexDirection:'row'}]}>
                        <TouchableOpacity 
                      style={[Styles.vendorBtnBG,{width:'70%',marginStart:5,justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={() => {
                      
                        this.props.navigation.navigate('topsearches',{
                            searchID: i.title,
                            
                          });
                      }}
                      >
                  
                   <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                 
                   <View style={{ width:'100%'}}>
                     <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:"#000"}}>{i.title}</Text>
                   </View>
                   </View>
                      </TouchableOpacity>
                        <View style={{width:'28%',flexDirection:'column',alignItems:'center'}}>
                        <Image style={{ height: 30, width: 30,marginHorizontal:3}}
                     source={require('../../images/eye.png')}
                      resizeMode="stretch"
                                  />
                     <Text style={{textAlign:'center',fontSize:12,fontWeight:'bold',color:"rgb(51,204,204)"}}>{i.totalSearch}</Text>
                        </View>
                      </View>
                        ))}
                      </ScrollView>
                 
            </View>
     
            </ImageBackground>
        );
    }
}

export default mostSearch;