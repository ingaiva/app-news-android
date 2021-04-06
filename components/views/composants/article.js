import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import GenStyles from '../../../generalStyles';

import * as outils from '../../../outils';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const iconRead = <FontAwesome5 name={'book-reader'} size={20} color="black" />;


export default function Article(article) {
  function renderImgArticle() {
    if (article.urlToImage) {
      return (
        <Image
          style={styles.articleImage}
          source={{ uri: article.urlToImage }}
        />
      );
    }
  }

  function handleOpenUrl() {
    if (article.url) {
      WebBrowser.openBrowserAsync(article.url);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titreArticleContainer}>
        <Text style={[styles.titreArticleSmallText, {color:'tomato'}]}>{article.title}</Text>
        <Text style={[styles.titreArticleSmallText,{fontStyle:'italic'}]}>{article.author}</Text>
      </View>
      <View>
        <Text style={styles.titreArticleSmallText}>{article.source}</Text>
        <Text style={[styles.titreArticleSmallText, { backgroundColor: 'gray', color: 'white' }]}>{article.publishedAt}</Text>
      </View>
      <View style={styles.articleContainer}>
        <Text style={styles.titreArticleText}>{article.description}</Text>
        <View style={styles.articleLeftContainer}>{renderImgArticle()}</View>
        <Text>{article.content}</Text>        
        <TouchableOpacity style={styles.buttonLink} onPress={handleOpenUrl}>
          <Text style={styles.linkText}>Lire article  {iconRead}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,    
    backgroundColor: 'white',
  },
  articleContainer: {
    flex: 1,
  },
  articleLeftContainer: {
    flex: 1,
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titreArticleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
  },
  titreArticleSmallText: {
    fontSize: 14,
    textAlign: 'left',
    marginRight: 8,
    paddingHorizontal:3
  },
  titreArticleText: {
    fontSize: 18,
    textAlign: 'left',
  },
  buttonLink: {    
    margin: 5,
    marginBottom:10,
    paddingVertical: 5,
    paddingHorizontal: 12,    
    backgroundColor: 'white',
  },
  linkText:{
    color:'black'
  }
});
