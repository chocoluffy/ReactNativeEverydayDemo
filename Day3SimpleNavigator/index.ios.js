/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS
} from 'react-native';
import Welcome from './app/component/Welcome';
import PostListNav from './app/component/PostListNav';
import Profile from './app/component/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

class Day3SimpleNavigator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };
  }

  render() {
    return (
      <TabBarIOS tintColor="white" barTintColor="#18244A">
        <Icon.TabBarItemIOS
          title="topics"
          iconName="ios-albums-outline"
          selected={this.state.selectedTab === 'welcome'}
          onPress={() => {this.setState({selectedTab: 'welcome'});}}>
          <Welcome/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="list"
          iconName="ios-list-box-outline"
          selectedIconName="ios-list-box"
          selected={this.state.selectedTab === 'navigatorEntry'}
          onPress={() => {this.setState({selectedTab: 'navigatorEntry'});}}>
          <PostListNav/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="profile"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Profile/>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('Day3SimpleNavigator', () => Day3SimpleNavigator);
