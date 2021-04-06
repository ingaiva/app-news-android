import * as React from 'react';
import { useState, useEffect } from 'react';

import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Account from './components/views/account';
import Actu from './components/views/actu';
import CatNews from './components/views/catNews';
import SplanshScreen from './components/splashScreen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const iconActu = ({ color }) => (
  <FontAwesome5 name={'globe'} size={20} color={color} />
);
const iconCatNews = ({ color }) => (
  <FontAwesome5 name={'star'} size={20} color={color} />
);
const iconAccount = ({ color }) => (
  <FontAwesome5 name={'user'} size={20} color={color} />
);

const Drawer = createDrawerNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  if (showSplash) {
    return <SplanshScreen />;
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="actu" >
          <Drawer.Screen
            name="account"
            component={Account}
            options={{
              title: 'Connexion',
              drawerIcon: iconAccount,
            }}
          />
          <Drawer.Screen
            name="actu"
            component={Actu}
            options={{
              title: "Fil d'Actualités",
              drawerIcon: iconActu,
            }}
          />
          <Drawer.Screen
            name="catNews"
            component={CatNews}
            options={{
              title: 'Recherche',
              drawerIcon: iconCatNews,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
