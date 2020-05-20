import React, { Component } from 'react';
import {View,ActivityIndicator,ImageBackground, NetInfo,Text,StyleSheet ,TextInput,Button,ScrollView,Image,TouchableOpacity,CheckBox,Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
//import { CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
export default class Register extends Component {
  constructor(props, context) { 
    super(props, context);
    this.state ={
      mobile:'',
      password:'',
      email:'',
      fullname:'',
      countryID:'0',
      cityID:'',

      flag:0,
      Gender:'',
      birthDay:'',
      confirmPassword:'',
      loading:false,
      errors:{},

      countries:[],
      cities:[],

      codeNum:'',
      checked: false,
      gender:{label:'Select Gendert',value:0,key:0},
      lang: DeviceInfo.getDeviceLocale()
    }
 };
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
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'حساب جديد' :'Register'}</Text>
   </View>
     ),
//  headerRight: (<View/>)
};
validate=(obj,confirmPassword)=>{
  const errors ={};
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(!obj.fullname){

    if(this.state.lang.indexOf('ar') != -1 ){
 
      Toast.show('يرجي إدخال الأسم كامل' );
    }
    else {
      Toast.show('fullname is requied' );
    }
    errors.fullname ="fullname is requied "; 
  }
else if(obj.fullname.length < 6){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('  الأسم كامل قصير جدآ' );
    }
    else {
      Toast.show('fullname is very short' );
    }
    errors.fullname ="fullname is very short ";
  }
  else if(!obj.birthday){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('يرجي إدخال تاريخ الميلاد' );
    }
    else {
      Toast.show('birthday is requied' );
    }
    errors.birthDay ="birthday is requied"; 
  }
  else if(!obj.countryID){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('يرجي إدخال البلد' );
    }
    else {
      Toast.show('country is requied' );
    }
    errors.countryID ="country is requied";
  } 
  else if(obj.countryID === '0'){ 
    if(this.state.lang.indexOf('ar') != -1 ){

      Toast.show('يرجي إدخال البلد' );
    }
    else {
      Toast.show('country is requied' );
    }
    errors.countryID ="country is requied"; 
  }
  else if(!obj.cityID){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('يرجي إدخال المدينة' );
    }
    else {
      Toast.show('city is requied' );
    }
    errors.cityID ="city is requied";
  } 
  else if(obj.cityID === '0'){ 
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('يرجي إدخال المدينة' );
    }
    else {
      Toast.show('city is requied' );
    }
    errors.cityID ="city is requied"; 
  }
 

  else if(!obj.mobile){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('أدخل رقم الجوال');
    }
    else {
      Toast.show('enter your phone number');
    }
    errors.mobile ="mobile is requied ";
   }
   else if(obj.mobile.length < 7){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show(' رقم الجوال قصير');
    }
    else {
      Toast.show('mobile is too short ');
    }
    errors.mobile =" mobile is very short";
    }
    else if(!obj.gender){
      if(this.state.lang.indexOf('ar') != -1 ){
        Toast.show(' رقم الجوال قصير');
      }
      else {
        Toast.show('Gender Is Requied ');
      }
      errors.gender ="gender is requied";
    } 
  else if(!obj.email){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('ادخل البريد الالكتروني');
    }
    else {
      Toast.show('Email Is Requied ');
    }
    errors.email ="email is requied ";
   }
 else if(reg.test(obj.email) === false){
  if(this.state.lang.indexOf('ar') != -1 ){
    Toast.show(' البريد الالكتروني غير صحيح');
  }
  else {
    Toast.show('Email Is invalied ');
  }
  errors.email ="email is invalied ";
}
  else if(!obj.password){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('يرجي ادخال كلمة السر');
    }
    else {
      this.setState({flag:1});
      Toast.show('password is required ');
    }
    errors.password ="password is requied";
  } 
  else if(obj.password.length < 7){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show('  كلمة السر قصيرة');
    }
    else {
      Toast.show('password is very short ');
    }
    errors.password ="password is very short";
  }
  else if(!confirmPassword){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show(' يرجي كلمة السر');
    }
    else {
      Toast.show('confirm password required ');
    }
    errors.confirmPassword ="confirm password is requied"; 
  }
  else if(obj.password != confirmPassword){
    if(this.state.lang.indexOf('ar') != -1 ){
      Toast.show(' يرجي كلمة السر');
    }
    else {
      Toast.show(' password dont match ');
    }
    errors.confirmPassword ="password don't match";
  }

  return errors;
  }

  onSubmit=()=>{
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {
    // this.btnRegister.load();
    const obj ={
      fullname:this.state.fullname,
      mobile: this.state.codeNum + this.state.mobile,
      email:this.state.email,
      countryID:this.state.countryID,
      cityID:this.state.cityID,

      birthday:this.state.birthDay,
      gender:this.state.gender,
      password:this.state.password,
    }
    const errors =this.validate(obj,this.state.confirmPassword);
    this.setState({errors});
    if(Object.keys(errors).length === 0){
      this.setState({flag:0});

      fetch('http://142.93.99.0/api/user/register/', {
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
                if(this.state.lang.indexOf('ar') != -1 ){
                  this.setState({flag:1});
                  Toast.show('هذا البريد الالكتروني يوجد');
                }
                else {
                  this.setState({flag:1});
                  Toast.show('email is exist');
                }
              }
             else if(responseJson.message == 'sorry is mobile exsist'){
              if(this.state.lang.indexOf('ar') != -1 ){
                this.setState({flag:1});
                Toast.show('هذا الرقم موجود');
              }
              else {
                this.setState({flag:1});
                Toast.show('mobil is exist');
              }
                }
                else{
                  if(this.state.lang.indexOf('ar') != -1 ){
                    this.setState({flag:1});
                    Toast.show("حدث خطأ ما");
                  }
                  else {
                    this.setState({flag:1});
                    Toast.show("Opps !!");
                  }
                }
            }
            else{
             
              if(this.state.lang.indexOf('ar') != -1 ){
                this.setState({flag:1});
                Toast.show(' تم التسجيل بنجاح');
                this.props.navigation.push('Login');  
              }
              else {
                this.setState({flag:1});
                Toast.show('register complete ');
                this.props.navigation.push('Login');  
              }
            }
          })
          .catch((error) => {
           console.error(error);
          });
    }
    else{
      // this.btnRegister.reset();
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
  })
    }
 componentDidMount() {
  this.setState({flag:0});
  // NetInfo.isConnected.fetch().then(isConnected => {
  //   if(isConnected)
  //   {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {
      fetch('http://142.93.99.0/api/user/countries')
      .then((response) => response.json())
      .then((responseJson) => {
         const countries = responseJson;
        //  countries.unshift({
        //    _id:'0',titleAr:'آختار الدولة',titleEN:'Select Country'
        //  })
         const countriesAr =[];
         if(this.state.lang.indexOf('ar') != -1){
         countries.forEach(element => {
           countriesAr.push({
             label:element.titleAr ,value:element._id,key:element._id
           })
         });
        }else{
          countries.forEach(element => {
            countriesAr.push({
              label:element.titleEN ,value:element._id,key:element._id
            })
          });
        }
        this.setState({ countries :countriesAr});
        this.setState({flag:1});
      })
      .catch((error) => {
        this.setState({flag:1});
       console.error(error);
      });
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
    })
//     }
// })

  
}
 onPressLearnMore(){
  if(this.state.lang.indexOf('ar') != -1 ){
    Toast.show("تم ضغط الزر");
  }
  else {
    Toast.show('Button clicked!');
  }
      }
      state={
        checked:false
      }
      render() {
        return (
          <ImageBackground style={{flex:1,}} source={require('./images/backgroundsearcher.png')}> 

          <ScrollView style={styles.container22}>     
                  {this.state.flag != 0 ?  
               <View style={styles.container}>
                 <Image style={{ width: 70,height: 70,}}  resizeMode="stretch"  source={require('./images/Logo.png')} />
        <View style={styles.container2}>
        <TextInput
                style={styles.input}
                placeholder={this.state.lang.indexOf('ar') != -1 ?'الأسم' :'Fullname'}
                // underlineColorAndroid="transparent"
                placeholderTextColor="#A2B2B2"
                returnKeyType='next'
                autoCorrect={false}
                underlineColorAndroid='rgba(0,0,0,0)'
                ref={'txtFullname'}
                onChangeText={(fullname) => this.setState({fullname:fullname})}
                // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                keyboardType ="default"
                />
                  <View style={{  borderRadius:7,borderWidth: .5,marginBottom:7,flexDirection: 'row',width: '85%',marginBottom:2}}>           
                         <TextInput
                        style={{width:'100%',    textAlign:'center',
                        fontSize: 18,height: 43,paddingLeft: 5,}}
                        placeholder={this.state.lang.indexOf('ar') != -1 ?' رقم الجوال' :'Mobile Number'}
                        keyboardType = 'numeric'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#A2B2B2"
                        returnKeyType='next'
                        autoCorrect={false}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        ref={'mobile'}
                        onChangeText={(mobile) => this.setState({mobile:mobile})}
                        keyboardType ="default"
                        />
                  </View>
                  <TextInput
                        style={styles.input}
                        placeholder={this.state.lang.indexOf('ar') != -1 ?'البريد الالكتروني' :'E-mail Address'}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#A2B2B2"
                        returnKeyType='next'
                        autoCorrect={false}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        ref={'codeNum'}
                        onChangeText={(email) => this.setState({email:email})}
                        // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                        keyboardType ="default"
                        />
                  <TextInput
                        style={styles.input}
                        placeholder={this.state.lang.indexOf('ar') != -1 ?' كلمة المرور' :'Create Password'}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#A2B2B2"
                        returnKeyType='next'
                        autoCorrect={false}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        ref={'password'}
                        onChangeText={(password) => this.setState({password:password})}
                        // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                        keyboardType ="default"
                    />
            <TextInput
                    style={styles.input}
                    placeholder={this.state.lang.indexOf('ar') != -1 ?' تاكيد كلمة السر' :'Confirm Password'}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#A2B2B2"
                    returnKeyType='next'
                    autoCorrect={false}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    ref={'confirm password'}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword:confirmPassword})}
                    // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                    keyboardType ="default"
                      />
           <DatePicker
                        date={this.state.birthDay}
                        // style={{width:270}}
                        style={styles.datePicker}
                        mode="date"
                        placeholder={this.state.lang.indexOf('ar') != -1 ?'تاريخ الميلاد' :'Birth Date'}
                        format="YYYY-MM-DD"
                        minDate="1960-05-01"
                        maxDate="2010-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            // top: 4,
                            // marginLeft: 0
                          },
                          dateInput: {
                            // marginLeft: 36,
                            backgroundColor:'#fff',
                            borderWidth: 0,
                            height:40,
                           
                          },
                          placeholderText: {
                            fontSize: 18,
                            color: '#A2B2B2'
                        }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({birthDay: date})}}
                      />
                        <View style={{
                      backgroundColor: '#dddddd',
                      width: '85%',
                      height: 43,
                      borderWidth: .5,
                      marginBottom:7,
                      borderRadius:7,
                      paddingLeft:'2%',
                      paddingRight:'2%',
                      alignItems:'center',
                      justifyContent:'center',
                      borderColor: '#000000'}}>           
                    <RNPickerSelect
                      placeholder={{label:this.state.lang.indexOf('ar') != -1 ?'اختر البلد' :'Select Country',value:0,key:0, color: '#000'}}
                      hideIcon = {true}

                      mode = 'dialog'
                      items = {this.state.countries}
                       onValueChange = {(countryID) => 
                        {
                       
                          if(countryID !=null || countryID != ''){
                            this.setState({ countryID: countryID })
                            // this.getCities.bind(this)
                            fetch('http://142.93.99.0/api/user/citiesById?countryID='+countryID)
                            .then((response) => response.json())
                            .then((responseJson) => {
                               const cities = responseJson;
                              //  countries.unshift({
                              //    _id:'0',titleAr:'آختار الدولة',titleEN:'Select Country'
                              //  })
                               const citiesAr =[];
    
                               if(this.state.lang.indexOf('ar') != -1){
    
                               cities.forEach(element => {
                                 citiesAr.push({
                                   label:element.titleAr ,value:element._id,key:element._id
                                 })
                               });
    
                              }else{
                                cities.forEach(element => {
                                  citiesAr.push({
                                    label:element.titleEN ,value:element._id,key:element._id
                                  })
                                });
                              }
                              this.setState({ cities :citiesAr});
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                          }else{
                            if(this.state.lang.indexOf('ar') != -1 ){
                              Toast.show('يجب إختيار الدولة أولا');
                            }
                            else {
                              Toast.show('You must select country first');
                            }
                            this.setState({ cities :{}});
                          }
                       }}
              value={this.state.countryID}
              style={{color: '#000',textAlign:'center', alignItems:'center',justifyContent:'center', height:'100%',placeholderColor: 'gray'}}
              />
                    </View>
                    <View style={{
                        backgroundColor: '#dddddd',
                        width: '85%',
                        height: 43,
                        borderWidth: .5,
                        marginBottom:7,
                        borderRadius:7,
                        paddingLeft:'2%',
                        paddingRight:'2%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderColor: '#000000'}}>           
                    <RNPickerSelect
                        placeholder={{label:this.state.lang.indexOf('ar') != -1 ?'اختر المدينة' :'Select City',value:0,key:0}}
                        hideIcon = {true}
                        mode = 'dialog'
                        items = {this.state.cities}
              onValueChange = {(modeValue) => 
                { 
                  if(this.state.cities.length > 0 ){
                this.setState({ cityID: modeValue })
              } else {
                const t=[]
                this.setState({ cityID: t })
                if(this.state.lang.indexOf('ar') != -1 ){
                  Toast.show('عذرا هذه الدولة لاتحتوى علي مدن حاليا');
                }
                else {
                  Toast.show("Sorry this Country not have cities Now");
                }
              }
            }}
              value={this.state.cityID}
              style={{color: '#000',textAlign:'center', alignItems:'center',justifyContent:'center', height:'100%',placeholderColor: 'gray'}}
              />
              </View>
         
          
                  <View style={{
                      backgroundColor: '#dddddd',
                      width: '85%',
                      height: 43,
                      borderWidth: 1,
                      paddingLeft:'2%',
                      borderWidth: .5,
                      marginBottom:7,
                                        borderRadius:7,

                      paddingRight:'2%',
                      alignItems:'center',
                      justifyContent:'center',
                      borderColor: '#000000'}}>           

                    {/* <Picker
                      selectedValue={this.state.language}  
                      style={styles.Pick}
                      mode="dialog"
                      onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="2" />
                    </Picker> */}
                    <RNPickerSelect
                        placeholder={{label:this.state.lang.indexOf('ar') != -1 ?'اختر النوع' :'Select Gender',value:0,key:0}}
                        hideIcon = {true}
                        mode = 'dialog'
                        items =
                         {
                          this.state.lang.indexOf('ar') != -1 ? 
                          [{
                          label : 'ذكر',
                          value : 1,
                          key:1,
                        },{
                          label : 'أنثي',
                          value : 2,
                          key:2
                        }]
                      :
                      [{
                        label : 'Male',
                        value : 1,
                        key:1,
                      },{
                        label : 'Female',
                        value : 2,
                        key:2
                      }]
                      }
              onValueChange = {(modeValue) => this.setState({ gender: modeValue })}
            
              value={this.state.gender}
              style={{color: '#000',textAlign:'center', alignItems:'center',justifyContent:'center', height:'100%',placeholderColor: 'gray'}}
              />
                    </View>
                
            </View>
               
            <TouchableOpacity
                      style={styles.graenBtnBG}
                      onPress={this.onSubmit.bind(this)} >
                      <Text style={styles.userBtnText}>{this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'Sign Up'}</Text>
                      </TouchableOpacity>
            </View>
             :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
                          <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}

            </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    //    justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
     
        flexDirection:'column'
      },
      container2: {
        margin:10,
      //  flex: 1,
        width: '100%',
//        justifyContent: 'center',
        alignItems: 'center',
     //   backgroundColor: '#000000',
        flexDirection:'column'
      },
      input: {
        
    
       width: '85%',
    
       height: 40,

   
       borderColor: 'black',
       borderRadius:7,

       borderWidth: .5,
       marginBottom:5,
       textAlign:'center',

     
       fontSize: 16,
        paddingLeft: 5,
        textAlign:'center',
        paddingRight: 5,
     },
     datePicker: {
      backgroundColor: '#fff',
      width: '85%',
      marginBottom:5,
      borderWidth: .5,
      borderColor:'black',
      borderRadius:7,
      height: 40,
      alignItems:'center',
      justifyContent:'center',
      // paddingLeft: 5,
      // borderWidth: 1,
    },
     Pick: {
      width: '100%',
      height: 100,
      paddingLeft: 5,
      // color: '#000000',
    },submit:{
    backgroundColor:"rgb(26,150,88)",
    //backgroundColor:'#ffffff',
    borderRadius:10,
    borderWidth: 2,
    borderColor: '#00ff00'
  },
  welcome: {
    flex:.5,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
/* Here style the background of your button */
containerRow: {
  flexDirection: "row",
      justifyContent: "center",
  alignItems: "center"
},
graenBtnBG: {
  height: 35,
  width:'60%',
  marginBottom:10,
  // backgroundColor: "rgb(57,119,168)",
borderRadius:15,
alignItems:'center',
borderWidth:.5,
borderColor:'black',
   backgroundColor: "rgb(51,204,204)",
   justifyContent: 'center',
   flex: 1
},
  userBtnText: {
    fontSize: 18,
    color: "#000",
 },
 userBtnBG: {
  alignItems: "center",
  width:'30%',
  marginTop:10,
  backgroundColor:"rgb(26,150,88)",
  paddingVertical:10,
  marginHorizontal:10,
  borderRadius:5,
  borderWidth:1,
  borderColor:"rgb(26,150,88)",
  },
  vendorBtnBG: {
    alignItems: "center",
    width:'30%',
    marginTop:10,
    backgroundColor:"#ffffff",
    paddingVertical:10,
    marginHorizontal:10,
    borderRadius:7,
    borderWidth:1,
    borderColor:"rgb(26,150,88)",
    },
    vendorBtnText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: "rgb(26,150,88)",
   },
    container22: {
    flex: 1,
    
  },
});