/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
const Forecast = require('./Forecast');
class Day2Sentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      searchText: '',
      sentiment: '',
      gif: 'http://ww1.sinaimg.cn/large/72f96cbagw1f52lv09lzgj211o0vstda',
      notice: 'No sentence typed in so far~',
      emojis: ''
    };
  };

  handleTextChange(text) {
    var searchText = text;
    if(searchText){
      var _this = this;
      this.setState({
        isStart: true,
        searchText: searchText
      });
      fetch('http://www.airloft.org/api/getSentimentTextMulti?text='
        + searchText)
        .then((response) => response.json())
        .then((responseJSON) => {
          var sentiment = responseJSON.results[0].sentiment;
          _this.handleEmojiFetch(searchText, _this);
          this.setState({
            sentiment: sentiment
          });
          var firstSenti = sentiment[0].split("/")[0];
          _this.handleGifFetch(firstSenti, _this);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
    else{
      this.setState({notice: "No sentence typed in so far~"});
    }
  };

  /**
   * return the top two emoji for searchText.
   */
  handleEmojiFetch(text, _this){
    var url = "http://emoji.getdango.com/api/emoji?q=" + text;
    fetch(url)
    .then((emojiresponse) => emojiresponse.json())
    .then(function(emojiresponseJSON){
      _this.setState({
        emojis: emojiresponseJSON.results[0].text + emojiresponseJSON.results[1].text
      });
    })
  }

  /**
   * _this: points to current component(Day2Sentiment).
   */
  handleGifFetch(text, _this){
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + text;
    fetch(url)
    .then((imgresponse) => imgresponse.json())
    .then(function(imgresponseJSON){
      console.log(imgresponseJSON.data.image_url);
      _this.setState({
        gif: imgresponseJSON.data.image_url,
        notice: 'Touch the gif to see more ^_^'
      });
    })
  };

  onPress(event){
    if(this.state.isStart == true){
      var searchText = this.state.sentiment[0].split("/")[0];
      this.handleGifFetch(searchText, this);
    }
    else{
      this.setState({
        notice: 'No sentence typed in so far~'
      })
    }
  };

  render() {
    var {height, width} = Dimensions.get('window');
    var content = null;
    if (this.state.sentiment !== null) {
      content = <Forecast mainText={this.state.sentiment + this.state.emojis} />;
    }
    return (
      <View style={styles.container}>
          <View style={styles.overlay}>
           <View style={styles.row}>
             <Text style={styles.mainText}>
               Analyze emotion for:
             </Text>
             <View style={styles.sentiContainer}>
               <TextInput
                 style={styles.mainText}
                //  onSubmitEditing={this.handleTextChange.bind(this)}
                 onChangeText={this.handleTextChange.bind(this)}
                 />
             </View>
           </View>
           {content}
           <View style={styles.notice}>
              <Text style={styles.noticeText}>
                {this.state.notice}
              </Text>
           </View>
         </View>
         <TouchableOpacity style={styles.mainGif} onPress={this.onPress.bind(this)}>
           <Image style={[styles.mainGif, {
             width: width
           }]} source={{uri: this.state.gif}}>
           </Image>
         </TouchableOpacity>
      </View>
    );
  }

}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  overlay: {
    flex: 3,
    backgroundColor: '#000',
    opacity: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainGif: {
    flex: 5,
    height: null
  },
  row: {
    flex: 2,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingTop: 50
  },
  emojis: {
    flex: 1
  },
  notice: {
    flex: 1,
    marginBottom: 0
  },
  noticeText: {
    flex: 1,
    color: '#FFFFFF'
  },
  sentiContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  mainText: {
    flex: 1,
    height: baseFontSize,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

AppRegistry.registerComponent('Day2Sentiment', () => Day2Sentiment);
