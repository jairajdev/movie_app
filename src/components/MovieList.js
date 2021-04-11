import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import MovieCard from './MovieCard';

const MovieList = (props) => {
  const {movieList, navigation} = props;
  const {card, container} = styles;

  return (
    <View style={container}>
      <FlatList
        numColumns={2}
        data={movieList}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(movie) => {
          return (
            <View style={card}>
              <MovieCard movie={movie.item} navigation={navigation} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: 5,
  },
});
export default MovieList;
