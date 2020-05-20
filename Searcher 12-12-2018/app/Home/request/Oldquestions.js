import React, { Component } from 'react';
import {View,Image ,
  RefreshControl,  ActivityIndicator,  NetInfo, Text,AsyncStorage,TouchableOpacity,ImageBackground,TextInput,ScrollView} from 'react-native';
import Styles from '../myStyles';
import ImageSlider from 'react-native-image-slider';
import Icon  from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

import DeviceInfo from 'react-native-device-info';
class Oldquestions extends Component {
  constructor(){
    super();
    this.state={
      requests:[],
      userDate:{},
      ads:[],
      lang: DeviceInfo.getDeviceLocale(),
      flag:0,
      qID:'x',

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
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? ' أسئلتي السابقة' :'My Old Questions'}</Text>
     </View>
       ),
   headerRight: (<View/>)
  };
  // onPressLearnMore(){
  //   alert('Button clicked!');
  // }
  // onPressgalleries(){
  //   this.props.navigation.navigate('Requestdet');
  // }
  onPressAdd(){
    this.props.navigation.navigate('request2');
  }
  onPressDelet =(i) =>{
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {

 

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
  onRefresh() {
    this.setState({ refreshing: true }, function() {this.componentDidMount()});
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
    const value = await AsyncStorage.getItem('loginDataClinic');
    if(value){
      const data =JSON.parse(value);
      this.setState({userDate:data});
    fetch('http://142.93.99.0/api/user/userPosts?id='+this.state.userDate._id)
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
  }
  else{
    if(this.state.lang.indexOf('ar') != -1 ){
      this.setState({flag:1});
      Toast.show('يجب تسجيل الدخول لكي تشاهد طلباتك السابقة');
    }
    else {
      this.setState({flag:1});
      Toast.show('You Must Login to show your Recent requests');
    }
  }
  }
      render() {
      
        return (
          <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
         
              <View style={[Styles.container,{paddingTop:0}]}>
             
                        <View  style={{flexDirection:'row',width:'100%',height:'8%',marginTop:10,marginBottom:10}} >
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
                    <Image style={{ height: 40, width: 40,marginHorizontal:3}}
                     source={require('../../images/speech_bubble.png')}
                      resizeMode="stretch"
                                  />
                      </View>
                       
                      <TouchableOpacity style={{width:'65%',borderWidth:.7,borderRadius:15,borderColor:"rgb(51,204,204)",backgroundColor:"rgb(51,204,204)"}}
                                         //    onPress={this.onPressDelet(i.id)}
                                              >

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
                      <ScrollView style={{flex:1,width:'100%'}} refreshControl={     <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />}>
                 
                      {this.state.requests.map((i, index) => (
                        <View key={i.id}  style={[Styles.container2,{height:75,marginTop:5,flexDirection:'row-reverse'}]}>
                        <TouchableOpacity 
                      style={[Styles.vendorBtnBG,{width:'85%',justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                      onPress={() => {
                        this.props.navigation.navigate('Requestdet', {
                          questionID: i.id,              
                                             });
                      }}
                      >
                      <View style={{flexDirection:'column'}}>
                  <View  style={{flexDirection:'row'}}>
                  <View style={{ width:'32%',marginHorizontal:5 ,alignItems:'flex-start'}}
                      >
                        <Text style={{fontSize:10, textAlign:'justify',justifyContent:'center',fontWeight: 'bold',color: 'black',}}> {i.date}</Text>
                        </View>
                        <View style={{ width:'30%',backgroundColor:"rgb(51,204,204)",borderColor:"rgb(51,204,204)",borderWidth:.5,borderRadius:5,alignItems:'center',marginHorizontal:5}}
                      >
                      
                      <Text
                        style={{color:'black',textAlign:'center'}}
                     >
                    {i.field}
                     </Text>
                     </View>               
                     <TouchableOpacity style={ { width:'30%',alignItems:'flex-end',paddingLeft:5,paddingRight:5}}
                      onPress={() => 
                      {
                        this.setState({qID:i.id})
                      this.refs.modal3.open()}}>
                     <Image style={{ height: 20, width: 20,marginHorizontal:3}}
                     source={require('../../images/rubbish-bin.png')}
                      resizeMode="stretch"

                                  />
                      </TouchableOpacity>
                            </View>   
                   </View>
                   <View style={{width:'100%',flexDirection:'row'}}>
                   <View style={{width:'30%'}}>
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
                    style={{backgroundColor:"rgb(51,204,204)",borderColor:"rgb(51,204,204)",borderWidth:.5,borderRadius:5,alignItems:'center',marginHorizontal:5,marginTop:15}}
                      // onPress={this.onSubmit.bind(this)}
                      >
                       <Text
                        style={{color:'black',textAlign:'center'}}
                        >
                     {this.state.lang.indexOf('ar')!= -1 ?
                     
                     i.status == 0 ? 'قيد التنفيذ':
                     i.status == 1 ? 'فعال':
                     i.status == 2 ? 'مكتمل':
                    'مرفوض'
                     :
                     i.status == 0 ? 'Pending':
                     i.status == 1 ? 'Active':
                     i.status == 2 ? 'Finish':
                    'Reject'
                     }
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
                      <Modal style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#fff',
          borderRadius:20,
          borderWidth:.7,
          borderColor:"#000",
          height: 200,
          // width: '90%'
      }} position={'center'} ref={"modal3"} isDisabled={this.state.isDisabled}>
              
                    <Text style={{ fontSize:17,width:'90%',textAlign:'center',color:'#000'}}>{this.state.lang.indexOf('ar') != -1 ?'هل تريد حذف هذا المنشور؟' :'Do you want to delete this question?'}</Text>
                      
                   
                    <View style={{flexDirection:'row'}}>
          <Button onPress={() => {
            if(this.state.qID != 'x'){
              var obj ={
                status: 3
              }
              NetInfo.isConnected.fetch().then(isConnected => {
                        if(isConnected)
                        {
                          fetch('http://142.93.99.0/api/user/post/'+this.state.qID, {
                            method: 'PUT',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body:  JSON.stringify(obj)
                        })
                          .then((response) => response.json())
                          .then((responseJson) => { 
                            this.getUserData();
                            this.refs.modal3.close()

                           })
                          .catch((error) => {
                            if(this.state.lang.indexOf('ar') != -1 ){
                              this.setState({flag:1});
                              Toast.show("حدث خطأ ما");
                            }
                            else {
                              this.setState({flag:1});
                              Toast.show("Opps !!");
                            }
                          });
                         

            }else{
              if(this.state.lang.indexOf('ar') != -1 ){
                Toast.show('عذرا لا يوجد أتصال بالانترنت' );
              }
              else {
                Toast.show('Sorry No Internet Connection');
              }
              
              this.refs.modal3.close()
              }
            })
            }
            else{
              if(this.state.lang.indexOf('ar') != -1 ){
                Toast.show('حدث خطأ ما' );
              }
              else {
                Toast.show('OPss.......');
              }         
               }
        

          }} style={{
             fontSize: 20,
             marginTop: 20,
             backgroundColor: "rgb(51,204,204)",
             color: "black",
             paddingHorizontal: 30,   
             marginHorizontal: 5,    
 
             paddingVertical:2,
             borderRadius:7,
             borderWidth:.5,
             borderColor:"#000",
          }}>{this.state.lang.indexOf('ar') != -1 ?'نعم' :'Yes'}</Button>
               <Button onPress={() => {
            if(this.state.qID != 'x'){
              NetInfo.isConnected.fetch().then(isConnected => {
                        if(isConnected)
                        {
                          this.refs.modal3.close()
            }else{
              if(this.state.lang.indexOf('ar') != -1 ){
                Toast.show('عذرا لا يوجد أتصال بالانترنت' );
              }
              else {
                Toast.show('Sorry No Internet Connection');
              }
              
              this.refs.modal3.close()
              }
            })
            }
            else{
              if(this.state.lang.indexOf('ar') != -1 ){
                Toast.show('حدث خطأ ما' );
              }
              else {
                Toast.show('OPss.......');
              }            }

          

          }} style={{
             fontSize: 20,
             marginTop: 20,
             backgroundColor: "rgb(51,204,204)",
             color: "black",
             paddingHorizontal: 30,
             marginHorizontal: 5,    
             paddingVertical:2,
             borderRadius:7,
             borderWidth:.5,
             borderColor:"#000",
          }}>{this.state.lang.indexOf('ar') != -1 ?'لا' :'No'}</Button>
          </View>
        </Modal>
                  
            </View>
             {/* :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
             <ActivityIndicator size="large" color="#0000ff" /></View> */}
            </ImageBackground>
        );
    }
}

export default Oldquestions;