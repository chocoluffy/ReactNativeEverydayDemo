import React,  { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
var { NativeModules } = require('react-native');
var { colorGrabber } = NativeModules;
// var colorGrabber = require('react-native').NativeModules.colorGrabber;

export default class App extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null,
    displaySource: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: response.origURL,
          displaySource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.origURL
        });
      }
    });
  }

  render() {
    console.log("is it a dictionary or a string?", this.state.avatarSource);
    var colorPan = 0;
    if(this.state.avatarSource){
      colorGrabber.getColors(this.state.avatarSource, (err, res) => {
          if(err){
            console.error(err);
          }
          else{
            console.log("some cool results being returned");
            console.log(res);
            colorPan = 1;
            var colorKeys = Object.keys(res);
            var colorPercentages = Object.values(res);
            console.log(colorKeys, colorPercentages);

            var colorStick = colorKeys.map(function(key, i){
              var colors = key.split(' ');
              var red = parseFloat(colors[1]) * 255;
              var green = parseFloat(colors[2]) * 255;
              var blue = parseFloat(colors[3]) * 255;
              var percentage = parseFloat(res[key]);
              console.log("color info: ", red, green, blue, percentage);
              return (
                <ColorCell red={red} green={green} blue={blue} percentage={percentage} key={i} />
              )
            });
            console.log(colorStick);
          }
          // Returns:
          // {
          //  'UIDeviceRGBColorSpace 0.0784314 0.0941176 0.0823529 1': '0.1666667',
          //  'UIDeviceRGBColorSpace 0.215686 0.203922 0.262745 1': '0.1666667',
          //  'UIDeviceRGBColorSpace 0.517647 0.45098 0.380392 1': '0.6666667'
          // }
      });
    }

    var colorFinal;
    if(colorPan == 1){
      colorFinal = colorStick;
    }


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.displaySource} />
          }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
        <View style={{flex: 1, flexDirection: 'row'}}>
          {colorFinal}
        </View>
      </View>

    );
  }

}

class ColorCell extends Component {

    constructor() {
      super();
    }

    render() {
      console.log("printing props", this.props);
      var red = this.props.red;
      var green = this.props.green;
      var blue = this.props.blue;
      var width = this.props.percentage;
      var color = "rgba(" + red +", " + green + ", " + blue +", 1)";
      return (
        <View styles={{flex: width, backgroundColor: color}}></View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
