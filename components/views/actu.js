import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const iconMenu = <FontAwesome5 name={'bars'} size={20} color="white" />;
const iconRefresh = <FontAwesome5 name={'sync'} size={15} color="white" />;
const iconActu = <FontAwesome5 name={'globe'} size={15} color="white" />;
//Imports des composants et outils 'maison'...
import GenStyles from '../../generalStyles';
import * as outils from '../../outils';
import Article from './composants/article';
import SplanshScreen from '../splashScreenLoading';

export default function Actu(props) {
  const apiKey = 'your-key';
  const [tab, setTab] = useState([]);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    getActuApi();
  }, []);

  async function getActuApi() {
    setShowSplash(true);
    let now = new Date().toLocaleDateString;
    let url = `https://newsapi.org/v2/everything?language=fr&from=${now}&q=france&apiKey=${apiKey}&pageSize=25`;

    var myInit = { method: 'GET' };
    try {
      const responsePromise = await fetch(url, myInit);
      const responseData = await responsePromise.json();

      if (responseData instanceof Error || responseData?.status === 'error') {
        console.log('Une erreur instanceof Error : ' + responseData?.message);
        setError(responseData?.message);
        setTab([]);
      } else {
        // console.log("response : " + JSON.stringify(responsePromise) + ' --responseData--: ' + JSON.stringify(responseData))
        let newActuArr = [];
        if (responseData?.articles.length > 0) {
          responseData.articles.forEach((element) => {
            newActuArr.push(outils.getArticle(element));
            if (newActuArr.length == 25) {
              return;
            }
          });
        }
        setTab(newActuArr);
      }
    } catch (er) {
      console.log('Une erreur : ' + er);
      setError("Une erreur s'est produite : " + er.message);
      setTab([]);
    }
    setShowSplash(false);
  }

  function showMenu() {
    props.navigation.openDrawer();
  }

  function renderArticles() {
    let tagBloc = [];
    tab.forEach((element) => {
      tagBloc.push(Article(element));
    });
    return tagBloc;
  }

  //rendu principal:

  if (showSplash) {
    return <SplanshScreen />;
  } else {
    return (
      <View style={styles.container}>
        <View style={GenStyles.titreViewContainer}>
          <TouchableOpacity style={GenStyles.button} onPress={showMenu}>
            {iconMenu}
          </TouchableOpacity>
          <Text style={GenStyles.titreText}>  {iconActu}  Actualités</Text>
          <TouchableOpacity style={GenStyles.button} onPress={getActuApi}>
            {iconRefresh}
          </TouchableOpacity>
        </View>
        <Text style={GenStyles.errorText}>{error}</Text>
        <ScrollView style={{ width: '100%' }}>{renderArticles()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
