import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    Alert,NetInfo,
    ImageBackground,
    TouchableOpacity,
    Image,    SafeAreaView,
    AsyncStorage,
    RefreshControl,
    Text,


    ActivityIndicator
  
  } from 'react-native';
  import React, { Component } from 'react';
  import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import Styles from '../myStyles';
  
import Modal from 'react-native-modalbox';

import Button from 'react-native-button';

  
   class Report extends Component {
     constructor(){
       super();
       this.state={
        flag:0,

        request:{},
        requestanswer:[],

        title:'',
        postID:'',
        ancomment:'',
        userDataFlag:false,
        anname:'',
        andate:'',
        userDate:{},
        userImg:'http://178.128.37.73/ProfilePicture.jpg',
        field:'',
        date:'',
        fullname:'',
        description:'',
        userID:'skip',
        comment:'',
        chechAnswer :1,
        heightStyle:'38%',
        refreshing: false,
        
        lang: DeviceInfo.getDeviceLocale()

       }
     }
     onRefresh() {
      this.setState({ refreshing: true }, function() {this.componentDidMount()});
    }
    static navigationOptions = {
      headerStyle: { backgroundColor:  '#F2F2F2',height:40 },
     headerTitle: () => (
       <View style={{flex:1}}>
         <Text
           adjustsFontSizeToFit
          //  style={{
          //   fontSize:20,
          //   // textAlign: 'center', // ok
          //   // alignSelf: 'center',
          //   // marginLeft:'15%',
          //   textAlign:'center',
          //   width:'100%',
          //   fontFamily: 'MuseoSansRounded-300',
          //   fontWeight: '300',
          //   // marginRight:'25%',
          //   justifyContent: 'center',
          //   color:'#000' // ok
          //  }}
          style={{
            fontSize:14,
 
          
            // marginLeft:'15%',
            // fontFamily: 'MuseoSansRounded-300',
            // fontWeight: '300',
            // marginRight:'25%',
            color:'#000' // ok
           }}
           >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'تفاصيل السؤال' :'Question Details'}
           </Text>
       </View>
         ),
     headerRight: (<View/>)
    };
    getUserData = async () =>{
      const value = await AsyncStorage.getItem('loginDataClinic');

      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {

      const { navigation } = this.props;
      const questionID = navigation.getParam('questionID', 'NO-ID');
      this.setState({postID:questionID});
      fetch('http://142.93.99.0/api/user/getPostByID?id='+questionID)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({flag:1});
         const request = responseJson;
        
         try{
         this.setState({ request });
         if(value){
       
          const data =JSON.parse(value);
          this.setState({userDate:data});
          this.setState({userDataFlag:true});

          this.setState({userID:data._id});
        
          //uncomment
          if(this.state.request.userID._id == this.state.userID){
            this.setState({chechAnswer:2,
            heightStyle:'48%'
            })
          }
        
        }
        }catch(err){}
        var d =request.createdAt;
        var dateee =d.substring(0,d.indexOf('T'));
        var time =d.substring(d.indexOf('T')+1,d.indexOf('.'));
        try{
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({ title:request.title });
          }
          else {
            this.setState({ title:request.title });
          }   
        }catch(err){}
        try{
          if(request.userID.personalImg){
            this.setState({userImg:request.userID.personalImg})
         }
        }catch(err){}
        try{
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({ description:request.description });
          }
          else {
            this.setState({ description:request.description });
          }   
        }catch(err){}
        try{
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({ field:request.fieldID.titleAr });
          }
          else {
            this.setState({ field:request.fieldID.titleEN });
          }   
        }catch(err){}
        try{
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({ fullname:request.userID.fullname });
          }
          else {
            this.setState({ fullname:request.userID.fullname });
          }   
        }catch(err){}
        try{
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({ date:dateee });
          }
          else {
            this.setState({ date:dateee });
          }   
         }catch(err){}
        
         

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
    getAnswers = async () =>{

      const value = await AsyncStorage.getItem('loginDataClinic');
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {
      const { navigation } = this.props;
      const questionID = navigation.getParam('questionID', 'NO-ID');
      fetch('http://142.93.99.0/api/user/postReviews?postID='+questionID)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({flag:1});

         const requestanswer = responseJson;
         const rs =[];
  
         if(this.state.lang.indexOf('ar') != -1){
          requestanswer.forEach(element => {
            var d =element.createdAt;
          var date =d.substring(0,d.indexOf('T'));
          var time =d.substring(d.indexOf('T')+1,d.indexOf('.'));
          rs.push({
            ancomment:element.comment ,id:element._id,andate:date,anname:element.userID.fullname
          })
          });
         }else{
          requestanswer.forEach(element => {
            var d =element.createdAt;
            var date =d.substring(0,d.indexOf('T'));
            var time =d.substring(d.indexOf('T')+1,d.indexOf('.'));
            rs.push({
              ancomment:element.comment ,id:element._id,andate:date,anname:element.userID.fullname
            })
          });
         }
       
      
        this.setState({ requestanswer:rs});
     
      })
      .catch((error) => {
        this.setState({flag:1});

       
      
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
    answerprees = async () =>{


      const value = await AsyncStorage.getItem('loginDataClinic');
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {
      
      if(value){
      this.refs.modal3.open()
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
    }})
    }
    
    componentDidMount() {
      this.setState({flag:0});

    this.getUserData();
    this.getAnswers();
    this.setState({ refreshing: false })

    }
  
    render() {
      return (
     

        <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
      {this.state.flag != 0 ?
      <View style={{flex:1,}}>
          <View  style={{flexDirection:'row',width:'96%',height:'18%',marginHorizontal:'2%'}}  >
          <Image style={{marginTop:'5%',marginStart:'1%',marginBottom:'3%',
                    width:'20%',backgroundColor:'black'
                     }}  resizeMode="stretch" source={{uri:this.state.userImg}} />

          <Text style={{marginTop:'10%',marginHorizontal:'3%', width:'46%',textAlign:'justify'}} >
          {this.state.fullname}
          </Text>
          <View style={{flexDirection:'column',width:'25%',alignItems:'center'}} >
          <Text style={[Styles.vendorBtnText,{textAlign:'left',paddingLeft:5,paddingRight:5,marginTop:'10%'}]}>          {this.state.date}
</Text>
          <View style={{width:"95%",backgroundColor:"rgb(51,204,204)",borderColor:"rgb(51,204,204)",borderWidth:.5,borderRadius:3,marginHorizontal:'5%',alignItems:'center',marginTop:'10%'}}
               
                      >
                      <Text
                        style={{color:'black',textAlign:'center'}}
                     >
                              {this.state.field}

                     </Text>
                      </View>
          </View>
          </View>
          <View style={{alignItems:'center',width:'100%',height:'7%'}} >
             <View style={{height:'98%',width:"80%",backgroundColor:"rgb(51,204,204)",borderColor:"rgb(51,204,204)",borderWidth:.5,borderRadius:3,alignItems:'center',}}
               
               >
               <Text
                 style={{color:'black',textAlign:'center'}}
              >
                       {this.state.title}

              </Text>
               </View>
               </View>

                 <View style={{ height:'25%', justifyContent: 'center', alignItems:'center',width:'100%'}}>
            <Text
             multiline={true} style={{ width: '92%',height:'95%', borderWidth: 1,alignItems:'center', borderRadius: 5, borderColor: '#000', backgroundColor: 'white', textAlign: 'center', }} 
             placeholder={this.state.lang.indexOf('ar') != -1?'أكتب السؤال ' :"Type Your Question ..."} 
             
             >          {this.state.description}
             </Text>
          </View>
          
<View style={{height:this.state.heightStyle,width:'100%'}}>
<ScrollView style={{height:'100%',width:'100%'}} refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
          />}>

                      {this.state.requestanswer.map((i, index) => (
                        <View key={i.id} 
                         style={{flex: 1,borderBottomWidth:1,borderRadius:7, borderStyle: 'dashed',marginTop:10,flexDirection:'column',marginHorizontal:'5%',width:'90%',alignItems:'center',backgroundColor:'#eeeeee'}}>
                       
                  
                  <View  style={{flexDirection:'row'}}>
                  
                        <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'left',paddingLeft:5,paddingRight:5}]}> {i.andate}</Text>
                        <Text style={[Styles.vendorBtnText,{width:'50%',textAlign:'right',paddingLeft:5,paddingRight:5}]}>  {i.anname}</Text>  
                            </View>   
                 
                   <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:'85%',marginHorizontal:'7%'}}>
                  
                     <Text  style={{width:'100%'
                     ,fontSize:14,fontWeight:'bold',textAlign:'center',color:"#000"}}>{i.ancomment}</Text>
                   </View>
                  
                   </View>
                  
                 
                                      </View>
                        ))}
                      </ScrollView>
</View>
{this.state.chechAnswer == 1?
  <View style={{flexDirection:'column',height:'10%', alignItems:'center',justifyContent:'center', marginTop:'1%',marginBottom:'1%',width:'100%',}}>

 <TouchableOpacity style={{borderWidth:.5,borderRadius:15,borderColor:'black',backgroundColor:'rgb(51,204,204)',alignItems:'center', width:'35%'}} 
  //    onPress={() => }
      onPress={this.answerprees.bind(this)}
        >
            <Text style={{ fontSize:18,color:'#000' }}> 
            {this.state.lang.indexOf('ar')!=-1 ? 'الرد':'Answer'} </Text></TouchableOpacity>
</View>
  :<View style={{display:'none'}}></View>}

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
              
                    <Text style={{ fontSize:17,width:'90%',textAlign:'center',color:'#000'}}>{this.state.lang.indexOf('ar') != -1 ?'أكتب ردك' :'Write Your Answer'}</Text>
                      
                    <View style={{ width: '70%',  marginTop:20,}} >
                         <TextInput style={{ fontSize:15,borderWidth:.5,borderColor:'#000'}}
                          onChangeText={(comment) => this.setState({ comment  }) }
                          multiline={true}
                          maxLength={140}
                         placeholder={this.state.lang.indexOf('ar') != -1 ?'أكتب ردك' :'Write Your Answer'}></TextInput>
                    </View>
          <Button onPress={() => {
            if(this.state.comment){
              this.setState({flag:0});

              NetInfo.isConnected.fetch().then(isConnected => {
                if(isConnected)
                {
                  
                  // const value2 = await AsyncStorage.getItem('loginDataClinic');
                  if(this.state.userDataFlag == true){
      
                    const obj ={
                      postID:this.state.postID,
                      userID:this.state.userDate._id,
                      comment:this.state.comment,
                 
                    }
             
                
                    fetch('http://142.93.99.0/api/user/addPostReciew/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(obj),
                    }).then((response) => response.json())
                        .then((responseJson) => {
                          this.setState({flag:1});


                          this.getAnswers();
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
                        })
                  
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
                }

                
    }else{
      if(this.state.lang.indexOf('ar') != -1 ){
        this.setState({flag:1});

        Toast.show('عذرا لا يوجد أتصال بالانترنت' );
      }
      else {
        this.setState({flag:1});

        Toast.show('Sorry No Internet Connection');
      }
      
      this.refs.modal3.close()
      }
    })
                  
          
        }else{
          if(this.state.lang.indexOf('ar') != -1 ){
            Toast.show('يجب أدخال الإجابة ' );
          }
          else {
            Toast.show('Please Enter Answer');
          }
        }
          

          }} style={{
             fontSize: 20,
             marginTop: 20,
             backgroundColor: "rgb(51,204,204)",
             color: "black",
             paddingHorizontal: 30,    
             paddingVertical:2,
             borderRadius:7,
             borderWidth:.5,
             borderColor:"#000",
          }}>{this.state.lang.indexOf('ar') != -1 ?' نشر' :'Share'}</Button>
        </Modal>
        </View>
         :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
         <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}
        </ImageBackground>
           
      );
    }
  }
  export default Report;