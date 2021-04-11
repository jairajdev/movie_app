import {API_KEY} from '@env';
import fetch from 'node-fetch';

export const getMovieDetailUrl = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
};

export const getMovieCreditUrl = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
};

export const getSearchMovieUrl = (name, page) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=${page}&include_adult=false`;
};

export async function getData(url) {
  let res = await fetch(url);
  return res
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export async function postData(url, item) {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(item),
  });
  return res
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
