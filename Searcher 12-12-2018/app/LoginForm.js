import React, { Component } from 'react';
import { View,Dimensions ,ActivityIndicator,  Alert,NetInfo,ImageBackground,AsyncStorage,BackHandler,ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { YellowBox } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const styles = StyleSheet.create({
  container: {
    flex:4,
    height:'80%',
    alignItems: 'center',
    justifyContent:'center'
  },
  containerww: {
    // flex: 1,
    width:'100%',
    marginTop: 4,
    marginBottom:10,
    justifyContent:'center',
    alignItems: 'center',
  }
  , container22: {
    flex: 1,
    height:'100%',
    paddingBottom: '5%',
  },
  loadingText: {
    color: 'red',
    fontSize: 20,
    paddingTop: 10
  },
  image: {

    width: 140,
    height: 140,
  },
  txtinput: {
    fontSize: 16,
   borderRadius:15,
    color:'#000',
    height:40,
    paddingLeft: 5,
    textAlign:'center',
    paddingRight: 5,
    flex: 1
  },
  cardItem: {
    borderColor: 'black',
    backgroundColor: 'rgb(217, 217, 217)',
    borderWidth: .5,
    marginLeft: 10,
    borderRadius:7,
marginTop:'2%',   
    width:'85%',
    marginRight:10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
   cardItem4: {
    width:'85%',
    marginTop:'11%',
    borderWidth: .5,
    borderRadius:7,
    marginLeft: 10,
    marginRight:10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  cardItem2: {
    width:'85%',
    marginBottom:5,

    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  cardItem3: {
    width:'70%',
    marginTop: 40,
    height :20,

  },
  button: {
    height: 35,
   // backgroundColor: "rgb(57,119,168)",
borderRadius:15,
borderWidth:.5,
borderColor:'black',
    backgroundColor: "rgb(51,204,204)",
    justifyContent: 'center',
    flex: 1
  },
  buttonw: {
    height: 35,
    borderRadius:15,
    borderWidth:.5,
    borderColor:'black',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    alignItems:'center',
    justifyContent:'center'
  },buttonText4: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText2: {
    color: 'rgb(51,204,204)', 
    textAlign: 'center',
    // marginTop: '10%',
    fontSize: 24,
  },
  lostPass: {
    color: '#000', 
    textAlign: 'center',
    paddingTop:'10%',
    bottom:0,
    fontSize: 20,
    height:'100%'
  }
});

class LoginForm extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props){
    super();
   this.state ={
    mobile:'',
    password:'',
    loading:false,
    fEmail:'',
    flag:0,
    errors:{},
    lang: DeviceInfo.getDeviceLocale()
  }
  this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
  BackHandler.addEventListener('hardwareBackPress', this.onBackClicked)
);
this.onSubmit =this.onSubmit.bind(this);
this.validate =this.validate.bind(this);
this.handleFocusNextField =this.handleFocusNextField.bind(this);
this.onBackClicked =this.onBackClicked.bind(this);
this.LoginFun =this.LoginFun.bind(this);
this.goHome=this.goHome.bind(this);
// this.goRegister =this.goRegister.bind(this);
  }
     
      _onLoginPressed() {
        this.props.navigation.navigate('register');
      }
      _onSignupPressed() {
        this.props.navigation.navigate('home');
      }
     
      onSubmit=()=>{
        const errors =this.validate(this.state.mobile,this.state.password);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.LoginFun(this.state.mobile ,this.state.password);
        }
        else{
          this.setState({flag:1});
          // this.btnLogin.reset();
        }
        }
        LoginFun = async (val , password)=>{
          this.setState({flag:0});
          NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected)
            {
          fetch('http://142.93.99.0/api/user/loginUser?val='+val+'&password='+password)
          .then( (response) => response.json())
        .then(async (responseJson) => {
          try {
            if(responseJson.message){
              if(responseJson.message == 'Authentication failed. User not found.'){
                if(this.state.lang.indexOf('ar') != -1){
                  this.setState({flag:1});
                  Toast.show('عفوا هذا البريد الألكتروني غير موجود');
                }
                else {
                  this.setState({flag:1});
                  Toast.show('Sorry this email not found');
                }
              
              }
             else if(responseJson.message == 'Authentication failed. Wrong password.'){
                
                if(this.state.lang.indexOf('ar') != -1 ){
                  this.setState({flag:1});
                  Toast.show('عفوا كلمة المرور غير صحيحة');
                }
                else {
                  this.setState({flag:1});
                  Toast.show('Sorry password worng');
                }
                }
                else if(responseJson.message == 'this account is suspend !!!'){
                  if(this.state.lang.indexOf('ar') != -1 ){
                    this.setState({flag:1});
                    Toast.show('عذرا هذا المستخدم تم حجبه من قبل الأدارة');
                  }
                  else {
                    this.setState({flag:1});
                    Toast.show('Sorry this user is Blocked !');
                  }
                  

                  }
                else{
                 
                  if(this.state.lang.indexOf('ar') != -1 ){
                    this.setState({flag:1});
                    Toast.show('حدث خطا ما من فضلك حاول لاحقا');
                  }
                  else {
                    this.setState({flag:1});
                    Toast.show('Opps ! Please try again later');
                  }
                }
            }
            else{
            await AsyncStorage.setItem('loginDataClinic',JSON.stringify(responseJson));
            if(this.state.lang.indexOf('ar') != -1 ){
              Toast.show('مرحبا  ' + responseJson.fullname);
            }
            else {
              Toast.show('Welcome '+  responseJson.fullname );
            }
            this.setState({flag:1});
            this.goHome();
            }
          } catch (error) {
            if(this.state.lang.indexOf('ar') != -1 ){
              this.setState({flag:1});
              Toast.show('حدث خطا ما من فضلك حاول لاحقا' );
            }
            else {
              this.setState({flag:1});
              Toast.show('Opps ! Please try again later' );
            }
          }
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
      validate=(mobile,password)=>{
        const errors ={};
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        // const lang = DeviceInfo.getDeviceLocale();
        if(!mobile && !password){
          errors.mobile ='Enter Mobile First'; 
          if(this.state.lang.indexOf('ar') != -1 ){
            Toast.show('من فضلك أدخل البريد الالكتروني وكلمة المرور أولا');
          }
          else {
            Toast.show('Please Enter email and password To make login');
          }
        }
       else if(!mobile){
          errors.mobile ='Enter Mobile First'; 
          
          if(this.state.lang.indexOf('ar') != -1 ){
            Toast.show('أدخل رقم الجوال');
          }
          else {
            Toast.show('enter your phone number');
          }
         }
        //  else if(reg.test(mobile) === false){
        //   errors.email =Strings.emailInValid;
        //   Toast.show(Strings.emailInValid);
        //   this.btnLogin.reset();
        // }
          else if(!password){
            errors.password ='Enter Password First'; 
            if(this.state.lang.indexOf('ar') != -1 ){
              Toast.show('يجب أدخال كلمة المرور');
            }
            else {
              Toast.show('enter your password');
            }
           }
        return errors;
        }
    handleFocusNextField = (nextField) => {
      this.refs[nextField].focus();
      }
      goHome=async ()=>{
          this.props.navigation.push('home'); 
      }
      handleFocusNextField = (nextField) => {
        this.refs[nextField].focus();
        }
        componentDidMount() {
          // if(this.state.lang.indexOf('ar') != -1 ){
          //   Strings.setLanguage('ar-EG');
          //   alert(this.state.lang)
          // }
          YellowBox.ignoreWarnings(['Class RCTCxxModule']);
          // const lang = DeviceInfo.getDeviceLocale();
          // this.setState({ lang });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked)
      );
      this.setState({flag:1});

        }
        componentWillUnmount() {
          this._didFocusSubscription && this._didFocusSubscription.remove();
          this._willBlurSubscription && this._willBlurSubscription.remove();
          
        }
      
        onBackClicked=()=>{
          if(this.props.navigation.state.routeName == 'Login'){
           //  Toast.show(this.props.navigation.state.routeName);
           Alert.alert(
            this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
            this.state.lang.indexOf('ar') != -1 ?'هل أنت متأكد من أنك تريد الخروج؟' :'Are you sure you want to exit?',
             [
               {text:this.state.lang.indexOf('ar') != -1 ?'إلغاء' :' Cancel'
               , onPress: () => this.dismiss, style: 'cancel'},
               {text: this.state.lang.indexOf('ar') != -1 ?'موافق' :'Ok'
               , onPress: () => BackHandler.exitApp()},
             ],
             { cancelable: true }
           )
            return true;
         }
            else{return false;}
          }
      render(){
    return (
      <ImageBackground style={{flex:1,}} source={require('./images/backgroundsearcher.png')}> 
      {this.state.flag != 0 ?
        <ScrollView style={styles.container22}>
           <View style={styles.container}>
            <View style={styles.containerww}>
               <Image style={styles.image} source={require('./images/Logo.png')}  resizeMode="stretch" />
               </View>
               <View style={styles.cardItem4}>
                 <TextInput
                  style={styles.txtinput}
                  label='Email'
                  underlineColorAndroid='transparent'
                  placeholder={this.state.lang.indexOf('ar') != -1 ?'البريد الألكتروني' :'Email'}
                  secureTextEntry={false}
                  onChangeText={(mobile) => this.setState({ mobile  }) }
                     />
                </View>
                <View style={styles.cardItem}>
                   <TextInput
                     style={styles.txtinput}
                     secureTextEntry 
                      label='password'
                      underlineColorAndroid='transparent'
                      placeholder=  {this.state.lang.indexOf('ar') != -1 ?'كلمة المرور' :'Password'}
                       onChangeText={(password) => this.setState({ password  }) }
                   />
                </View>
                <View style={styles.cardItem3}>
                </View>
                <View style={styles.cardItem2}>
<TouchableOpacity style={styles.button} onPress={this.onSubmit.bind(this)}>
    <Text style={styles.buttonText}>
{this.state.lang.indexOf('ar') != -1 ?'تسجيل الدخول' :'Login'}    </Text>
</TouchableOpacity>
</View>
<View style={styles.cardItem2}>
<TouchableOpacity style={styles.buttonw} >
    <Text style={styles.buttonText4} onPress={this._onLoginPressed.bind(this)}>
{this.state.lang.indexOf('ar') != -1 ?'تسجيل جديد' :'Register'}
    </Text>
</TouchableOpacity>
</View>

<TouchableOpacity onPress={this._onSignupPressed.bind(this)}>
<Text style={styles.buttonText2}> {this.state.lang.indexOf('ar') != -1 ?'تخطى التسجيل' :'Skip Login'}</Text>
</TouchableOpacity>
</View>
<View style={{height:'20%',flex:1, flexDirection:'column', bottom:0}}>
      <TouchableOpacity style={{height:'100%',bottom:0}}
       onPress={() => this.refs.modal3.open()}
      >
      <View style={{bottom:0,height:'100%'}}>
      <Text style={styles.lostPass}> {this.state.lang.indexOf('ar') != -1 ?' فقدت كلمة المرور ؟' :'Lost Password ?'} </Text>
      </View>
      </TouchableOpacity>
      </View>
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
              
                    <Text style={{ fontSize:17,width:'90%',textAlign:'center',color:'#000'}}>{this.state.lang.indexOf('ar') != -1 ?'أدخل بريدك الألكتروني' :'Enter Your Email'}</Text>
                      
                    <View style={{ width: '70%',  marginTop:20,}} >
                         <TextInput style={{ fontSize:15,borderWidth:.5,borderColor:'#000'}}
                          onChangeText={(fEmail) => this.setState({ fEmail  }) }
                         placeholder={this.state.lang.indexOf('ar') != -1 ?'البريد الألكتروني' :'ُEmail'}></TextInput>
                    </View>
                    <View style={{flexDirection:'row'}}> 
          <Button onPress={() => {
            if(this.state.fEmail){
               NetInfo.isConnected.fetch().then(isConnected => {
                if(isConnected)
                {
              fetch('http://142.93.99.0/api/user/forgetPassword?email='+this.state.fEmail)
              .then( (response) => response.json())
            .then(async (responseJson) => {
              try {
                if(responseJson.message){
                  if(responseJson.message == 'User not found.'){
                    if(this.state.lang.indexOf('ar') != -1 ){
                      Toast.show('عفوا هذا البريد الألكتروني غير موجود')
                    }
                    else {
                      Toast.show('Sorry this email not found' );
                    }
                  }
                 else if(responseJson.message == 'DONE'){
                    if(this.state.lang.indexOf('ar') != -1 ){
                      Toast.show('تم أرسال كلمة المرور علي البريد الألكتروني' )
                    }
                    else {
                      Toast.show('Password sent to email please check your email' );
                    }
                    this.refs.modal3.close()
                    }
                   
                    else{
                      if(this.state.lang.indexOf('ar') != -1 ){
                        Toast.show('حدث خطا ما من فضلك حاول لاحقا')
                      }
                      else {
                        Toast.show('Opps ! Please try again later' );
                      }
                    }
                }
                else{
                  if(this.state.lang.indexOf('ar') != -1 ){
                    Toast.show('تم أرسال كلمة المرور علي البريد الألكتروني' )
                  }
                  else {
                    Toast.show('Password sent to email please check your email');
                  }
                  this.refs.modal3.close()
                }
              } catch (error) {
                if(this.state.lang.indexOf('ar') != -1 ){
                  Toast.show('حدث خطا ما من فضلك حاول لاحقا')
                }
                else {
                  Toast.show('Opps ! Please try again later');
                }
              }
            })
            .catch((error) => {
              console.error(error);
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
        }else{
          if(this.state.lang.indexOf('ar') != -1 ){
            Toast.show('يجب أدخال البريد الألكتروني' );
          }
          else {
            Toast.show('Please Enter Your Email');
          }
        }
          

          }} style={{
             fontSize: 20,
             marginTop: 20,
             backgroundColor: "rgb(51,204,204)",
             color: "black",
             width:90,
             marginHorizontal: 10,    
             paddingVertical:2,
             borderRadius:7,
             borderWidth:.5,
             borderColor:"#000",
          }}>{this.state.lang.indexOf('ar') != -1 ?'أرسل' :'Send'}</Button>



                <Button onPress={() => {
           
       
           this.refs.modal3.close()

          }} style={{
            width:90,

             fontSize: 20,
             marginTop: 20,
             backgroundColor: "rgb(51,204,204)",
             color: "black",
             marginHorizontal: 10,    
             paddingVertical:2,
             borderRadius:7,
             borderWidth:.5,
             borderColor:"#000",
          }}>{this.state.lang.indexOf('ar') != -1 ?'إلغاء' :'Cancel'}</Button>

</View>
        </Modal>
        
        </ScrollView>
         :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
              <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}
        </ImageBackground>
    );
  }
}

export default LoginForm;