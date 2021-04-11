import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Info = () => {
  const {
    container,
    imageStyle,
    yellowBox,
    overviewTitle,
    overviewStyle,
    box,
    yellowText,
  } = styles;

  return (
    <View style={container}>
      <Image source={require('../image/tmdb.png')} style={imageStyle} />
      <View style={box}>
        <Text style={overviewTitle}>Welcome.</Text>
        <Text style={overviewStyle}>
          Millions of movies, TV shows and people to discover. Explore now.
        </Text>
      </View>
      <View style={yellowBox}>
        <Text style={yellowText}>
          The data for this app are fetched from the API of The Movie DataBase.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
  overviewTitle: {
    color: '#0B253F',
    fontSize: 25,
    fontWeight: '600',
  },
  overviewStyle: {
    fontSize: 20,
    color: '#222',
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  yellowBox: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f09839',
    borderRadius: 5,
    margin: 10,
  },
  yellowText: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Info;
