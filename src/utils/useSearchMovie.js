import {useState} from 'react';
import {debounce} from 'lodash';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import {getData, getSearchMovieUrl} from './api';

const useSearchMovie = () => {
  const [searchMovieState, setState] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [notFound, SetNotFound] = useState(false);

  const handleSearchQuery = (value) => {
    if (value.length > 2) {
      const handleChange = debounce((text) => {
        setLoading(true);
        load_search_movie(text);
      }, 1000);
      handleChange(value);
    } else {
      setState([]);
      setLoading(false);
      SetNotFound(false);
    }
  };

  const clearSearchMovies = () => {
    setState([]);
    setLoading(false);
    SetNotFound(false);
  };

  const load_search_movie = async (value) => {
    let page = 0;
    let res = await getData(getSearchMovieUrl(value, ++page));
    let total_pages = res.total_pages;
    let results = res.results;

    if (!total_pages < 5) {
      total_pages = 5;
    }

    while (page < total_pages) {
      res = await getData(getSearchMovieUrl(value, ++page));
      results = results.concat(res.results);
    }

    if (results.length) {
      const current_date = moment().endOf('year').format('YYYY-MM-DD');
      const last_year_date = moment()
        .subtract(1, 'years')
        .startOf('year')
        .format('YYYY-MM-DD');

      const filtered_results = results.filter((each_result) => {
        const releaseDate = moment(each_result.release_date);
        if (releaseDate.isBetween(last_year_date, current_date)) {
          return each_result;
        }
      });

      setState(filtered_results);
      setLoading(false);
      if (filtered_results.length) {
        SetNotFound(false);
      } else {
        SetNotFound(true);
      }
      AsyncStorage.setItem('LatestSearch', value);
    } else {
      setState([]);
      setLoading(false);
      SetNotFound(true);
    }
  };

  return {
    isLoading,
    notFound,
    searchMovieState,
    handleSearchQuery,
    clearSearchMovies,
  };
};

export default useSearchMovie;
