import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image
} from 'react-native';
import PostCell from './PostCell';
import PostDetailed from './PostDetailed';
import data from '../data/fb_result.json';

class PostList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.feed)
    };
  };

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        style={styles.listview}
      />
    );
  };

  _renderRow(rowData){
    return (
      <PostCell data={rowData} navigator={this.props.navigator}/>
    )
  }
}


const styles = StyleSheet.create({
  listview: {
    marginTop: 35
  }
});

module.exports = PostList;
