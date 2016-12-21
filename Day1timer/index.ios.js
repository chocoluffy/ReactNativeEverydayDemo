/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { icons } from './theme';
import { Timer } from './Timer';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

class timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      minutes: '00',
      seconds: '00',
      hundredth: '00'
    };
  };

  render() {
      return (
      <Image source={icons.background} style={styles.bgImage}>
        <View style={styles.container}>
          <View style={styles.timerDisplayLayout}>
            <View style={styles.timerCircle}>
              <Text style={styles.mainLabel}>
                {this.state.minutes}:{this.state.seconds}
              </Text>
              <Text style={styles.subLabel}>
                {this.state.hundredth}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.controlsLayout} onPress={this.onPress.bind(this)}>
            <Image source={icons.start} style={styles.startIcon} />
          </TouchableOpacity>
        </View>
      </Image>
      );
    };

    onPress(event){
      if(this.state.isStart == false){

      }
      this.setState({
        minutes: '34',
        seconds: '10',
        hundredth: '02'
      })
    };

}

function zeroPadding(n) {
  if (n == 0) {
    return "00";
  } else if(n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },

  bgImage: {
    flex: 1,
    width: null,
    height: null,
  },

  timerCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 100,
  },

  mainLabel: {
    color: '#fff',
    fontSize: 50
  },

  subLabel: {
    color: '#fff',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 1
  },

  startIcon: {
    tintColor: '#fff'
  },

  // flexDirection set default to column.
  timerDisplayLayout: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,0,0,0.3)',
  },

  controlsLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,255,0,0.3)',
  },
});

AppRegistry.registerComponent('timer', () => timer);
