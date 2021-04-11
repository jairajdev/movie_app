import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MovieCast = (props) => {
  const {state} = props;

  const {container, box, boldText} = styles;
  const {charachters, director, production} = state;

  return (
    <View style={container}>
      {charachters.map((name, key) => {
        return (
          <View style={box} key={key}>
            <Text style={boldText}>{name}</Text>
            <Text>Cast</Text>
          </View>
        );
      })}

      <View style={box}>
        <Text style={boldText}>{director}</Text>
        <Text>Director</Text>
      </View>

      {production.map((name, key) => {
        return (
          <View style={box} key={key}>
            <Text style={boldText}>{name}</Text>
            <Text>Production</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderColor: 'red',
    color: 'red',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 100,
    flexGrow: 1,
    fontSize: 55,
    padding: 20,
  },
  boldText: {
    paddingBottom: 3,
    fontWeight: 'bold',
  },
});

export default MovieCast;
