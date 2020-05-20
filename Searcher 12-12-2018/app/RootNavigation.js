import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import SplashScreen   from './Splash';
 import React,{Component} from 'React';
 import LoginForm   from './LoginForm';


// import LoginForm   from './LoginForm';
import Register   from './Register';
// import HomeScreen from './HOME/HomeScreen';
// import React,{Component} from 'React';
// import Icon  from 'react-native-vector-icons/Ionicons';
import EditProfileScreen from './Home/menu/EditProfileScreen';
import TermsScreen from './Home/menu/Terms';
import Searchpage from './Home/search-/Searchpage';
import mostSearch from './Home/MostDetails/mostSearch';

import SearchDetails from './Home/search-/SearchDetails';


import ReportScreen from './Home/menu/Report'
import AboutApp from './Home/menu/AboutApp';
import ContacUs from './Home/menu/ContactUs';
// import MedicalTips from './HOME/MedicalTips';
// import Searches from './Home/Searches';
// import Articals from './HOME/Articals';
// import articleDetails from './HOME/articleDetails';
import MenusDetails from './Home/MenusDetails';
import addrequest from './Home/request/addrequest';
import Oldquestions from './Home/request/Oldquestions';

import Req from './Home/request/Request';
// import Evaluate from './HOME/evaluationScreen';
import ReqDetails from './Home/request/RequestDetails';
// import hospital from './HOME/search-/HospitalDetails'
// import hospitalProfile from './HOME/search-/hospitalProfile'


// const articalstack = createStackNavigator({
//   articales: { screen: Articals,
//   },
//   articleDeat: { screen: articleDetails,
//   },
//   Requestdet: {
//     screen: ReqDetails,
//     headerMode: 'none',
//     headerVisible:false
//   },
//   request2: { screen: Req,
//   },
// });
// const MedicalTip = createStackNavigator({
//   tips: { screen: MedicalTips,
//   },
 
// });
const HomeStack = createStackNavigator({
  home: { screen: addrequest,
  },
  Requestdet: {
    screen: ReqDetails,
    headerMode: 'none',
    headerVisible:false
  },
  request2: { screen: Req,
  }
  ,  oldquestion: { screen:Oldquestions ,
  }
});
const Searchstack=createStackNavigator({
  searches:{screen:Searchpage,
},

searchdetails:{screen:SearchDetails,
  
    },
  //   hospitalProfile:{screen:SearchDetails,
  //     navigationOptions: {
  //       title: 'Hospital SearchDetails'
  //     }
  //     },
  //     evaluate:{ 
  //       screen:Evaluate,
  //       navigationOptions: { title: 'Rate'}
  //      },
});
const MostSearchstack=createStackNavigator({
  mostsearches:{screen:mostSearch,
},
topsearches:{screen:Searchpage,
},

topsearchdetails:{screen:SearchDetails,
  
    },
searchdetails:{screen:SearchDetails,
  
    },
  
});
const MenuStack = createStackNavigator({
  Menus2: 
  {screen:MenusDetails,
    navigationOptions: { title: 'Menu',
    alignSelf: 'center',
    titleStyle: {
      alignSelf: 'center',

      color: 'red',
      align: 'center',
      textAlign:'center',
      fontFamily: 'MuseoSansRounded-300',
      fontWeight: '500'
    }
  }},

  editprofile:{ 
    screen:EditProfileScreen,
    navigationOptions: { title: 'Editinfo' } 
  },


    aboutapp:{ 
      screen:AboutApp,
      navigationOptions: { title: 'About App'}
     },

     contactus:{ 
      screen:ContacUs,
      navigationOptions: { title: 'Contact Us'}
     },

     terms:{ 
      screen:TermsScreen,
      navigationOptions: { title: 'Terms & Conditions'}
     },

     report:{ 
      screen:ReportScreen,
      navigationOptions: { title: 'Report A Problem'}
     },
   
});

 const RootBootom=createBottomTabNavigator(
  {
    Menus2: {screen:MenuStack,
  
      navigationOptions: () => ({
     
       
        tabBarIcon: ({focused}) => (
          <Image
          style={{ width: 20, height:20 }}
              source={
                focused ? require('./images/menu-button-of-three-horizontal-lines2.png'):require('./images/menu-button-of-three-horizontal-lines1.png') }/>)
        //   tabBarIcon: ({tintColor}) => (
        //     <Icon
        //         name="home"
        //         color={tintColor}
        //         size={24}
        //     />
        // )
    })},
    Search:{screen:Searchstack,
      navigationOptions: () => ({
        
     
       
        tabBarIcon:({focused}) => (
           <Image
           style={{ width: 30, height:30 }}
           source={ focused ? require('./images/home2.png'): require('./images/home.png')}/>)
        //    tabBarIcon: ({tintColor}) => (
        //      <Icon
        //          name="medicaltips"
        //          color={tintColor}
        //          size={24}
        //      />
        //  )
     }) }, 
     mostSearch:{screen:MostSearchstack,
      navigationOptions: () => ({
     
       
        tabBarIcon:({focused}) => (
           <Image
           style={{ width: 30, height:30 }}
           source={ focused ? require('./images/mostsearch.png'): require('./images/mostsearch2.png')}/>)
        //    tabBarIcon: ({tintColor}) => (
        //      <Icon
        //          name="medicaltips"
        //          color={tintColor}
        //          size={24}
        //      />
        //  )
     }) }, 
    home: {screen:HomeStack,
      
      navigationOptions: (navigation) => ({
     
       
        tabBarIcon:({focused}) => (
           <Image
           style={{ width: 30, height:30 }}
               source={  focused ? require('./images/speech_bubble.png'):require('./images/speech_bubble2.png')}/>)
          //  tabBarIcon: ({tintColor}) => (
          //    <Icon
           
          //        name="ios-airplane"
          //        color={tintColor}
          //        size={24}
          //    />
        // )
     })
   },   
 
   
  //   articals:{screen:articalstack,
  //     navigationOptions: (navigation) => ({
        
       
  //       tabBarIcon:({focused}) => (
  //         <Image
  //         style={{ width: 20, height:20 }}
          
  //             source={ focused ? require('./images/article2.png'): require('./images/article.png')}/>)
          
  //   })
  // },

   
   
  //  tips:{screen:MedicalTip,
  //     navigationOptions: (navigation) => ({
     
       
  //       tabBarIcon:({focused}) => (
  //         <Image
  //         style={{ width: 20, height:20 }}
  //       source={     focused ? require('./images/heartbeat2.png'):require('./images/heartbeat.png')}/>)
  //       //   tabBarIcon: ({tintColor}) => (
  //       //     <Icon
  //       //         name="home"
  //       //         color={tintColor}
  //       //         size={24}
  //       //     />
  //       // )
  //   })
  // },
    
   },{
  initialRouteName: 'Search',
  activeTintColor: '#f0edf6',
  inactiveTintColor: '#3e2465',

  barStyle: { backgroundColor: '#694fad' },
  tabBarOptions: {
   
    // pressColor: 'rgb(32,53,70)',
    upperCaseLabel: false,
    // activeBackgroundColor:'#89BADD',
  
      swipEnabled: true,
      showIcon: true,
        showLabel:false,
      
    
    labelStyle: {
      fontSize: 12,
      fontWeight:'bold',
       marginTop: 0,
       color :'#ffffff'
    },
    },
  }
);
const RootNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
      headerVisible: false,
    },
    headerVisible:false
  },
   
  Login: {
    screen: LoginForm,
    headerMode: 'none',
   
    navigationOptions: {
      header: null,
      headerVisible: false,
    },
    headerVisible:false
  },
  register: {
    screen: Register,
  },
  home: {
   screen: RootBootom,
 //  screen: addrequest,
    navigationOptions: {
     header:null,
      headerVisible: false,
    },
    headerVisible:false
  }
}
 );
 export default RootNavigator;

