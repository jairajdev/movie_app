import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';

import useSearchMovie from '../utils/useSearchMovie';

const SearchInput = (props) => {
  const [inputState, setState] = useState('');

  const {searchOn, searchOff, handleSearchQuery} = props;

  const {clearSearchMovies} = useSearchMovie();

  const handle_input = (value) => {
    setState(value);
    searchOn();
    handleSearchQuery(value);
  };

  const handle_clear = () => {
    clearSearchMovies();
    setState('');
  };

  return (
    <SearchBar
      onTouchStart={searchOn}
      onChangeText={(text) => handle_input(text)}
      onClear={handle_clear}
      onCancel={searchOff}
      value={inputState}
      platform="ios"
      placeholder="Search"
    />
  );
};

export default SearchInput;
