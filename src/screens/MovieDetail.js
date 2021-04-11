import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import useMovieDetail from '../utils/useMovieDetail';

import {MovieCast} from '../components';

const MovieDetail = ({route}) => {
  const {state} = useMovieDetail(route.params.movieId);

  const {movie, image, year, genre, language, isLoading} = state;
  const {overview, title, release_date, runtime} = movie;

  const {
    container,
    imageStyle,
    textColorWhite,
    boldText,
    overviewText,
    imgContainer,
    titleStyle,
    yearStyle,
    overviewTextStyle,
    spinnerTextStyle,
  } = styles;

  return (
    <View style={container}>
      {isLoading ? (
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={spinnerTextStyle}
        />
      ) : (
        <ScrollView>
          <ImageBackground source={{uri: image}} style={imageStyle}>
            <View style={imgContainer}>
              <Text style={titleStyle}>
                {title}
                <Text style={(textColorWhite, yearStyle)}>({year})</Text>
              </Text>
              <Text style={textColorWhite}>
                {release_date} ({language})
              </Text>
              <Text style={textColorWhite}>
                {genre}
                <Text style={boldText}> {runtime}m</Text>
              </Text>
            </View>
          </ImageBackground>
          <Text style={overviewText}>Overview</Text>
          <Text style={overviewTextStyle}>{overview}</Text>
          <MovieCast state={state} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
  },
  imageStyle: {
    height: 250,
  },
  imgContainer: {
    position: 'absolute',
    bottom: '2%',
    marginLeft: 15,
  },
  textColorWhite: {
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 30,
  },
  yearStyle: {
    fontWeight: 'normal',
  },
  overviewText: {
    padding: 12,
    paddingBottom: 0,
    color: '#0B253F',
    fontSize: 25,
  },
  overviewTextStyle: {
    padding: 12,
  },
});

export default MovieDetail;
