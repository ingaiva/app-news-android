import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 
  container: {
    //flex: 1,
    //backgroundColor: 'gray',
    // alignItems: 'flex-start',
    // alignContent:'flex-start',
    justifyContent: 'center',
  },
  titreViewContainer: {
    backgroundColor: '#5d5f60',   
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
    color:'white',
    marginTop:25
  },
  mainContainer: {
    flex: 1,
    //backgroundColor: 'gray',

    // alignItems: 'flex-start',
    // alignContent:'flex-start',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#5d5f60',
    backgroundColor: '#5d5f60',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  titreText:{
    color:'white',
    letterSpacing:2,
  },
  errorText:{
    color:'tomato',
    textAlign:'center'
  }
});
