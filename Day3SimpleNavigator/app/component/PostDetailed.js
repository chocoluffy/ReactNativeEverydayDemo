import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  Animated,
  Dimensions,
  Easing
} from 'react-native';

let {height, width} = Dimensions.get('window');

/**
 * Template for each detailed article, use react-native-htmltext to render inline html markup.
 */
class PostDetailed extends Component {

  constructor(props){
    super(props);
    this.state = {
      progressValue: new Animated.Value(0),
      progressOpacity: 1
    };
  };

  componentDidMount(){
    Animated.timing(this.state.progressValue, {
      toValue: width * 0.8,
      duration: 1800,
      easing: Easing.linear
    }).start();
  };

  //TODO: add interactionManager to have progressBar opacity be 0 after reaching full width with a satisfying delay.
  _onLoadEnd(){
    this.setState({
      progressValue: width
    });
    setTimeout(() => {this.setState({progressOpacity: 0})}, 1);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "transparent"}}>
        <Animated.View style = {[styles.progressBar, {width: this.state.progressValue, opacity: this.state.progressOpacity}]}>
        </Animated.View>
        <WebView
        ref={'webview'}
        automaticallyAdjustContentInsets={false}
        style={styles.webview}
        source={{uri: this.props.link}}
        onLoadEnd= {() => this._onLoadEnd()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    marginTop: 50,
    height: 2,
    backgroundColor: '#27B5EE'
  },
  webview: {
    flex: 1
  }
});

module.exports = PostDetailed;
