import {
    Button,
    View,Image,TouchableOpacity,
    TextInput,Text,
    ImageBackground,
    ScrollView,
    StyleSheet, 
    NetInfo,
    Picker,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    AsyncStorage

  } from 'react-native';
  import RNPickerSelect from 'react-native-picker-select';
  import Toast from 'react-native-simple-toast';
  import DeviceInfo from 'react-native-device-info';
  import ImagePicker from 'react-native-image-picker';

  
  import React, { Component } from 'react';
  // import Picker from 'react-native-picker';

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:5,
        backgroundColor: '#ffffff',
        flexDirection:'column'
      
      },
      image: {
        marginLeft: 10,
        width: 80,
        height:80,
        
       
      }, imageicon: {
        width: 30,
        height:30,
        marginLeft: 10,
        marginRight:10 ,
       
      },
      viewcontainer:{
        flex: 1,
        marginTop: 5,
        alignContent: 'center',
        paddingTop:5,
        backgroundColor: '#ffffff',
        flexDirection:'row'
      }, viewcontainer2:{
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
        alignContent: 'center',
        paddingTop:5,
        backgroundColor: '#ffffff',
        flexDirection:'row'
      },
      textstyle:{
        marginTop: 30,
        color:"rgb(17,119,168)",
        margin:5,
        alignContent: 'center',

    
      },
      textstyle2:{
        marginTop: 5,
        color:'black',
        fontSize: 16,
        margin:5,
        fontWeight: 'bold',
        alignContent: 'center',

    
      }
    });
  
   class EditProfileScreen extends Component {
    constructor(){
      super();
      this.state ={
        mobile:'',
        password:'',
        email:'',
        countryID:'',
        flag:0,
        genderID:0,
        loading:false,
        errors:{},
        countries:[],
        cities:[],
        countryID:'',
        cityID:'',
        lang:'',
        fullname:'',
        userDate:{},
        newPassword:'',
        gender:{label:'Select Gendert',value:0,key:0},
        userImg:'http://178.128.37.73/ProfilePicture.jpg',
        lang: DeviceInfo.getDeviceLocale()
      }
      this.getUserData=this.getUserData.bind(this);
      this.updateUserDate=this.updateUserDate.bind(this);
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
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'تعديل بياناتي' :'ُEdit Profile'}</Text>
       </View>
         ),
    //  headerRight: (<View/>)
    };
    getUserData = async () =>{
      this.setState({flag:0});
      const value = await AsyncStorage.getItem('loginDataClinic');
      if(value){
        const data =JSON.parse(value);
        this.setState({userDate:data});
        this.setState({countryID:data.countryID})
        this.setState({cityID:data.cityID})
        this.setState({mobile:data.mobile})
        this.setState({email:data.email})
        this.setState({genderID:data.gender})
        this.setState({fullname:data.fullname})

        if(data.personalImg){
          this.setState({userImg:data.personalImg})
       }
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
         fetch('http://142.93.99.0/api/user/citiesById?countryID='+this.state.countryID)
         .then((response) => response.json())
         .then((responseJson) => {
            const cities = responseJson;
           //  countries.unshift({
           //    _id:'0',titleAr:'????? ??????',titleEN:'Select Country'
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


      }
    }
    componentDidMount() {
      // this.setState({ lang });
      this.setState({flag:0});
      this.getUserData();

    }
    uploadImg=()=>{
      this.setState({flag:0});
      const options = {
        title: this.state.lang.indexOf('ar') != -1?'أختار النوع': 'Select Avatar',
        cancelButtonTitle:this.state.lang.indexOf('ar') != -1?'الغاء ': 'Cancel',
        takePhotoButtonTitle:this.state.lang.indexOf('ar') != -1?'كاميرا ': 'Camera',
        chooseFromLibraryButtonTitle:this.state.lang.indexOf('ar') != -1?'معرض الصور ': 'Gallery ',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, (response) => {      
        if (response.didCancel) {
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show('تم الغاء رفع الصورة');
          }
          else {
            this.setState({flag:1});
            Toast.show('upload image cancel');
          }
        } else if (response.error) {
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show("حدث خطأ ما");
          }
          else {
            this.setState({flag:1});
            Toast.show("Opps !!");
          }
        } else if (response.customButton) {
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show("حدث خطأ ما");
          }
          else {
            this.setState({flag:1});
            Toast.show("Opps !!");
          }
        } else {
          const source = { uri: response.uri };
          // alert(source.uri);
          const data = new FormData();
          data.append('name', 'testName'); // you can append anyone.
          data.append('photo', {
            uri: source.uri,
            type: 'image/jpeg', // or photo.type
            name: 'testPhotoName'
          });
        fetch('http://142.93.99.0/api/user/uploadFile', {
          method: 'post',
          body: data
        }).then((res)=>{ return res.text() })
        .then((text)=>{
        //  alert(JSON.stringify(res));
          this.setState({
            userImg: text
          });
          var obj ={
            personalImg: text
          }
          fetch('http://142.93.99.0/api/user/user/'+this.state.userDate._id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:  JSON.stringify(obj)
        })
          // fetch('http://178.128.43.195:7000/api/client/user/'+this.state.userDate._id,formData)
          .then((response) => response.json())
          .then((responseJson) => {
                    AsyncStorage.removeItem('loginDataClinic');
            AsyncStorage.setItem( 'loginDataClinic', JSON.stringify( responseJson ) );
            this.setState({flag:1});
            // alert('Image uploaded successfully');
            this.getUserData();
            
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
        });
        }
      });
    }
    updateUserDate =async ()=>{
      this.setState({flag:0});
      var obj={};
      if(this.state.password){
              if(this.state.password ==this.state.userDate.password){
              
                if(this.state.newPassword){
                  obj.password=this.state.newPassword;
                  obj.countryID=this.state.countryID;
                  obj.cityID=this.state.cityID;
                  obj.gender=this.state.genderID;
                  obj.fullname=this.state.fullname;
                }
              else{
                obj.countryID=this.state.countryID;
                obj.cityID=this.state.cityID;
                obj.gender=this.state.genderID;
                obj.fullname=this.state.fullname;

              }
              }else{
              
                if(this.state.lang.indexOf('ar') != -1 ){
                  this.setState({flag:1});
                  Toast.show(":كلمة المرور القديمة خاطئة");
                }
                else {
                  this.setState({flag:1});
                  Toast.show("Old password is worng !!");
                }
                this.setState({flag:1});
                return;
              }
            }
    else{
            if(this.state.email != this.state.userDate.email){
              obj.email=this.state.email;
              obj.countryID=this.state.countryID;
              obj.cityID=this.state.cityID;
              obj.gender=this.state.genderID;
              obj.fullname=this.state.fullname;

              if(this.state.mobile == this.state.userDate.mobile){
                obj.mobile=this.state.mobile;
                obj.countryID=this.state.countryID;
                obj.cityID=this.state.cityID;
                obj.gender=this.state.genderID;
                obj.fullname=this.state.fullname;

              }
              else{
                obj.countryID=this.state.countryID;
                obj.gender=this.state.genderID;
                obj.cityID=this.state.cityID;
                obj.fullname=this.state.fullname;

                
              }
            }
            else{
              if(this.state.mobile != this.state.userDate.mobile){
                obj.mobile=this.state.mobile;
                obj.countryID=this.state.countryID;
                obj.gender=this.state.genderID;
                obj.fullname=this.state.fullname;

                obj.cityID=this.state.cityID;
              }
              else{
                obj.countryID=this.state.countryID;
                obj.gender=this.state.genderID;
                obj.fullname=this.state.fullname;

                obj.cityID=this.state.cityID;
                
              }
            }
    }
    fetch('http://142.93.99.0/api/user/user/'+this.state.userDate._id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(obj)
  })
    // fetch('http://178.128.43.195:7000/api/client/user/'+this.state.userDate._id,formData)
    .then((response) => response.json())
    .then((responseJson) => {
      AsyncStorage.removeItem('loginDataClinic');
            AsyncStorage.setItem( 'loginDataClinic', JSON.stringify( responseJson ) );
            if(this.state.lang.indexOf('ar') != -1 ){
              this.setState({flag:1});
              Toast.show("تم تعديل البيانات بنجاح");
            }
            else {
              this.setState({flag:1});
              Toast.show("your data uploaded successfully");
            }
      this.getUserData();
     
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
   
    
    }
    render() {
      return (

        <SafeAreaView style={{backgroundColor:'white',flex:1,backgroundColor:'#fff'}}>
         {this.state.flag != 0 ?
        <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
        <StatusBar barStyle="light-content"/>
      <View style={{flexDirection:'column',flex:.3, alignItems:'center',justifyContent:'center',height:110, marginTop:10,width:'100%',padding:10}}>
      <TouchableOpacity onPress={this.uploadImg.bind(this)}>
      <Image style={{
                    width:90,height:70,
                     }}  resizeMode="stretch" source={{uri:this.state.userImg}} />
                     </TouchableOpacity>
                    <Text style={{textDecorationLine: 'underline', paddingLeft:5,paddingRight:5,fontSize:22,color:'rgb(51,204,204)'}}>
                    {this.state.fullname}</Text>
                  
  
      </View>
     
      <ScrollView style={{flex:3,height:'100%',marginBottom:10,flexDirection:'column',}}>
     
      <View style={{flexDirection:'column',height:60,flex:1,marginTop:5,
    marginLeft:10,marginRight:10,marginTop:3}}>
      <Text style={{ paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>
   {this.state.lang.indexOf('ar')!= -1 ?'الدولة / المدينة': 'Country / City'}
      </Text>
      <View style={{flexDirection:'column',height:35, marginTop:5,width:'100%',borderWidth:0, borderColor:'rgb(60,76,140)',}}>
      <View style={{flexDirection: 'row',width:'100%',marginLeft:5,marginRight:5}}>
        <View style={
{ width:'45%',marginLeft:2,marginRight:2,height:35,borderColor: '#000',alignItems:'center',borderWidth:.7,backgroundColor:'#fff',marginTop:1,justifyContent: 'center',alignItems: 'center'}}>
        {/* <TextInput 
        style={{height: 30,width:200, borderColor: '#0000ff', borderWidth: 1, marginTop: 10,backgroundColor: 'white', textAlign: 'center', padding: 5, fontSize: 17, borderRadius: 15}}
        placeholder="القلب " placeholderTextColor="#000"/> */}
           <RNPickerSelect
                      placeholder={{label:this.state.lang.indexOf('ar') != -1 ?'الدولة':'Country',value:0,key:0, color: '#000'}}
                      hideIcon = {true}
                      underlineColorAndroid='rgba(0,0,0,0)'

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
              
              // style={{height: 30,width:'50%', borderColor: '#0000ff', borderWidth: 1, marginTop: 10,backgroundColor: '#000', textAlign: 'center', padding: 5, fontSize: 17, borderRadius: 15}}
              style={{color: '#000',width:'100%',textAlign:'center', alignItems:'center',justifyContent:'center',fontSize:15, height:'100%',placeholderColor: '#000'}}/>
              </View>
              <View style={{width:'45%', marginLeft:2,marginRight:2,height:35,borderColor: '#000',alignItems:'center',borderWidth: .7,backgroundColor:'#fff',marginTop:1,justifyContent: 'center',alignItems: 'center'}}>
        {/* <TextInput 
        style={{height: 30,width:200, borderColor: '#0000ff', borderWidth: 1, marginTop: 10,backgroundColor: 'white', textAlign: 'center', padding: 5, fontSize: 17, borderRadius: 15}}
        placeholder="القلب " placeholderTextColor="#000"/> */}
           <RNPickerSelect
                      placeholder={{label:this.state.lang.indexOf('ar') != -1 ?'اختر المدينة' :'Select City',value:0,key:0, color: '#000'}}
                      hideIcon = {true}
                      underlineColorAndroid='rgba(0,0,0,0)'

                      mode = 'dialog'
                      items = {this.state.cities}
                      onValueChange = {(cityID) => 
                        {
                          this.setState({ cityID: cityID })
                      }}
              value={this.state.cityID}
              // style={{height: 30,width:'50%', borderColor: '#0000ff', borderWidth: 1, marginTop: 10,backgroundColor: '#000', textAlign: 'center', padding: 5, fontSize: 17, borderRadius: 15}}
              style={{color: '#000',width:'100%',textAlign:'center', alignItems:'center',justifyContent:'center',fontSize:15, height:'100%',placeholderColor: '#000'}}/>
              </View>
            </View>
      </View>
      </View>

       <View style={{flexDirection:'column',height:60,flex:1,marginTop:15,
    marginLeft:10,marginRight:10}}>
      <Text style={{paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>{this.state.lang.indexOf('ar')!= -1 ?'رقم الجوال':'Mobile'}</Text>
      <TextInput style={{flex:1,height:30,marginTop:5,borderWidth:.7,borderColor:'#000',backgroundColor:'#fff',
      color:'#000',paddingLeft:10,paddingRight:10}}
                placeholder={this.state.lang.indexOf('ar') != -1 ?'رقم الجوال' :'Mobile Number'}
                placeholderTextColor="#dddddd"
                // returnKeyType='next'
                autoCorrect={false}
                defaultValue={this.state.mobile}
                fontSize={10}
                underlineColorAndroid='rgba(0,0,0,0)'
                ref={'txtFullname'}
                onChangeText={(mobile) => this.setState({mobile:mobile})}
                // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                keyboardType ="default"/>
      </View>
      <View style={{flexDirection:'column',height:60,flex:1,marginTop:15,
    marginLeft:10,marginRight:10}}>
      <Text style={{paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>{this.state.lang.indexOf('ar')!= -1 ?'الإسم':'Name'}</Text>
      <TextInput style={{flex:1,height:30,marginTop:5,borderWidth:.7,borderColor:'#000',backgroundColor:'#fff',
      color:'#000',paddingLeft:10,paddingRight:10}}
                placeholder={this.state.lang.indexOf('ar') != -1 ?'الإسم' :'Name'}
                placeholderTextColor="#dddddd"
                // returnKeyType='next'
                autoCorrect={false}
                defaultValue={this.state.fullname}
                fontSize={10}
                underlineColorAndroid='rgba(0,0,0,0)'
                ref={'txtFullname'}
                onChangeText={(fullname) => this.setState({fullname:fullname})}
                // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                keyboardType ="default"/>
      </View>
       <View style={{flexDirection:'column',height:60,flex:1,marginTop:5,
    marginLeft:10,marginRight:10,marginTop:3}}>
      <Text style={{ paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>
      {this.state.lang.indexOf('ar') != -1 ?'الجنس' :'Gender'}</Text>
      <View style={{flexDirection:'column',
      borderColor: '#000',borderWidth: .7,backgroundColor:'#fff',marginTop:1,justifyContent: 'center',alignItems: 'center',height:35, marginTop:5,width:'100%'}}>
      <RNPickerSelect
                        placeholder={{label:this.state.lang.indexOf('ar') != -1 ?'أختار النوع': 'Select Gender',value:0,key:0}}
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
              onValueChange = {(genderID) => this.setState({ genderID: genderID })}
            
              value={this.state.genderID}
              style={{color: '#000',width:'100%',textAlign:'center', alignItems:'center',justifyContent:'center',fontSize:15, height:'100%',placeholderColor: '#000'}}
              />
      </View>
      </View>

       <View style={{flexDirection:'column',height:60,flex:1,marginTop:17,
      marginLeft:10,marginRight:10,marginTop:12}}>
    
      <Text style={{paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>
      {this.state.lang.indexOf('ar')!=-1 ?'البريد الألكتروني': 'Email'}
      </Text>
      <TextInput style={{flex:1,height:30,marginTop:5,borderWidth:.7,borderColor:'#000',backgroundColor:'#fff',
      color:'#000',paddingLeft:10,paddingRight:10}}
                placeholder={this.state.lang.indexOf('ar')!=-1 ?'البريد الألكتروني': 'email'}
                placeholderTextColor="rgb(60,76,140)"
                // returnKeyType='next'
                autoCorrect={false}
                fontSize={10}
                defaultValue={this.state.email}
                underlineColorAndroid='rgba(0,0,0,0)'
                ref={'txtFullname'}
                onChangeText={(email) => this.setState({email:email})}
                // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                keyboardType ="default"/>
      </View>

         <View style={{flexDirection:'column',height:100,marginBottom:10,flex:1,marginTop:5,
       marginLeft:10,marginRight:10,marginTop:2}}>
    
      <Text style={{paddingLeft:5,paddingRight:5,fontSize:16,color:'#000'}}>
      {this.state.lang.indexOf('ar')!=-1 ?'تغيير كلمة المرور': 'Change Password'}</Text>
      <TextInput 
      style={{flex:1,height:30,marginTop:5,borderWidth:.7,borderColor:'#000',backgroundColor:'#fff',
      color:'#000',paddingLeft:10,paddingRight:10}}
                placeholder= {this.state.lang.indexOf('ar')!=-1 ?'كلمة المرور القديمة ':'Old Password'}
                placeholderTextColor="#000"
                // returnKeyType='next'
                autoCorrect={false}
                fontSize={10}
                secureTextEntry
                underlineColorAndroid='rgba(0,0,0,0)'
                ref={'txtFullname'}
                onChangeText={(password) => this.setState({password:password})}
                // onSubmitEditing={this.handleFocusNextField.bind(this, 'txtEmail')}
                keyboardType ="default"/>
                <TextInput 
                 style={{flex:1,height:30,marginTop:5,borderWidth:.7,borderColor:'#000',backgroundColor:'#fff',
                 color:'#000',paddingLeft:10,paddingRight:10}}
                placeholder= {this.state.lang.indexOf('ar')!=-1 ?'كلمة المرور الجديدة':'New Password'}
                placeholderTextColor="#000"
                // returnKeyType='next'
                autoCorrect={false}
                secureTextEntry
                fontSize={10}
                underlineColorAndroid='rgba(0,0,0,0)'
                ref={'txtFullname'}
                onChangeText={(newPassword) => this.setState({newPassword:newPassword})}
                keyboardType ="default"/>
      </View>
      </ScrollView>
      <View style={{flexDirection:'column',height:25, alignItems:'center',justifyContent:'center', marginTop:10,marginBottom:10,width:'100%',padding:10}}>

      <TouchableOpacity style={{borderWidth:.5,borderRadius:15,borderColor:'black',backgroundColor:'rgb(51,204,204)',alignItems:'center', width:'35%'}} 
        onPress={this.updateUserDate.bind(this)} 
        >
            <Text style={{ fontSize:18,color:'#000' }}> 
            {this.state.lang.indexOf('ar')!=-1 ? 'حفظ':'Save'} </Text></TouchableOpacity>
      </View>
      </ImageBackground>
        :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
              <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}
      </SafeAreaView>
      
      );
    }
  }
  export default EditProfileScreen;
 