import {
 
    View,
    Text,
    TextInput,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    NetInfo,
    Image,
    Alert,
    AsyncStorage,
    ActivityIndicator
  } 
  from 'react-native';
  import React, { Component } from 'react';
  import RNPickerSelect from 'react-native-picker-select';
  import Icon  from 'react-native-vector-icons/Ionicons';
  import ImagePicker from 'react-native-image-picker';
  import Toast from 'react-native-simple-toast';
  import DeviceInfo from 'react-native-device-info';
  
import Modal from 'react-native-modalbox';

import Button from 'react-native-button';

   class Request extends Component {
    
    constructor(props, context) { 
      super(props, context);
      this.state ={
        mobile:'',
        password:'',
        email:'',
        fullname:'',
        countryID:'0',
        Gender:'',
        birthDay:'',
        confirmPassword:'',
        loading:false,
        errors:{},
        countries:[],
        cities:[],
        hospitals:[],
        categories:[],
        title:'',
        cityID:'',
        categoryID:'',
        hospitalID:'',
        userDate:{},
        userDataFlag:false,
        checked: false,
       
        description:'',
        error:[],
        lang: DeviceInfo.getDeviceLocale(),
        flag:0,
      }
   };
   componentDidMount() {
    this.getUserData();
   
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
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'أضافة سؤال' :'Add Question'}</Text>
       </View>
         ),
     headerRight: (<View/>)
    };
    
   
    getUserData = async () =>{
      this.setState({flag:0});
      const value = await AsyncStorage.getItem('loginDataClinic');
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {
      
      if(value){
        const data =JSON.parse(value);
        this.setState({userDate:data});
        this.setState({userDataFlag:true});
        // this.setState({fullname:data.fullname})
        
        fetch('http://142.93.99.0/api/user/fields')
        .then((response) => response.json())
        .then((responseJson) => {
           const categories = responseJson;
           const categoriesAr =[];
           if(this.state.lang.indexOf('ar') != -1){
            categories.forEach(element => {
              categoriesAr.push({
                label:element.titleAr ,value:element._id,key:element._id
              })
            });
           }else{
            categories.forEach(element => {
              categoriesAr.push({
                 label:element.titleEN ,value:element._id,key:element._id
               })
             });
           }
          this.setState({ categories :categoriesAr});})
        .catch((error) => {
          this.setState({flag:1});
          console.error(error);
        });
       
        this.setState({flag:1});
      }
      else{
        this.setState({flag:1});
        Alert.alert(
          this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
          this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',
          [
            // {text: 'Cancel', onPress: () => this.dismiss, style: 'cancel'},
            {text:  this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'login Now',
             onPress: () => {
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
    })
    }
    validate=(obj)=>{
      this.setState({flag:0});
      const errors ={};
       if( !obj.fieldID|| obj.fieldID== 0){
        if(this.state.lang.indexOf('ar') != -1 ){
          this.setState({flag:1});
          Toast.show('يجب أختيار الديانة');
        }
        else {
          this.setState({flag:1});
          Toast.show('Religion is requeid ');
        }
        errors.fieldID="Religion is requeid ";
      }
    else  if(!obj.title){
        if(this.state.lang.indexOf('ar') != -1 ){
          this.setState({flag:1});
          Toast.show('يجب ان تدخل العنوان');
        }
        else {
          this.setState({flag:1});
          Toast.show('title is requied');
        }   
        errors.title ="title is requied "; 
      }
     
      
     else if(!obj.description){
      if(this.state.lang.indexOf('ar') != -1 ){
        this.setState({flag:1});
        Toast.show('يجب كتابة الوصف ');
      }
      else {
        this.setState({flag:1});
        Toast.show('notes is requied');
      }
        errors.description ="notes is requied "; 
      }
      return errors;
    }
    onSubmit=()=>{
      this.setState({flag:0});
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {
      if(this.state.userDataFlag == true){
      
      // this.btnRegister.load();
      const obj ={
        title:this.state.title,
        userID:this.state.userDate._id,
        fieldID:this.state.categoryID,
        description:this.state.description,
      }
      const errors =this.validate(obj);
      this.setState({errors});
      if(Object.keys(errors).length === 0){
        fetch('http://142.93.99.0/api/user/addPost/', {
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
                }
                else {
                  this.setState({flag:1});
                
                }
                this.setState({title:''});
                this.setState({categoryID:''});
                this.setState({description:''});

              this.setState({flag:1});
              this.refs.modal3.open()

                
              }
            })
            .catch((error) => {
              this.setState({flag:1});
              console.error(error);
            });
      }
    }
    else{
      this.setState({flag:1});
      Alert.alert(
        this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
        this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',

        [
        
          {text:    this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'login Now', onPress: () => {
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
  })
      }
    render() {
      return (
        <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
           {this.state.flag != 0 ?
   
        <View style={{ flex: 1,}}>


               <View style={{height: "10%", width: "100%",marginTop:6,alignItems:'flex-start',justifyContent:'center'}}> 
                    <Image style={{ height: 40, width: 40,marginHorizontal:3}}
                     source={require('../../images/speech_bubble.png')}
                      resizeMode="stretch"
                                  />
                      </View>
                      <View style={{marginTop: 6}}>
   <ScrollView tyle={{width: '100%', }}>

        <View style={{width: '100%', marginTop: 10, flexDirection: 'row'}}>
        <Text style={{ fontSize: 17, fontWeight:'bold',color:'#000' ,paddingLeft:5,
      paddingRight:5}} >{this.state.lang.indexOf('ar') != -1 ? 'أختر الديانة':'Select Religion'}</Text>
          <View style={{width:'100%',justifyContent: 'center',}}>
        <View style={{width:'40%',marginTop:5,height:35,borderColor: '#000',alignItems:'center',borderWidth: .7,backgroundColor:'#fff',justifyContent: 'center',alignItems: 'center'}}>
           <RNPickerSelect
                      placeholder={{label:this.state.lang.indexOf('ar')!= -1 ?' الديانة': 'Religion',value:0,key:0, color: '#000'}}
                      hideIcon = {true}
                      mode = 'dialog'
                      items = {this.state.categories}
                      onValueChange = {(categoryID) => 
                        {
                          if(categoryID !=null || categoryID != ''){
                        this.setState({ categoryID: categoryID })                   
                      }else{
                        if(this.state.lang.indexOf('ar') != -1 ){
                          Toast.show('يجب إختيار الديانة أولا');
                        }
                        else {
                          Toast.show('You must select Religion first');
                        }
                       
                      }
                      }}
              value={this.state.categoryID}
              style={{color: '#000',width:'100%',textAlign:'center', alignItems:'center',justifyContent:'center',fontSize:15, height:'100%',placeholderColor: '#000'}}/>
              </View>
        </View>
        </View>
     
      

        <View style={{width: '100%', marginTop: 10}}>
        <Text style={{ fontSize: 17, fontWeight:'bold',color:'#000' ,paddingLeft:5,alignItems:'center',
      paddingRight:5}} >{this.state.lang.indexOf('ar')!= -1 ?'أكتب السؤال' :'Write a Question'}</Text>
              </View>
          
        <View style={{width: '100%',alignItems:'center'}}> 
              <TextInput
            defaultValue={this.state.title}
            onChangeText={(title) => this.setState({title:title})}
            style={{height: 30, marginTop: 10,marginRight: 30, width: 200, borderWidth: .7, borderRadius: 5, borderColor: '#000', backgroundColor: 'white', padding: 5}} 
            placeholder={this.state.lang.indexOf('ar') != -1 ? 'العنوان' :'Title'} >
            </TextInput>
            </View>
        <View style={{ flex: 1,marginTop:10, justifyContent: 'center', alignItems:'center',width:'100%'}}>
            <TextInput
             multiline={true} style={{height: 160, width: '79%', borderWidth: 1,alignItems:'center', borderRadius: 5, borderColor: '#000', backgroundColor: 'white', textAlign: 'center', padding: 5}} 
             placeholder={this.state.lang.indexOf('ar') != -1?'أكتب السؤال ' :"Type Your Question ..."} 
             onChangeText={(description) => this.setState({ description  }) }
             />
          </View>
          </ScrollView>     
          </View>
        <View style={{width: '100%',justifyContent: 'center', alignItems:'center', marginTop: 10}}>
        <TouchableOpacity
                      style={{ backgroundColor:"rgb(51,204,204)",
                      paddingHorizontal: 50,
                      borderColor:'#000',
                      borderRadius:15,
                      borderWidth:.7,
                      paddingVertical:4,
                      marginHorizontal:10,
                      justifyContent: 'center', alignItems:'center',
                      width:'50%',
                      marginBottom:5}}
                      onPress={this.onSubmit.bind(this)}
                      >
                      <Text style={{ fontSize: 18,
    fontWeight: 'bold',
    color: "#000",}}>{this.state.lang.indexOf('ar')!= -1 ?'نشر': 'Share'}</Text>
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
              
                    <Text style={{ fontSize:17,width:'90%',textAlign:'center',color:'#000'}}>{this.state.lang.indexOf('ar') != -1 ?'سيتم نشر هذا السؤال بعد مراجعته من الإداره' :'This question will be posted after review by the administration'}</Text>
                      
                   
                    <View style={{flexDirection:'row'}}>
          <Button onPress={() => {
        
           
              NetInfo.isConnected.fetch().then(isConnected => {
                        if(isConnected)
                        {
                          this.props.navigation.push('Home');
                         
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
          }}>{this.state.lang.indexOf('ar') != -1 ?'نشر' :'Share'}</Button>
              
          </View>
        </Modal>
                      </View>
        
           :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
              <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}




        </ImageBackground>
      );
    }
  }
  export default Request;
 
  