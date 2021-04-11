import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import useSearchMovie from '../utils/useSearchMovie';
import {SearchInput, MovieList} from '../components';

const Movie = ({navigation}) => {
  const [searchState, setState] = useState(false);
  const [latestSearchKeyword, setKeyword] = useState(null);
  const [sorted, setSorted] = useState([]);

  const {
    isLoading,
    searchMovieState,
    notFound,
    handleSearchQuery,
    clearSearchMovies,
  } = useSearchMovie();

  const {text, spinnerTextStyle, button, buttonText} = styles;

  useEffect(() => {
    (async () => {
      const first_time_opening = (await AsyncStorage.getItem(
        'first_time_opening',
      ))
        ? false
        : true;
      if (first_time_opening) {
        Alert.alert(
          'Movie Search',
          'You can search the movie detail by filling movie title in the input . ',
          [
            {
              text: 'Ok',
              onPress: () => {
                AsyncStorage.setItem('first_time_opening', 'false');
              },
            },
          ],
          {cancelable: false},
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const keyword = await AsyncStorage.getItem('LatestSearch');
      if (keyword) {
        NetInfo.fetch().then((status) => {
          if (status.isConnected === false) {
            Alert.alert(
              'No Internet Connection!',
              'Connect your device to the internet and try again.',
            );
          } else {
            handleSearchQuery(keyword);
            setKeyword(keyword);
          }
        });
      }
    })();
  }, []);

  useEffect(() => {
    setSorted([]);
  }, [searchMovieState]);

  const handleSearchOn = () => {
    NetInfo.fetch().then((status) => {
      if (status.isConnected === false) {
        Alert.alert(
          'No Internet Connection!',
          'Connect your device to the internet and try again.',
        );
      } else {
        if (!searchState) {
          setKeyword(null);
          setState(true);
        }
      }
    });
  };

  const handleSearchOff = () => {
    clearSearchMovies();
    setState(false);
    setSorted([]);
  };

  const text_status = () => {
    let TextStatus;
    if (searchState) {
      TextStatus = 'Search Results';
    } else {
      TextStatus = 'Search by movie title';
    }

    if (latestSearchKeyword) {
      TextStatus = 'Your Last Search " ' + latestSearchKeyword + ' "';
    }

    return TextStatus;
  };

  const sort_by_rating = () => {
    if (!_.isEmpty(searchMovieState)) {
      const sorted_movie_list = _.orderBy(
        searchMovieState,
        ['vote_average'],
        ['desc'],
      );
      setSorted(sorted_movie_list);
    }
  };

  const handleRenderedList = () => {
    if (sorted.length) {
      return sorted;
    } else {
      return searchMovieState;
    }
  };

  return (
    <>
      <SearchInput
        searchOn={handleSearchOn}
        searchOff={handleSearchOff}
        handleSearchQuery={handleSearchQuery}
      />
      <Text style={text}>{text_status()}</Text>
      {isLoading ? (
        <Spinner
          visible={isLoading}
          textContent={'Searching...'}
          textStyle={spinnerTextStyle}
        />
      ) : notFound ? (
        <Text style={text}>No Result Found</Text>
      ) : searchMovieState.length ? (
        <>
          <TouchableOpacity style={button} onPress={() => sort_by_rating()}>
            <Text style={buttonText}>Sort By Rating</Text>
          </TouchableOpacity>

          <MovieList movieList={handleRenderedList()} navigation={navigation} />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#222',
  },
  text: {
    color: '#0B253F',
    fontSize: 20,
    margin: 15,
  },
  button: {
    height: 45,
    backgroundColor: '#f09839',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Movie;
