import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

const MovieCard = (props) => {
  const {movie, navigation} = props;
  const {img, starStyle, textStyle, box} = styles;

  const imageUrl = IMAGE_PATH + movie.poster_path;
  const title = movie.title;
  const vote_average = movie.vote_average;

  const render_rating_star = () => {
    const rating_star = [];

    for (let i = 0; i < vote_average / 2; i++) {
      rating_star.push(
        <FontAwesome
          key={i}
          name="star"
          size={18}
          color="#F09839"
          style={starStyle}
        />,
      );
    }

    if (rating_star.length < 5) {
      rating_star.push(
        <FontAwesome
          key={98}
          name="star-o"
          size={18}
          color="black"
          style={starStyle}
        />,
      );
    }

    return rating_star;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', {movieId: movie.id})}>
      <Image style={img} source={{uri: imageUrl}} />
      <Text style={textStyle}>{title}</Text>
      <View style={box}>{render_rating_star(vote_average)}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 120,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 15,
  },
  box: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  starStyle: {
    marginHorizontal: 1,
  },
});

export default MovieCard;
