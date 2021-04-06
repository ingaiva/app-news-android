import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const iconMenu = <FontAwesome5 name={'bars'} size={20} color="white" />;
const iconLogout = (
  <FontAwesome5
    name={'sign-out-alt'}
    size={20}
    color="white"
    style={{ marginHorizontal: 8 }}
  />
);
const iconAccount = <FontAwesome5 name={'user'} size={20} color="white" />;

import GenStyles from '../../generalStyles';
import * as outils from '../../outils';

export default function Account(props) {
  const storageKey = '@bocal:newsAqualas-usr';
  const [user, setUser] = useState(outils.getEmptyUser());
  const [loginMail, setLoginMail] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let usrSavedResponse = await AsyncStorage.getItem(storageKey);
    if (usrSavedResponse) {
      setUser(JSON.parse(usrSavedResponse));
    }
  }

  function checkUser() {    
    if(!loginMail){
      setError("Le mail et le mot de passe sont obligatoires");
      return false
    }
    if(!loginPwd){
       setError("Le mail et le mot de passe sont obligatoires");
       return false
    }
    if(loginMail.length==0){
       setError("Le mail et le mot de passe sont obligatoires");
      return false
    } else if(loginPwd.length==0){
       setError("Le mail et le mot de passe sont obligatoires");
       return false
    }
    return true
  }

  async function getUser() {
    if (!checkUser()){
      return;
    }
    let url = `https://reqres.in/api/register`;

    try {
      const responsePromise = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginMail.toLowerCase().trim(),
          password: loginPwd.trim(),
        }),
      });
      const responseData = await responsePromise.json();

      if (responseData instanceof Error) {
        console.log('Une erreur instanceof Error : ' + responseData?.message);
        setError(responseData?.message);
        setUser(outils.getEmptyUser());
      } else {
        var myInit = { method: 'GET' };
        const responsePromise2 = await fetch(
          `https://reqres.in/api/users/${responseData?.id}`,
          myInit
        );
        const responseData2 = await responsePromise2.json();

        if (responseData2.hasOwnProperty('data')) {
          let _usr = responseData2.data;
          _usr.isConnected = true;
          setUser(_usr);
          setError('');
          AsyncStorage.setItem(storageKey, JSON.stringify(_usr));
        } else {
          setError('Utilisateur non trouvé, vérifiez vos identifiants');
          setUser(outils.getEmptyUser());
        }
      }
    } catch (er) {
      console.log('Une erreur : ' + er);
      setError("Une erreur s'est produite : " + er.message);
      setUser(outils.getEmptyUser());
    }
  }

  function renderAvatar() {
    if (user.avatar) {
      return <Image style={styles.avatarImage} source={{ uri: user.avatar }} />;
    }
  }

  async function logout() {
    AsyncStorage.removeItem(storageKey);
    setLoginMail('');
    setLoginPwd('');
    setUser(outils.getEmptyUser());
    setError('');
  }

  function showConnectedUser() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.texteUser}>{user.first_name}</Text>
          <Text style={styles.texteUser}>{user.last_name}</Text>
        </View>
        <Text style={styles.texteUser}>Mail : {user.email}</Text>
        <View style={{ justifyContent: 'center' }}>{renderAvatar()}</View>
        <View>
          <TouchableOpacity style={styles.buttonLink} onPress={logout}>
            <Text style={GenStyles.buttonText}>Déconnexion {iconLogout}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function showLogin() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: 'tomato', letterSpacing: 2 }}>
          Email :
        </Text>
        <TextInput
          value={loginMail}
          onChangeText={(username) => setLoginMail(username)}
          placeholder="Email"
          style={styles.input}
        />
        <Text style={{ fontSize: 18, color: 'tomato', letterSpacing: 2 }}>
          Mot de passe :
        </Text>
        <TextInput
          value={loginPwd}
          onChangeText={(password) => setLoginPwd(password)}
          placeholder="Mot de passe"
          secureTextEntry={true}
          style={styles.input}
        />

        <TouchableOpacity style={GenStyles.button} onPress={getUser}>
          <Text style={GenStyles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function showMenu() {
    props.navigation.openDrawer();
  }
  function render() {
    if (user && user.isConnected) {
      return showConnectedUser();
    } else {
      return showLogin();
    }
  }
  return (
    <View style={styles.container}>
      <View style={GenStyles.titreViewContainer}>
        <TouchableOpacity style={GenStyles.button} onPress={showMenu}>
          {iconMenu}
        </TouchableOpacity>
        <Text style={GenStyles.titreText}> {iconAccount} Utilisateur</Text>
      </View>
      {render()}
      <View style={{ marginVertical: 30 }}>
        <Text style={GenStyles.errorText}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  texteUser: {
    fontSize: 18,
    marginHorizontal: 5,
    marginVertical: 3,
    color: '#5d5f60',
    letterSpacing: 2,
  },
  buttonLink: {
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#5d5f60',
    backgroundColor: '#5d5f60',
    alignItems: 'center',
  },
  input: {
    fontSize: 22,
    width: 220,
    //height: 44,
    padding: 5,
    borderWidth: 1,
    borderColor: 'tomato',
    color: 'tomato',
    marginBottom: 10,
  },
  avatarImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 5,
  },
});
