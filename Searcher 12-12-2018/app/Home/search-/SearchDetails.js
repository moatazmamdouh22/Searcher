import {
   
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    NetInfo,
    SafeAreaView,
    StatusBar,
    Text,
    Image,Dimensions

  
  } from 'react-native';
  import Styles from '../myStyles';
  import Share, {ShareSheet, Button} from 'react-native-share';

    import React, { Component } from 'react';
    import Toast from 'react-native-simple-toast';
    import DeviceInfo from 'react-native-device-info';
    const DEVICE_WIDTH = Dimensions.get(`window`).width;
    const styles = StyleSheet.create({
        container: {width:'98%',height:25,borderColor:"rgb(17,119,168)",borderWidth:1,borderRadius:5,marginLeft:"1%",marginRight:"1%"},
    imageconta:{backgroundColor:"#fff",width:'50%',height:'95%',marginTop:'4%',
                               marginLeft:'1%',marginRight:'2%',borderColor:"rgb(17,119,168)",borderWidth:1,borderRadius:10},
                               buttonPress:{backgroundColor:'rgb(17,119,168)' ,color:'#fff'},
                               button:{backgroundColor:'#fff' ,color:'rgb(17,119,168)'},
                               autocompleteContainer: {
                                marginTop:6,
                                flex: 1,
                                flexDirection:'row',
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                alignItems:'center',
                                zIndex: 1,
                                marginHorizontal:20,
                                borderRadius:5,
                                borderWidth:0,
                                borderColor:"#1A9658",
                                
                              }
                              ,  container: {
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: '#f5fcff'
                            },
                            status: {
                               
                                elevation: 2,
                                width: DEVICE_WIDTH,
                                height: 21,
                                backgroundColor: '#0097a7'
                            },
                            header: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: DEVICE_WIDTH,
                                height: 56,
                               
                            },
                            label: {
                                flexGrow: 1,
                                fontSize: 20,
                                fontWeight: `600`,
                                textAlign: `left`,
                                marginVertical: 8,
                                paddingVertical: 3,
                                color: `#f5fcff`,
                                backgroundColor: `transparent`
                            },
                            button: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 130,
                                height: 40,
                                marginTop: 40,
                                borderRadius: 2,
                                backgroundColor: `#ff5722`
                            }
                            ,viewcontainner:{backgroundColor:"#fff",alignItems:'center',width:'47%',height:'95%',marginTop:'4%',marginLeft:'1%',marginRight:'2%',borderColor:"rgb(17,119,168)",flexDirection:'column',borderWidth:1,borderRadius:10},
                        buttonstyl:{fontWeight: 'bold',margin:5,textAlign:'center',borderWidth:2,borderRadius:5,borderColor:"rgb(52,204,204)",
                        fontSize:20,color:"#000"}});
  
    
     class SearchDetails extends Component {
      constructor(){
        super();
        this.state={
          terms:[],
          lang:'',
          lang: DeviceInfo.getDeviceLocale(),
          flag:0,
          title:'',
          subject:'', 
          share:1
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
               >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? ' تفاصيل البحث' :'Search Details'}</Text>
         </View>
           ),
      //  headerRight: (<View/>)
      };
      onCancel() {
        console.log("CANCEL")
        this.setState({visible:false});
      }
      onOpen() {
        console.log("OPEN")
        this.setState({visible:true});
      }
      componentDidMount() {
        this.setState({flag:0});
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected)
          {
            this.setState({flag:1});
        // const lang = DeviceInfo.getDeviceLocale();

        const { navigation } = this.props;
        const searchID = navigation.getParam('searchID', 'NO-ID');
        const title = navigation.getParam('title', 'NO-ID');
        this.setState({title:title});

        this.setState({serchID:searchID});
        fetch('http://142.93.99.0/api/user/searchDetails?id='+searchID)
        .then((res)=>{ return res.text() })
        .then((text)=>{




                        if(text== '{"message":"Something went wrong man!"}'){
                            this.setState({share:1});

                            if(this.state.lang.indexOf('ar') != -1 ){
                              this.setState({flag:1});
                              Toast.show('عفوا هذا المصدر غير متاح حاليا');
                              this.setState({
                                subject: ' عفوا هذا المصدر غير متاح حاليا برجاء حاول مع مصدر أخر'
                              });
                            }
                            else {
                              this.setState({flag:1});
                              Toast.show('Sorry this source is not available now please try with another Source');
                        
                           
                              this.setState({
                                subject: 'Sorry this source is not available now please try with another Source'
                              });
                            }
                          }else{
                          
                            this.setState({share:0}); 
          this.setState({flag:1});
          this.setState({
            subject: text
          });
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
      render() {
        let shareOptions = {
            title: "Searcher",
            message: "*أقرأ عن*"+"  "+ this.state.title+" "+"*فى تطبيق الباحث*" ,
          
            url: this.state.subject
          };
      
        
        return (
            
          <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
            {this.state.flag != 0 ?
            <View style={{flex:1}}>
            <View  style={{flexDirection:'row',marginVertical:7}}>
  
  
  <Text style={[Styles.vendorBtnText,{width:'100%',fontSize:18,textAlign:'center',paddingLeft:5,paddingRight:5}]}>{this.state.title}</Text>  

      </View>   
            <View  style={{flex:.85}}>
          
         <View 
         style={{height:'85%',borderWidth:1,borderRadius:7, borderColor:"rgb(51,204,204)" ,marginTop:40,flexDirection:'column',marginHorizontal:'5%',width:'90%',alignItems:'center',}}>
       
  
  
 
   <View style={{width:'100%',height:'95%',flexDirection:'row',alignItems:'center'}}>
   <View style={{width:'85%',height:'98%',marginHorizontal:'7%'}}>
   <ScrollView>
     <Text  style={{width:'100%'
     ,fontSize:14,fontWeight:'bold',textAlign:'center',color:"#000"}}> {this.state.subject}</Text>
       </ScrollView>
   </View>
  
  </View>
  </View>
  

  </View>
  <View style={{height:30 ,alignItems:'center',marginTop:10}}>
  <TouchableOpacity style={{borderWidth:.5,borderRadius:15,borderColor:'black',backgroundColor:'rgb(51,204,204)',alignItems:'center', width:'65%'}} 
       onPress={()=>{if(this.state.share==0){
        Share.open(shareOptions);
       }else{
        if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show('عفوا هذا المصدر غير متاح حاليا');
           
          }
          else {
            this.setState({flag:1});
            Toast.show('Sorry this source is not available now please try with another Source');
      
         
       }
      }}}
        >
            <Text style={{ fontSize:18,color:'#000' }}> 
            {this.state.lang.indexOf('ar')!=-1 ? 'مشاركة هذا المنشور':'Share this Post'} </Text></TouchableOpacity>
  </View>

  </View>
              :<View style={{alignItems:'center',height:'100%',flex:1,justifyContent:'center'}}>
                <ActivityIndicator size="large" color="rgb(51,204,204)" /></View>}
         </ImageBackground>
        );
      }
    }


    export default SearchDetails;
   