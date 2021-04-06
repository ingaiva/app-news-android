import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon = <FontAwesome5 name={'newspaper'} size={20} color="black" />;
import * as WebBrowser from 'expo-web-browser';
 
 function handleOpenUrl() {    
      WebBrowser.openBrowserAsync('https://lebocal.academy/');    
  }

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require('../img/loading.gif')}
      style={{ width: '100%', height: '100%',resizeMode: 'cover' }}>
      <View style={styles.textContainer}>
        <Text style={styles.textWelcome} onPress={handleOpenUrl}>News Aqualas</Text>        
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textWelcome: {
    opacity:0.1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'rgba(107, 108, 108, 0.5)',
  },
});
