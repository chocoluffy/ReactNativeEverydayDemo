/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';
import Landing from './app/components/Landings';
import Dashboard from './app/components/Dashboard';
// the curly syntax help get the globals variable defined in index.js, like getting item from hash.
import { globals } from './app/styles';

class Day5Messenger extends Component {
  render() {
    return (
      <Navigator
        style={globals.flex}
        initialRoute={{name: 'Landing'}}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Landing':
              return (
                <Landing navigator={navigator} />
              );
            case 'Dashboard':
              return (
                <Dashboard navigator={navigator}/>
              );
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Day5Messenger', () => Day5Messenger);
