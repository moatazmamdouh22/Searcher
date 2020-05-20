import React, { Component } from 'react';
import { StatusBar,AsyncStorage,Dimensions,View,Button,Image,ActivityIndicator, FlatList,Alert,NetInfo,Text,BackHandler,TouchableWithoutFeedback, TouchableOpacity,ScrollView,Picker,StyleSheet,TextInput,ImageBackground,RefreshControl} from 'react-native';
import Styles from '../myStyles';
// import Icon  from 'react-native-vector-icons/Ionicons';
import { SearchBar,Icon } from 'react-native-elements'
import Autocomplete from 'react-native-autocomplete-input';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import RNPickerSelect from 'react-native-picker-select';
import PopupDialog from 'react-native-popup-dialog';
import SearchHeader from 'react-native-search-header';
 
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
class Searchpage extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
    constructor(props) {
        super(props);
        this.state ={
            status:true,
            pressStatus: false ,
            places:[],
            data: [],
            requests:[],
            query: '',
            url:'',
            result2:[],
            categories:[],
            countries:[],
            flag:0,
            cities:[],
            searchtitle:'',
            recentSearch:[],
            categoryID:'',
            countryID:'',
            cityID:'',
            chechAnswer :1,
            serchID:'',
            lang: DeviceInfo.getDeviceLocale()
          }
          this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
          BackHandler.addEventListener('hardwareBackPress', this.onBackClicked)
        );
        this.onBackClicked =this.onBackClicked.bind(this);
        this.getrecent =this.getrecent.bind(this);
      }
      _onHideUnderlay(){
        this.setState({ pressStatus: false });
      }
      _onShowUnderlay(){
        this.setState({ pressStatus: true });
      }
      onClassidication() {
        this.popupDialog.show();
      }
      getUserData = async () =>{
        this.setState({flag:0});
        const value = await AsyncStorage.getItem('loginDataClinic');
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected)
          {
        
     
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
      onNavigate(){
                const { navigation } = this.props;
        const searchID = navigation.getParam('searchID', 'NO-ID');
      
        if(searchID!='NO-ID'){
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show('أنتظر من فضلك');
          }
          else {
            this.setState({flag:1});
            Toast.show('Please Wait');
          }
    
        const obj ={
          val:searchID,
          
        }
    
       fetch('http://142.93.99.0/api/user/searchData/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }) .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.message){
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show('هناك خطأ ما و سيتم حل المشكلة سريعا');
          }
          else {
            this.setState({flag:1});
            Toast.show('Sorry but there are some problems but they will solve quickly');
          }
        }else{
        this.setState({searchtitle:searchID})
         const requests = responseJson;
         this.setState({result2:requests});
         const rs =[];
      
         
                                     this.setState({chechAnswer:2})
        }
            
          }) .catch((error) => {
console.error(error);
});
      }
      }
      componentDidMount() {
        this.onNavigate();
this.getrecent();
        this.getUserData();
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked)
      );
      BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);


     }
     componentWillUnmount() {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
      
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    }
  
      closeDialog() {
        this.setState({flag:0});
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected)
          {
        
        }else{
          if(this.state.lang.indexOf('ar') != -1 ){
            this.setState({flag:1});
            Toast.show('عذرا لا يوجد أتصال بالانترنت' );
          }
          else {
            this.setState({flag:1});
            Toast.show('Sorry No Internet Connection');
          }          }
        })
      // alert(filter.length);
      this.setState({flag:1});
      this.popupDialog.dismiss();
      }
      goDetails(){
        this.props.navigation.navigate('searchdetails',{
          searchID: i.url,
          title:searchtitle,
          // categoryTitleAR:item.titleAr,
          // categoryTitleEN:item.titleEN,
          // otherParam: 'anything you want here',
        });
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
             >{DeviceInfo.getDeviceLocale().indexOf('ar') != -1 ? 'بحث' :'Search'}</Text>
         </View>
           ),
      //  headerRight: (<View/>)
      };

      onBackClicked=()=>{
        // if(this.props.navigation.state.routeName == 'Search'){
        //   Toast.show(this.props.navigation.state.routeName);
        //add willmount
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
        //     else{return false;}
        //   }
        getrecent = async ()=>{
          const value = await AsyncStorage.getItem('recentSearch');
          if(value){
          
            const recentSearch =JSON.parse(value);
            this.setState({recentSearch});
          
          }
        }
        recentSearch = async (txt)=>{
         
          try { const value = await AsyncStorage.getItem('recentSearch');
          if(value){
           
            const data =JSON.parse(value);
            data.push(txt);
            AsyncStorage.removeItem('recentSearch');
            await AsyncStorage.setItem('recentSearch',JSON.stringify(data));
            const valueSearch = await AsyncStorage.getItem('recentSearch');
            const recentSearch =JSON.parse(valueSearch);
            this.setState({recentSearch});
          }else{
     
            try {
              const arr =[txt]
              await AsyncStorage.setItem('recentSearch', JSON.stringify(arr));
              const valueSearch = await AsyncStorage.getItem('recentSearch');
              const recentSearch =JSON.parse(valueSearch);
              this.setState({recentSearch});
            } catch (error) {
              Toast.show('4546546')

            }
            
          }
        } catch (error) {
         
            const arr =[];
            arr.push(txt);
            await AsyncStorage.setItem('recentSearch', JSON.stringify(arr));
            const valueSearch = await AsyncStorage.getItem('recentSearch');
            const recentSearch =JSON.parse(valueSearch);
            this.setState({recentSearch});
         
         
        }
        }
    
    
    render() {
      const { query } = this.state;
      //Toast.show(searchID);
// this.onNavigate();
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
          <ImageBackground style={{flex:1,}} source={require('../../images/backgroundsearcher.png')}> 
            
                       <View style={{flex:1,flexDirection:'column'}}>
              

             
                <View style = {{ width:DEVICE_WIDTH }}/>
                <View style = { styles.header }>
                    <Button
                     
                     color="rgb(52,204,204)"
                        title="Search"
                        onPress = {() => this.searchHeader.show()}
                    />
                </View>
                <SearchHeader
                    ref = {(searchHeader) => {
                        this.searchHeader = searchHeader;
                    }}
                    placeholder = 'Search...'
                    placeholderColor = 'gray'
                    onClear = {() => {
                        console.log(`Clearing input!`);
                    }}
                   
                    onGetAutocompletions = {async (text) => {
                        if (text) {
      //                     fetch('http://suggestqueries.google.com/complete/search?client=firefox&q='+text)
      //                     .then((response) => response.json())
      //                     .then((responseJson) => { 
      //                       // alert('4');

      //                       const data  = responseJson;
      //                       // alert('1');
      //                       return data[1];
      //                      })
      // .catch((error) => {
      //   alert(error);

      // });
      const regex = new RegExp(`${text.trim()}`, 'i');
                            const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${regex}`, {
                                method: `get`
                            });
                            const data = await response.json();


                            return data[1];

                        } else {
                          // alert('3');

                            return [];
                        }
                    }}
                    onSearch = {(event) => {
                      const obj ={
                        val:event.nativeEvent.text,
                        
                      }
                   this.recentSearch(event.nativeEvent.text);
                  
                     fetch('http://142.93.99.0/api/user/searchData/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(obj),
                    }) .then((response) => response.json())
                    .then((responseJson) => {
                      if(responseJson.message){
                        if(this.state.lang.indexOf('ar') != -1 ){
                          this.setState({flag:1});
                          Toast.show('هناك خطأ ما وسيتم حل المشكلة سريعا');
                        }
                        else {
                          this.setState({flag:1});
                          Toast.show('Sorry but there are some problems but they will solve quickly');
                        }
                       }else{
                        this.setState({searchtitle:event.nativeEvent.text})
                        const requests = responseJson;
                     
                        this.setState({result2:requests});
                        const rs =[];
                        this.searchHeader.clear()
 
                                                     this.searchHeader.hide()
                        
                                                    this.setState({chechAnswer:2})
                       }
                                                                            //  if(requests.text== '{"message":"no data found"}'){
//                             // if(this.state.lang.indexOf('ar') != -1 ){
//                             //   this.setState({flag:1});
//                             //   Toast.show('لاتوجد نتائج لبحثك حاليا');
//                             //   this.searchHeader.clear()

//                             //   this.searchHeader.hide()

//                             // }
//                             // else {
//                             //   this.setState({flag:1});
//                             //   Toast.show('there is no any result for your search now');
//                             //   this.searchHeader.clear()
//                             //   this.searchHeader.hide()
                           

//                             // }
//                           }else{
//                             this.searchHeader.clear()

//                             this.searchHeader.hide()

//                             this.setState({chechAnswer:2})
  
  
//   this.setState({searchtitle:event.nativeEvent.text})

// this.setState({ requests:requests});
//                           }
                      
                          
                        }) .catch((error) => {
              console.error(error);
            });
                  }}
                />
                {this.state.chechAnswer == 2?
               
                  <ScrollView style={{flex:1,width:'100%',marginTop:30}}  > 

         {
                   this.state.result2.map((i, index) => (
                     <View key={index} >
                <TouchableOpacity   onPress ={() => {
        this.props.navigation.navigate('searchdetails',{
          searchID: i.url,
          title:this.state.searchtitle,
          // categoryTitleAR:item.titleAr,
          // categoryTitleEN:item.titleEN,
          // otherParam: 'anything you want here',
        });
      }}>
                 <View 
                         style={{borderWidth:1,borderRadius:7,backgroundColor:"#eeeeee", borderColor:"rgb(51,204,204)" ,marginTop:8,flexDirection:'column',marginHorizontal:'5%',width:'90%',alignItems:'center',}}>
                       
                  
                  <View  style={{flexDirection:'row'}}>
                  
                  {/* <View style={{ width:'30%',backgroundColor:"rgb(51,204,204)",borderColor:"rgb(51,204,204)",borderWidth:.5,borderRadius:5,alignItems:'center',marginHorizontal:5}}
                      >
                      <Text
                        style={{color:'black',textAlign:'center'}}
                     >
                   {this.state.lang.indexOf('ar') != -1 ?'الإسلام':'Islam'}

                     </Text>
                      </View>   */}
                        <Text style={[Styles.vendorBtnText,{width:'100%',textAlign:'center',paddingLeft:5,paddingRight:5}]}>  {this.state.searchtitle}</Text>  
                        {/* <View style={{width:'30%'}}></View> */}
                            </View>   
                 
                   <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:'85%',marginHorizontal:'7%'}}> 
                  
                     <Text  style={{width:'100%'
                     ,fontSize:14,fontWeight:'bold',textAlign:'center',color:"#000"}}> {i.text}</Text>
                     </View>
                   </View>
                  
                  </View>
                  
                  </TouchableOpacity>
                  </View>
                     ))}
                     </ScrollView>
                 :<View  style={{marginTop:20, height:'90%',width:'100%'}}> 
                    <ScrollView style={{flex:1,width:'100%'}}>
                 {this.state.recentSearch.map((i, index) => (
                    <View key={index}  style={[Styles.container2,{height:35,flexDirection:'row',alignItems:'center'}]}>
                    <TouchableOpacity 
                  style={[Styles.vendorBtnBG,{width:'70%',marginStart:5,justifyContent: 'center',borderRadius:20,backgroundColor:'#eeeeee'}]}
                  onPress={() => {
                  
                    const obj ={
                      val:i,
                      
                    }
          
                
                   fetch('http://142.93.99.0/api/user/searchData/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                  }) .then((response) => response.json())
                  .then((responseJson) => {
                    if(responseJson.message){
                      if(this.state.lang.indexOf('ar') != -1 ){
                        this.setState({flag:1});
                        Toast.show('هناك خطأ ما وسيتم حل المشكلة سريعا');
                      }
                      else {
                        this.setState({flag:1});
                        Toast.show('Sorry but there are some problems but they will solve quickly');
                      }
                     }else{
                      this.setState({searchtitle:i})
                      const requests = responseJson;
                   
                      this.setState({result2:requests});
                      const rs =[];
                      this.searchHeader.clear()

                                                   this.searchHeader.hide()
                      
                                                  this.setState({chechAnswer:2})
                                             }   }) .catch((error) => {
                                                  console.error(error);
                                                });
                                                      }}
                  >
              
               <View style={{width:'100%',alignItems:'center'}}>
             
               <View style={{ width:'100%'}}>
                 <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:"#000"}}>{i}</Text>
               </View>
               </View>
                  </TouchableOpacity>
                  </View>
                  ) )}
          </ScrollView></View>}
               
                 {/* <View style={{width:'100%',height:'14%',marginTop:10,alignItems:'center'}}>
                 <TouchableOpacity
                 style={ this.state.pressStatus ? styles.buttonPress : styles.button }
                 onHideUnderlay={this._onHideUnderlay.bind(this)}
                 onShowUnderlay={this._onShowUnderlay.bind(this)} 
                 style={{ width:'30%',height:'100%'}} 
                 onPress={this.onClassidication.bind(this)}   >
                   <Text style={styles.buttonstyl}> {this.state.lang.indexOf('ar') != -1 ?' تصنيف' :'Filter'}</Text>
                   </TouchableOpacity>
                   </View>
              <PopupDialog 
                    dialogStyle={{borderWidth:2,width:'90%',height:'50%',borderColor:"rgb(52,204,204)"}}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                   <View style={{alignItems:'center',justifyContent:'center'}}>
                      <View style={{width:'70%', marginBottom:60,marginTop:8,height:48,borderColor:"#000",borderWidth:1,borderRadius:5,marginLeft:"1%",marginRight:"1%"} }>  
                      <RNPickerSelect
                      placeholder={{label:this.state.lang.indexOf('ar') != -1?'الديانة':'Religion',value:0,key:0, color: '#000'}}
                      hideIcon = {true}
                      mode = 'dialog'
                      items = {this.state.categories}
                      onValueChange = {(categoryID) => 
                        {
                          this.setState({ categoryID: categoryID })
                      }}
                            style={{color: '#000',width:'100%',textAlign:'center', alignItems:'center',justifyContent:'center',fontSize:15, height:'100%',placeholderColor: '#000'}}/>

    </View>
   
   
    <TouchableOpacity
     onPress={this.closeDialog.bind(this)}
    style={{marginTop:10,width:'25%',height:'35%',justifyContent:'center',}} >
    <Text style={{borderRadius:15,marginBottom:17,width:'100%',borderColor:"black",textAlign:'center',backgroundColor:"rgb(52,204,204)",borderWidth:1,fontWeight: 'bold',color:"#000",fontSize:20,fontStyle:'normal'}}  >
                    {this.state.lang.indexOf('ar') != -1?'تم':'Done '}
                  </Text>
    </TouchableOpacity>
    </View>
  </PopupDialog>
  */}
 
 
                   </View>
                  
            </ImageBackground>
        );
    }
}
export default Searchpage;