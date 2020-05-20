import {
  Button,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  NetInfo,
  AsyncStorage,
  ActivityIndicator,
  Text

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
     marginTop: "35%",
    width: '100%',
    height: 100,
    marginBottom: 20
  },
  myImage : {
    marginTop: 40,
  }
});


 class Report extends Component {
  constructor(props) { 
    super(props);
    this.state ={
      msg:'',
      userID:{},
      errors:[],
      lang: DeviceInfo.getDeviceLocale(),
      flag:0,
    }
  }
  static navigationOptions = {
    headerStyle: { backgroundColor:  '#F2F2F2',height:40 },
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
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'أرسال شكوي' :'Send Problem'}</Text>
     </View>
       ),
  //  headerRight: (<View/>)
  };
  validate=(obj)=>{
    this.setState({flag:0});
    const errors ={};
  
   if(!obj.msg){
    if(this.state.lang.indexOf('ar') != -1 ){
      this.setState({flag:1});
      Toast.show('يجب ان تدخل الرسالة');
    }
    else {
      this.setState({flag:1});
      Toast.show('message is requied');
    }   
      errors.msg ="msg is requied ";
    }
    return errors;
  }
  onSubmit=()=>{
    this.setState({flag:0});
    // this.btnRegister.load();
    const obj ={
      title:'problem',
      msg: this.state.msg,
      userID:this.state.userID,
      type:2
    }
    const errors =this.validate(obj);
    this.setState({errors});
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {
    if(Object.keys(errors).length === 0){
      fetch('http://142.93.99.0/api/user/addContactUS/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.message){
              if(responseJson.message == 'sorry is email exsist'){
                this.setState({flag:1});
              alert("email is exsist");
              }
             else if(responseJson.message == 'sorry is mobile exsist'){
              this.setState({flag:1});
                alert("sorry is mobile exsist");
                }
                else{
                  this.setState({flag:1});
                  alert("Opps !!");
                }
            }
            else{
              this.setState({title:''});
              this.setState({msg:''});
              if(this.state.lang.indexOf('ar') != -1 ){
                this.setState({flag:1});
                Toast.show('تم ارسال الرسالة بنجاح');
              }
              else {
                this.setState({flag:1});
                Toast.show('Message Sent');
              }   
            // this.props.navigation.push('login');  
            }
          })
          .catch((error) => {
            this.setState({flag:1});
            console.error(error);
          });
    }
    else{
      this.setState({flag:1});
      // this.btnRegister.reset();
    }
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
    getUserData = async () =>{
      this.setState({flag:0});
      const value = await AsyncStorage.getItem('loginDataClinic');
      if(value){
        const data =JSON.parse(value);
        this.setState({userID:data._id});
        this.setState({flag:1});

      }else{
        if(this.state.lang.indexOf('ar') != -1 ){
          this.setState({flag:1});
          Toast.show('قم بتسجيل الدخول أولا');
        }
        else {
          this.setState({flag:1});
          Toast.show('You must login first');
        }
      }
    }
    componentDidMount() {
      this.getUserData();
    }
  render() {
    return (
      <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
      {this.state.flag != 0 ?
        <ScrollView>
          <View style={{ flex: 1}}>
         
          {/* <View style={{ flex: 1,flexDirection:'row'}}>
          <View style={{width:'10%'}} ></View> 
            <TextInput
            defaultValue={this.state.title}
            onChangeText={(title) => this.setState({title:title})}
            style={{height: 30, marginTop: 50,marginRight: 30, width: 200, borderWidth: 1, borderRadius: 5, borderColor: '#1177A8', backgroundColor: 'white', padding: 5}} placeholder="Title" >
            </TextInput>
          </View> */}
          <View style={{ flex: 1,flexDirection:'row',width:'100%'}}>
          <View style={{width:'10%'}} ></View> 
            <TextInput
            onChangeText={(msg) => this.setState({msg:msg})}
            defaultValue={this.state.msg}
            multiline={true} style={{height:220, marginTop: 50,marginRight: 30, width: '79%', borderWidth:.7, borderRadius: 5, borderColor: '#000', backgroundColor: 'white', padding: 5}} 
            placeholder={this.state.lang.indexOf('ar') != -1 ? 'أكتب الشكوي' :'Type problem'} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
          <TouchableOpacity style={{
       justifyContent: 'center',
       width: 100,
       height: 35,
        backgroundColor: 'rgb(51,204,204)',
          marginTop: 50,
           borderWidth: .7,
            borderColor: '#000',
             borderRadius: 15
                 }}
                 onPress={this.onSubmit.bind(this)}
                 >
          <Text style={{textAlignVertical: 'center', textAlign: 'center', color: 'black', fontSize: 20}}>
          {this.state.lang.indexOf('ar') != -1 ? 'أرسال' :'Send'}
          </Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
           :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
              <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}
        </ImageBackground>
    );
  }
}
export default Report;
