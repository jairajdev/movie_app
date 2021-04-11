import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

import {Movie, Info} from '../src/screens';
import {SearchInput} from '../src/components';
import {
  getData,
  getSearchMovieUrl,
  getMovieDetailUrl,
  getMovieCreditUrl,
} from '../src/utils/api';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

test('movie', () => {
  const tree = renderer.create(<Movie />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('info', () => {
  const tree = renderer.create(<Info />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('search input', () => {
  const tree = renderer.create(<SearchInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('search movie api test', async () => {
  const response = await getData(getSearchMovieUrl('Mulan', 1));

  expect(response).toBeDefined();
  expect(response.results).toBeDefined();

  if (response) {
    response.results.map((item) => {
      expect(item.id).toBeDefined();
      expect(typeof item.id).toBe('number');

      expect(item.title).toBeDefined();
      expect(typeof item.title).toBe('string');

      expect(item.vote_average).toBeDefined();
      expect(typeof item.vote_average).toBe('number');
    });
  }
});

test('movie detail api test', async () => {
  const mulan_movie_id = '337401';

  const responseDetail = await getData(getMovieDetailUrl(mulan_movie_id));
  const responseCrew = await getData(getMovieCreditUrl(mulan_movie_id));

  expect(responseDetail).toBeDefined();
  expect(responseCrew).toBeDefined();

  if (responseDetail) {
    expect(responseDetail.title).toBeDefined();
    expect(typeof responseDetail.title).toBe('string');

    expect(responseDetail.vote_average).toBeDefined();
    expect(typeof responseDetail.vote_average).toBe('number');

    expect(responseDetail.overview).toBeDefined();
    expect(typeof responseDetail.overview).toBe('string');

    expect(responseDetail.popularity).toBeDefined();
    expect(typeof responseDetail.popularity).toBe('number');

    expect(responseDetail.release_date).toBeDefined();
    expect(typeof responseDetail.release_date).toBe('string');

    expect(responseDetail.vote_count).toBeDefined();
    expect(typeof responseDetail.vote_count).toBe('number');
  }
});
