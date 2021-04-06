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
      source={require('../img/news.jpg')}
      style={[{ width: '100%', height: '100%', resizeMode: 'cover' }]}>
      <View style={styles.textContainer}>
        <Image  source={require('../img/waiting.gif')} style={styles.imgWaiting} onPress={handleOpenUrl}></Image>
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
     borderRadius: 20,
  },
  imgWaiting: {
    width: 100,
    height: 30,
    borderRadius: 20,
    opacity: 0.3,
  },
  // textWelcome: {
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 30,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   color: 'white',
  //   borderRadius: 30,
  //   backgroundColor: 'rgba(107, 108, 108, 0.5)',
  // },
});
