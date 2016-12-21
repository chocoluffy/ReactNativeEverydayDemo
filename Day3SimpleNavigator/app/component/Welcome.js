import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Welcome extends Component {

  render() {
    return (
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>
            Welcome to my homepage!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 18
  }
})

module.exports = Welcome;
