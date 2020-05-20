import {
    Button,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    StyleSheet,
    AsyncStorage,
    Alert,
    RefreshControl
  } from 'react-native';
  import PopupDialog from 'react-native-popup-dialog';
  import React, { Component } from 'react';
  import Toast from 'react-native-simple-toast';
  import DeviceInfo from 'react-native-device-info';
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        flexDirection:'column'
      
      },
      image: {
        // marginLeft: 10,
        width: 80,
        height:80,
       // marginLeft:10,
      //  marginRight:10
      }, imageicon: {
        width: 30,
        height:30,
        //paddingLeft: 10,
       // paddingRight:10 ,
      },
      viewcontainer:{
        flex: 1,
        marginTop: 5,
    
        flexDirection:'row',
       width:'100%'
      }, viewcontainer2:{
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
        alignContent: 'center',
        paddingTop:5,
        flexDirection:'row'
      },
      textstyle:{
        marginTop: 30,
        color:"#000",
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
   class MenusDetails extends Component {
    constructor(){
      super();
    this.state={
      fullname:'',
      userDate:{},
      userImg:'http://178.128.37.73/ProfilePicture.jpg',
      lang: DeviceInfo.getDeviceLocale(),
      refreshing: false,

    }
    this.getUserData=this.getUserData.bind(this);
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
         >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'الإعدادات' :'Settings'}</Text>
         </View>
       ),
  //  headerRight: (<View/>)
  };
 
  
  onRefresh() {
    this.setState({ refreshing: true }, function() {this.componentDidMount()});
  }
  getUserData = async () =>{
    const value = await AsyncStorage.getItem('loginDataClinic');
    if(value){
      const data =JSON.parse(value);
      this.setState({userDate:data});
      this.setState({fullname:data.fullname})
     if(data.personalImg){
        this.setState({userImg:data.personalImg})
     }
    }
    else{
      if(this.state.lang.indexOf('ar') != -1 ){
        this.setState({fullname:'أسم المستخدم'})
      }
      else {
        this.setState({fullname:'Username'})
      }   
    }
  }
  goEditProfile =async() =>{ 
    const value = await AsyncStorage.getItem('loginDataClinic');
    if(value){
    this.props.navigation.push('editprofile')
    }else{
      Alert.alert(
        this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
        this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',
        [
          {text: this.state.lang.indexOf('ar') != -1 ?'إلغاء' :'Cancel',
           onPress: () => this.dismiss, style: 'cancel'},
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
  }
  signOut =async() =>{
    Alert.alert(
      this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
      this.state.lang.indexOf('ar') != -1 ?' هل انت متاكد من  تسجيل خروج' :'Are you sure you want to Sign out',      [
        {text: this.state.lang.indexOf('ar') != -1 ?'إلغاء' :'Cancel',
        onPress: () => this.dismiss, style: 'cancel'},
        {text:this.state.lang.indexOf('ar') != -1 ?'تسجيل خروج' :'Sign out',  onPress: () => {
          try{
            AsyncStorage.removeItem('loginDataClinic');
            this.setState({userDate:''});
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

  componentDidMount() {
    this.getUserData();
    this.setState({ refreshing: false })
  }
  goContactUS=async()=>{
    const value = await AsyncStorage.getItem('loginDataClinic');
    if(value){
    this.props.navigation.push('contactus')
    }else{
      Alert.alert(
        this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
        this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',
        [
          {text: this.state.lang.indexOf('ar') != -1 ?'إلغاء' :'Cancel',
          onPress: () => this.dismiss, style: 'cancel'},
          {text: this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'login Now',
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
   }
   goSpam=async()=>{
    const value = await AsyncStorage.getItem('loginDataClinic');
    if(value){
    this.props.navigation.push('report')
    }else{
      Alert.alert(
        this.state.lang.indexOf('ar') != -1 ?'الباحث' :'Searcher',
        this.state.lang.indexOf('ar') != -1 ?'يجب تسجيل الدخول أولا' :'you Must Login First',
        [
          {text:  this.state.lang.indexOf('ar') != -1 ?'إلغاء' :'Cancel',
           onPress: () => this.dismiss, style: 'cancel'},
          {text: this.state.lang.indexOf('ar') != -1 ?' تسجيل الدخول' :'login Now',
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
   }

    render() {
      return (
        <ImageBackground style={{flex:1,}} source={require('../images/backgroundsearcher.png')}> 
        {/* <View style={{borderBottomColor:"rgb(17,119,168)",borderBottomWidth:.7,    justifyContent:'center', backgroundColor: '#ffffff',width:'100%',height:'8%',flexDirection:'row',alignItems:'center' }}>
        <Text style={{flex:1,color:'black',fontSize:14,fontWeight:'bold'}}>
        Back
        </Text>   
        <Text style={{flex:1,justifyContent:'center',alignItems:'center',color:'black',fontSize:14,fontWeight:'bold'}}>
       Menu
        </Text>  
        <Text style={{flex:1}}>
        
        </Text> 
        </View > */}
           <ScrollView style={styles.container} refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            } >
        <View style={[styles.container,{paddingHorizontal: 10,}]}>
        <View style={styles.viewcontainer}>
        <Image style={styles.image}  source={{uri:this.state.userImg}} />
        <Text style={styles.textstyle} >{this.state.fullname}</Text>
      </View>
      <View style={{flexDirection:'column',width:'100%',paddingVertical:10}}>
      {this.state.userDate._id != null ?
      <TouchableOpacity 
        onPress={ this.goEditProfile.bind(this)}>
      <View style={styles.viewcontainer}>
        <Image style={styles.imageicon}  source={require('../images/pencil-striped-symbol-for-interface-edit-buttons.png')} />
        <Text style={styles.textstyle2} >{this.state.lang.indexOf('ar') != -1 ?'تعديل حسابي' :'Edit My Info' } </Text>
      </View>
      </TouchableOpacity>
      :<View style={{display:'none'}}></View>}
      </View>
      <TouchableOpacity  onPress={() => this.props.navigation.navigate('aboutapp')}>
      <View style={styles.viewcontainer}>
        <Image style={styles.imageicon}  source={require('../images/smartphone-message.png')} />
        <Text style={styles.textstyle2} >{this.state.lang.indexOf('ar') != -1 ?'عن التطبيق': 'About App'}</Text>
      </View>
      </TouchableOpacity>
      <View style={{flexDirection:'column',width:'100%',paddingVertical:10}}>
      {this.state.userDate._id != null ?
      <TouchableOpacity  onPress={ this.goContactUS.bind(this)}>
      <View style={styles.viewcontainer}>
        <Image style={styles.imageicon}  source={require('../images/chat.png')} />
        <Text style={styles.textstyle2} >{this.state.lang.indexOf('ar') != -1 ?'تواصل معنا': 'Contact US'}</Text>
      </View>
      </TouchableOpacity>
         :<View style={{display:'none'}}></View>}
         </View>
      <TouchableOpacity  onPress={() => this.props.navigation.navigate('terms')}>
      <View style={styles.viewcontainer}>
        <Image style={styles.imageicon}  source={require('../images/invoice.png')} />
        <Text style={styles.textstyle2} > {this.state.lang.indexOf('ar') != -1 ?'الشروط والأحكام': 'Terms & Conditions' } </Text>
      </View>
      </TouchableOpacity>
      <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'rgb(217, 217, 217)'}}>
    </View>
  </PopupDialog>
  <View style={{flexDirection:'column',width:'100%',paddingVertical:10}}>
      {this.state.userDate._id != null ?
  <TouchableOpacity  onPress={ this.goSpam.bind(this)}>
      <View style={styles.viewcontainer}>
        <Image style={styles.imageicon}  source={require('../images/problem.png')} />
        <Text style={styles.textstyle2} >{this.state.lang.indexOf('ar') != -1 ?'ارسال شكوي':' Report a Problem' } </Text>
      </View>
</TouchableOpacity>
  :<View style={{display:'none'}}></View>}
  </View>
  <View style={{flexDirection:'column',width:'100%',paddingVertical:10}}>
      {this.state.userDate._id != null ?
      <TouchableOpacity
       onPress={ this.signOut.bind(this)}>
      <View style={styles.viewcontainer2}>
        <Image style={styles.imageicon}  source={require('../images/sign-out.png')} />
        <Text style={styles.textstyle2} >{this.state.lang.indexOf('ar') != -1 ?'تسجيل خروج': 'Sign Out'}  </Text>
      </View>
      </TouchableOpacity>
       :
       <TouchableOpacity
       onPress={() => {
        const { navigation } = this.props;
        navigation.push('Login');
      }}>
      <View style={styles.viewcontainer2}>
        <Image style={styles.imageicon}  source={require('../images/sign-out.png')} />
        <Text style={styles.textstyle2} >{this.state.lang.indexOf('ar') != -1 ?'تسجيل دخول':' Login '} </Text>
      </View>
      </TouchableOpacity>
       }
       </View>
        </View>
        </ScrollView>
        </ImageBackground>
      );
    }
  }
  export default MenusDetails;
 