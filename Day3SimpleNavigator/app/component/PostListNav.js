import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
const PostList = require('./PostList');

class PostListNav extends Component {

  renderScene(route, navigator) {
    return < route.component {...route.passProps} navigator={navigator} />
  };

  render() {
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{
          navTitle: 'PostList',
          component: PostList
        }}
        renderScene={ this.renderScene }
        navigationBar={ <Navigator.NavigationBar style={styles.nav} routeMapper={NavigatorBarRouteMapper} /> }
      />
    );
  }
}

var NavigatorBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0){
      return (
        <TouchableHighlight underlayColor="transparent"
          onPress={() => {
            if(index > 0){
              navigator.pop()
            }
          }}>
          <Text style={styles.leftNavButtonText}>Back
          </Text>
        </TouchableHighlight>
      )
    }
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if(route.onPress){
      return (
        // note that here should we use () => route.onPress()
        <TouchableHighlight onPress={route.onPress}>
          <Text style={styles.rightNavButtonText}>
            { route.rightText || 'Like' }
          </Text>
        </TouchableHighlight>
      )
    }
  },
  Title(route, navigator, index, navState){
    return <Text style={styles.navTitle}>{ route.navTitle }
    </Text>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navigator: {
    flex: 1
  },
  nav: {
    height: 50,
    backgroundColor: "#CFCFCF"
  },
  leftNavButtonText: {
    fontSize: 16,
    marginLeft: 13,
    marginTop: 3
  },
  rightNavButtonText: {
    fontSize: 16,
    marginRight: 13,
    marginTop: 3
  },
  navTitle: {
    marginTop: 3,
    fontSize: 16
  }
});

module.exports = PostListNav;
