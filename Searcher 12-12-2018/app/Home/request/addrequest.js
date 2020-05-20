import React, { Component } from 'react';
import {View,Image,Alert,RefreshControl,  ActivityIndicator,  NetInfo, Text,AsyncStorage,TouchableOpacity,ImageBackground,TextInput,ScrollView} from 'react-native';
import Styles from '../myStyles';
import ImageSlider from 'react-native-image-slider';
import Icon  from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
class addrequest extends Component {
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
         >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? ' الأسئلة' :'Questions'}</Text>
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
    fetch('http://142.93.99.0/api/user/posts')
    .then((response) => response.json())
    .then((responseJson) => {
       const requests = responseJson;
       const rs =[];

       if(this.state.lang.indexOf('ar') != -1){
        requests.forEach(element => {
          var d =element.createdAt;
        var date =d.substring(0,d.indexOf('T'));
        var time =d.substring(d.indexOf('T')+1,d.indexOf('.'));
        rs.push({
          title:element.title ,id:element._id,date:date,time:time,status:element.status,field:element.fieldID.titleAr,name:element.userID.fullname
        })
        });
       }else{
        requests.forEach(element => {
          var d =element.createdAt;
          var date =d.substring(0,d.indexOf('T'));
          var time =d.substring(d.indexOf('T')+1,d.indexOf('.'));
          rs.push({
            title:element.title ,id:element._id,date:date,time:time,status:element.status,field:element.fieldID.titleEN,name:element.userID.fullname
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
                {/* <View style={{borderBottomColor:"rgb(17,119,168)",borderBottomWidth:1,marginBottom:10,flexDirection:'row-reverse',height:45,width:'100%'}}>
                        <View style={{paddingTop:15,flexDirection:'row-reverse',width:'25%'}} >
                            <Image style={{marginHorizontal:5}} source={require('../../images/ic_exit.png')} /> 
                            <Text style={{fontSize: 15,color:'black',fontWeight: 'bold'}}>رجوع</Text>
                        </View>
                        <Text style={{paddingTop:13,textAlign:'center',width:'50%',fontSize: 25,color:'black',fontWeight: 'bold'}}> طلب سفر</Text>
             </View> */}
             
                        
                         {/* <ScrollView style={{flex:1,width:'100%'}}></ScrollView> */}
                        {/* <View style={[Styles.container2,{height:'18%'}]}>
                        <TouchableOpacity
                      style={[Styles.vendorBtnBG,{width:'77%',height:'100%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={this.onPressgalleries.bind(this)} >
                      <Text style={[Styles.vendorBtnText,{fontSize:30}]}>المعارض والمؤتمرات</Text>
                      </TouchableOpacity>
                      </View>
                      <View style={[Styles.container2,{height:'18%'}]}>
                        <TouchableOpacity
                      style={[Styles.vendorBtnBG,{width:'77%',height:'100%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={this.onPressLearnMore} >
                      <Text style={[Styles.vendorBtnText,{fontSize:30}]}>العارضين</Text>
                      </TouchableOpacity>
                      </View>
                      <View style={[Styles.container2,{height:'18%'}]}>
                        <TouchableOpacity
                      style={[Styles.vendorBtnBG,{width:'77%',height:'100%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={this.onPressLearnMore} >
                      <Text style={[Styles.vendorBtnText,{fontSize:30}]}>العروض</Text>
                      </TouchableOpacity>
                      </View> */}
                   {/* <View style={{height:'10%',width:'100%',flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                        </View> */}
                        <View  style={{flexDirection:'row',width:'100%',height:'8%',marginTop:10,marginBottom:10}} >
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
                    <Image style={{ height: 40, width: 40,marginHorizontal:3}}
                     source={require('../../images/speech_bubble.png')}
                      resizeMode="stretch"
                                  />
                      </View>
                      <TouchableOpacity style={{width:'65%',borderWidth:.7,borderRadius:15,borderColor:"rgb(51,204,204)",backgroundColor:"#fff"}}
                       onPress={this.onPressoldquestion.bind(this)}>
                        <Text style={{textAlign:'center',fontWeight: 'bold',color:"#000",fontSize:20}}>
                  {this.state.lang.indexOf('ar') != -1 ?' أسئلتي السابقة' :'My Questions'}
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       style={{marginLeft:8,marginRight:8,justifyContent:'center'}}
                       onPress={this.onPressAdd.bind(this)}>
                      <Icon name="ios-add" size={40} color="black" style={{fontFamily:"bold"}} />
                      </TouchableOpacity>
                      </View>
                      <ScrollView style={{flex:1,width:'100%'}}  refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            } >
                      {this.state.requests.map((i, index) => (
                        <View key={i.id}  style={[Styles.container2,{height:75,marginTop:5,flexDirection:'row-reverse'}]}>
                        <TouchableOpacity 
                      style={[Styles.vendorBtnBG,{width:'85%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      // onPress={this.onPressgalleries.bind(this)} 
                      onPress={() => {
                        this.props.navigation.navigate('Requestdet', {
                          questionID: i.id,
                          // categoryTitleAR:item.titleAr,
                          // categoryTitleEN:item.titleEN,
                          // otherParam: 'anything you want here',
                        });
                      }}
                      >
                      <View style={{flexDirection:'column'}}>
                  <View  style={{flexDirection:'row'}}>
                        <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'left',paddingLeft:5,paddingRight:5}]}> {i.date}</Text>
                        <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'right',paddingLeft:5,paddingRight:5}]}>  {i.name}</Text>  
                            </View>   
                   </View>
                   <View style={{width:'100%',flexDirection:'row'}}>
                   <View style={{width:'35%'}}>
                   <View
                    //   style={{ 
                    //   //   backgroundColor:i.status == 0?'#fff':i.status == 1?'#fff'
                    //   // :i.status == 3 ? 'rgb(17,119,168)' : '#000',
                    //   backgroundColor:this.setColor(i.status),
                    //   marginHorizontal: 5,
                    //   // "rgb(17,119,168)"
                    //   // paddingVertical:4,
                    //   // marginHorizontal:10,
                    //   // justifyContent: 'center', alignItems:'center',
                    //   // borderRadius:5,
                    //   width:'90%',
                    //   alignItems:'center',justifyContent:'center',
                    //   flexWrap:'wrap',
                    //   // marginBottom:5
                    // }}
                    style={{backgroundColor:"rgb(51,204,204)",borderColor:"rgb(51,204,204)",borderWidth:.5,borderRadius:5,alignItems:'center',margin:5}}
                      // onPress={this.onSubmit.bind(this)}
                      >
                      <Text
                        style={{color:'black',textAlign:'center'}}
                     >
                    {i.field}
                     </Text>
                      </View>
                   </View>
                   <View style={{ width:'60%'}}>
                     <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:"#000"}}>{i.title}</Text>
                   </View>
                   </View>
                      </TouchableOpacity>
                      </View>
                        ))}
                      </ScrollView>
                      {/* <View style={[Styles.container2,{marginTop:5,height:'18%',flexDirection:'row-reverse'}]}>
                        <TouchableOpacity
                      style={[Styles.vendorBtnBG,{width:'77%',height:'100%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={this.onPressgalleries.bind(this)} >
                      <View style={{flexDirection:'column'}}>
<View  style={{flexDirection:'row'}}>
      <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'left'}]}> 30/11/2017</Text>
      <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'right'}]}>  05 :30:00</Text>  
           </View>   
                   </View>
                   <View style={{width:'100%'}}>
                     <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:"rgb(17,119,168)"}}>قسم الباطنة  </Text>
                   </View>
                      </TouchableOpacity>
                      </View> */}
                      {/* <View style={[Styles.container2,{marginTop:5,height:'18%',flexDirection:'row-reverse'}]}>
                        <TouchableOpacity
                      style={[Styles.vendorBtnBG,{width:'77%',height:'100%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={this.onPressgalleries.bind(this)} >
                      <View style={{flexDirection:'column'}}>
<View  style={{flexDirection:'row'}}>
      <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'left'}]}> 30/11/2017</Text>
      <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'right'}]}>  05 :30:00</Text>  
           </View>   
                   </View>
                   <View style={{width:'100%'}}>
                     <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:"rgb(17,119,168)"}}>قسم الأطفال  </Text>
                   </View>
                      </TouchableOpacity>
                      </View> */}
            </View>
             {/* :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
             <ActivityIndicator size="large" color="#0000ff" /></View> */}
            </ImageBackground>
        );
    }
}

export default addrequest;