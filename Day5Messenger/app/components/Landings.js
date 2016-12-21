import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
 } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Colors from '../styles/colors';
// what is the use of "globals"? Ans: by default, it finds index.js file.
import { landingStyles } from '../styles';
import { globals } from '../styles';
const BackgroundImage = 'https://s3-us-west-2.amazonaws.com/assembliesapp/welcome%402x.png';
const Logo = 'https://s3-us-west-2.amazonaws.com/assembliesapp/logo.png';
const styles = landingStyles;


class Landing extends Component{
  constructor(){
    super();
    this.visitDashboard = this.visitDashboard.bind(this);
  }
  visitDashboard(){
    // need to have one props being navigator.
    this.props.navigator.push({
      name: 'Dashboard'
    });
  }
  render(){
    let titleConfig = { title: 'Landing', tintColor: 'white' };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={{ uri: BackgroundImage }}
          />
        </View>
        <View style={globals.flexCenter}>
          <Image
            style={styles.logo}
            source={{ uri: Logo }}
          />
          <Text style={[globals.lightText, globals.h2, globals.mb2]}>
            assemblies
          </Text>
          <Text style={[globals.lightText, globals.h4]}>
            Where Developers Connect
          </Text>
        </View>
        <TouchableOpacity
          style={globals.button}
          onPress={this.visitDashboard}
        >
          <Icon name='ios-person' size={36} color='white' />
          <Text style={globals.buttonText}>
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Landing;
