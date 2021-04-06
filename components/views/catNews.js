import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const iconMenu = <FontAwesome5 name={'bars'} size={20} color="white" />;
const iconRefresh = <FontAwesome5 name={'sync'} size={15} color="white" />;
const iconCatNews = <FontAwesome5 name={'star'} size={20} color="white" />;

//Imports des composants et outils 'maison'...
import GenStyles from '../../generalStyles';
import * as outils from '../../outils';
import Article from './composants/article';
import SplanshScreen from '../splashScreenLoading';

//Fonction principale :
export default function CatNews(props) {
  const apiKey = 'your-key';
  const storageKey = '@bocal:newsAqualas-lastCategorie';
  const tabCategories = [
    { code: 'general', texte: 'général' },
    { code: 'health', texte: 'santé' },
    { code: 'business', texte: ' affaires' },
    { code: 'entertainment', texte: 'divertissement' },
    { code: 'science', texte: 'science' },
    { code: 'sports', texte: 'sport' },
    { code: 'technology', texte: 'technologie' },
  ];
  const [categorie, setCategorie] = useState('');
  const [tab, setTab] = useState([]);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [cpt, setCpt] = useState(1);

  // useEffect(() => {
  //   init();
  // }, []);
  useEffect(() => {
    getNewsApi();
  }, [categorie]);

  // async function init() {
  //   try {
  //     let catSaved = await AsyncStorage.getItem(storageKey);
  //     if (!catSaved) {
  //       await AsyncStorage.setItem(storageKey, tabCategories[0].code);
  //       setCategorie(tabCategories[0].code);
  //     } else {
  //       setCategorie(catSaved);
  //     }
  //   } catch (err) {
  //     console.log(
  //       'Erreur lors de la recuperation de la catégorie stockée sur appareil : ' +
  //         err.message
  //     );
  //     AsyncStorage.removeItem(storageKey);
  //     setCategorie(tabCategories[0].code);
  //     await getNewsApi();
  //   }
  // }

  async function getNewsApi() {
    setShowSplash(true);
    if (!categorie) {
      try {
        let catSaved = await AsyncStorage.getItem(storageKey);
        if (!catSaved) {
          await AsyncStorage.setItem(storageKey, tabCategories[0].code);
          setCategorie(tabCategories[0].code);
        } else {
          setCategorie(catSaved);
        }
      } catch (err) {
        console.log(
          'Erreur lors de la recuperation de la catégorie stockée sur appareil : ' +
            err.message
        );
        AsyncStorage.removeItem(storageKey);
        setCategorie(tabCategories[0].code);
      }
    }
   // console.log("cat for newApi : " + categorie);
    

    let url = `https://newsapi.org/v2/top-headlines?language=fr&category=${categorie}&apiKey=${apiKey}&pageSize=25&country=fr`;

    var myInit = { method: 'GET' };
    try {
      const responsePromise = await fetch(url, myInit);
      const responseData = await responsePromise.json();

      if (responseData instanceof Error || responseData?.status === 'error') {
        console.log('Une erreur instanceof Error : ' + responseData?.message);
        setError(responseData?.message);
        setTab([]);
      } else {
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
      await AsyncStorage.setItem(storageKey, categorie);
    } catch (er) {
      console.log('Une erreur : ' + er);
      setError("Une erreur s'est produite : " + er.message);
      setTab([]);
    }
    setShowSplash(false);
  }

  function myEgg() {
    setCpt(cpt + 1);
    if (cpt >= 3) {
      setCpt(1);
      Alert.alert('Arrêtes', 'Mais... Arrêtes de me taper!!!');
    }
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

  function renderCategories() {
    if (tabCategories && tabCategories?.length > 0) {
      try {
        let tabBtns = [];
        tabCategories.forEach((element) => {
          tabBtns.push(
            <TouchableOpacity
              style={getCategorieColor(element)}
              onPress={() => setCategorie(element.code)}>
              <Text style={GenStyles.buttonText}>{element.texte}</Text>
            </TouchableOpacity>
          );
        });
        return tabBtns;
      } catch (er) {
        console.log(' renderNav : ' + er);
      }
    }
  }

  function getCategorieColor(curElement) {
    if (categorie && curElement.code === categorie) {
      return [styles.buttonCategorie, { backgroundColor: 'tomato' }];
    } else {
      return styles.buttonCategorie;
    }
  }

  //Rendu principal
  if (showSplash) {
    return <SplanshScreen />;
  } else {
    return (
      <View style={styles.container}>
        <View style={GenStyles.titreViewContainer}>
          <TouchableOpacity style={GenStyles.button} onPress={showMenu}>
            {iconMenu}
          </TouchableOpacity>
          <Text style={GenStyles.titreText} onPress={myEgg}>
            {' '}
            {iconCatNews} Recherche
          </Text>
          <TouchableOpacity style={GenStyles.button} onPress={getNewsApi}>
            {iconRefresh}
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesContainer}>{renderCategories()}</View>
        <Text style={GenStyles.errorText}>{error}</Text>
        <ScrollView style={{ width: '100%' }}>{renderArticles()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCategorie: {
    marginVertical: 5,
    marginHorizontal: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
    borderColor: '#5d5f60',
    backgroundColor: '#5d5f60',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});
