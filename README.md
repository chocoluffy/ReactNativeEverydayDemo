## Demo

### whalesper - Toronto life at your fingertip

<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/whalesper-search.gif" height="400" />
<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/whalesper-event.gif" height="400" />
<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/whalesper-campus.gif" height="400" />

See complete release note [here](http://chocoluffy.com/2017/03/20/App%E9%A6%96%E5%8F%91%EF%BD%9C%E9%B2%B8%E8%AF%AD-%E5%A4%9A%E4%BC%A6%E5%A4%9A%E7%8E%A9%E4%B9%90%E6%94%BB%E7%95%A5%E7%AC%AC%E4%B8%80%E5%85%A5%E5%8F%A3/)


### Day2 Sentiment Analysis App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/Jun-24-2016%2014-49-54.gif" height="400" />

### Day3 Simple Blog Client App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/react-native-simpleNavigator.gif" height="400" />

### Day6 Feed Reading App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/newDay6-0.gif" height="400" />
<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/newDay6-1.gif" height="400" />
<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/newDay6-2.gif" height="400" />


### Day7 Color Grabber App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/Day7ColorGrabber.gif" height="400" />
<img src="https://github.com/chocoluffy/ReactNativeEverydayDemo/blob/master/images/Day7ColorGrabber2.gif" height="400" />

## Trouble Shooting

### hide TabBarIOS in children scenes

By using one single navigator instance, initiated with an component that uses TabBarIOS. Compared with for each tab initiated with its own navigator, this way, navigator pushes new scene that will hide the TabBar on screen.

### if simulator suddenly became slow for react native user

Another potential fix for React-Native users: Chrome de-prioritizes Javascript running in any tabs not in the foreground. So if you have enabled remote debugging, be sure to put the debugger in its own window. 

Or you may accidentally toggle IOS simulator's slow animation, press Command + T to toggle back.

### Latest react-native app doesn't work ":CFBundleIdentifier", Does Not Exist

error: `Latest react-native app doesn't work ":CFBundleIdentifier", Does Not Exist`. [github issue](https://github.com/facebook/react-native/issues/7308) I solved this issue with the `react-native upgrade` command, which helped me reset some details in various xcode files. At least that is what I think solved the issue, usually the version of `"react": "^15.3.2","react-native": "*"`，不能只改package.json然后run`npm install`， 需要用`react-native upgrade`来改IOS内部的文件。
