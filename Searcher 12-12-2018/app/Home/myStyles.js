import {StyleSheet } from 'react-native';


const myStyles = StyleSheet.create({
    container: {
        flex: 1,
    //    justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
      
        flexDirection:'column'
      },
//       container2: {
//         margin:10,
//       // 
//         width: '100%',
// //       
    
//      //   backgroundColor: '#000000',
//         flexDirection:'row'
//       },
container2:{
  width: '100%',

justifyContent:'center'

},

      input: {
       backgroundColor: '#dddddd',
       width: '75%',
       fontSize: 18,
       height: 43,
       paddingLeft: 5,
       color: '#000000',
       borderWidth: 1,
       borderColor: '#000000'
     },
     Pick: {
      width: '100%',
      height: 43,
      paddingLeft: 5,
      color: '#000000',
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
  backgroundColor:"rgb(26,150,88)",
  paddingHorizontal: 50,
  paddingVertical:4,
  marginHorizontal:10,
  borderRadius:5,
  },
  userBtnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#fff",
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
  borderColor:"rgb(51,204,204)",
  },
  vendorBtnBG: {
    alignItems: "center",
    width:'30%',
    backgroundColor:"#ffffff",
    borderRadius:5,
    borderWidth:1,
    borderColor:"rgb(51,204,204)",
    },
    vendorBtnBGTips: {
      alignItems: "center",
      width:'30%',
      },
    vendorBtnText: {
      fontSize:10,
  
      textAlign:'auto',
      justifyContent:'center',
      fontWeight: 'bold',
      color: 'black',
   },
});

export default myStyles;