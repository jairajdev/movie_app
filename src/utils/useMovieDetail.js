import {useEffect, useState} from 'react';
import _ from 'lodash';

import {getData, getMovieDetailUrl, getMovieCreditUrl} from './api';

const useMovieDetail = (movieId) => {
  const [state, setState] = useState({
    isLoading: true,
    movie: {},
    image: 'https://image.tmdb.org/t/p/w500',
    year: '',
    language: '',
    genre: '',
    charachters: [],
    director: '',
    production: [],
  });

  useEffect(() => {
    (async () => {
      await getData(getMovieDetailUrl(movieId)).then((data) => {
        (async () => {
          const res_crew = await getData(getMovieCreditUrl(movieId));

          const direction = _.filter(res_crew.crew, (crew_member) => {
            return crew_member.job === 'Director';
          });
          const production = _.filter(res_crew.crew, (crew_member) => {
            return crew_member.department === 'Production';
          });

          setState({
            ...state,
            movie: data,
            image: state.image + data.poster_path,
            year: data.release_date.slice(0, 4),
            language: data.original_language.toUpperCase(),
            genre: data.genres.lenght && data.genres[0].name,
            charachters: res_crew.cast.slice(0, 2).map((n) => n.name),
            director: direction[0].name,
            production: production.slice(0, 3).map((n) => n.name),
            isLoading: false,
          });
        })();
      });
    })();
  }, [movieId]);

  return {state};
};

export default useMovieDetail;
