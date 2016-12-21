import React,  { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
var { NativeModules } = require('react-native');
var { colorGrabber, RNUploader } = NativeModules;
// var colorGrabber = require('react-native').NativeModules.colorGrabber;

/**
 * Constants
 */
const resultDirPath = 'http://192.168.0.18:3000/output/';

export default class App extends React.Component {

  state = {
    displaySource: null,
    origURL: null,
    base64Data: null,
    colorLst:null,
    resultBaseCode: null
  };

  componentDidMount() {
    // upload progress
    DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;

      console.log( "upload progress: " + progress + "%");
    });
  }

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

        var avatarSource = response.origURL;
        this.setState({
          displaySource: source,
          origURL: avatarSource,
          base64Data: response.data
        });

        colorGrabber.getColors(avatarSource, (err, res) => {
            if(err){
              console.error(err);
            }
            else{
              console.log(res);
              var colorKeys = Object.keys(res);
              var colorPercentages = Object.values(res);
              console.log(colorKeys, colorPercentages);

              var colorLst = colorKeys.map(function(key, i){
                var colors = key.split(' ');
                var red = parseFloat(colors[1]) * 255;
                var green = parseFloat(colors[2]) * 255;
                var blue = parseFloat(colors[3]) * 255;
                var percentage = parseFloat(res[key]) * 10;
                var color = "rgba(" + red +", " + green + ", " + blue +", 1)";
                console.log("color info: ", color, " width ratio: ", percentage);
                return {
                  'color': color,
                  'widthRatio': percentage ,
                  'key': i
                }
              });
              this.setState({
                colorLst: colorLst // asychronous code! need to move the changing properties into state.
              });
            }
        });
      }
    });
  }

  doUpload(origURL, basedata) {
    if(origURL){
      let files = [
          {
              name: 'file[]',
              filename: 'test.png',
              filepath: origURL,  // image from camera roll/assets library
              filetype: 'image/png',
          },
          {
            name: 'file[]',
            filename: 'test2.png',
            filepath: "data:image/png;base64," + basedata,
            filetype: 'image/png',
          }
      ];

      let opts = {
          // url: 'http://localhost:3000/',
          url: 'http://192.168.0.18:3000/',
          files: files,
          method: 'POST',                             // optional: POST or PUT
          headers: {
            'Accept': 'application/json'
          },  // optional
          params: {
            'user_id': 1,
            'data': basedata
          },                   // optional
      };

      RNUploader.upload( opts, (err, response) => {
          if( err ){
              console.log(err);
              return;
          }

          let status = response.status;
          let responseString = response.data;
          let json = JSON.parse( responseString );

          console.log('upload complete with status ' + status);
          // var resultImgPath = resultDirPath + json.id + '.png'; // image loading path. Use base64 string instead.
          if(json.resultBaseCode){
            console.log("receiving output image!");
          }

          this.setState({
            resultBaseCode: json.resultBaseCode
          })
      });
    }
  }


  render() {
    var colorPalette;
    if(this.state.colorLst){
      colorPalette = this.state.colorLst.map(function(obj, i){
        return (
          <View style={{flex: obj.widthRatio, backgroundColor: obj.color}} key={obj.key.toString()}></View>
        )
      });
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{flex: 4}}>
          <View style={[styles.avatar, styles.avatarContainer]}>
          { this.state.displaySource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.displaySource} />
          }
          </View>
        </TouchableOpacity>

        <View style={{height: 50, flexDirection: 'row'}}>
          {colorPalette}
        </View>

        <View style={{flex: 2}}></View>

        <TouchableOpacity onPress={this.doUpload.bind(this, this.state.origURL, this.state.base64Data)}
                          style={{flex: 1}}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            { this.state.resultBaseCode === null ? <Text>Upload image</Text> :
              <Image style={styles.avatar} source={{uri: this.state.resultBaseCode}} />
            }

          </View>
        </TouchableOpacity>

        <View style={{flex: 7}}></View>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
    // borderRadius: 75,
    width: 150,
    height: 150
  }
});
