import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Text, Icon} from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
const PostDetailed = require('./PostDetailed');

class Postcell extends Component {

  _cellTapped() {
      console.log("pressed!", this.props.data.title);
      this.props.navigator.push({ // All these properties will be a property of route.
        component: PostDetailed,
        passProps: {
          link: this.props.data.post_url
        },
        navTitle: this.props.data.title
      })
  };

  render() {
    var isPostImg = this.props.data.post_img.length > 0
    var postImg;
    if(isPostImg){
      postImg = (
        <CardItem>
           <Image style={{ width: width }} source={{uri: this.props.data.post_img[0] }} />
        </CardItem>
      )
    };
    var htmlText = (
      <HTMLView
          value={this.props.data.content.replace(/<\/br>/g, " ")}
          stylesheet={{ fontWeight: '300', color: '#257EFF' }}
      />
    )

    return (
      <TouchableHighlight
        underlayColor = '#ddd'
        onPress={ this._cellTapped.bind(this) }>
        <View style={{marginTop: 10}}>
          <Container>
             <Content>
                 <Card>
                     <CardItem>
                         <Thumbnail source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                         <Text>{this.props.data.topic_name}</Text>
                         <Text note>{this.props.data.create_date}</Text>
                     </CardItem>
                         {postImg}
                     <CardItem>
                         {htmlText}
                     </CardItem>
                     <CardItem>
                          <Icon name="ios-heart-outline" style={{ size: 7, color: "#bbc" }} />
                          <Icon name="ios-chatbubbles-outline" style={{ size: 7, color: "#bbc" }} />
                          <Icon name="ios-share-outline" style={{ size: 7, color: "#bbc" }} />
                     </CardItem>
                </Card>
             </Content>
          </Container>
        </View>
      </TouchableHighlight>
    );
  }
}
var {width, height} = Dimensions.get('window');

module.exports = Postcell;
