## Demo

### Day2 Sentiment Analysis App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEveryday/blob/master/images/Jun-24-2016%2014-49-54.gif" height="400" />

### Day3 Simple Blog Client App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEveryday/blob/master/images/react-native-simpleNavigator.gif" height="400" />

### Day6 Feed Reading App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEveryday/blob/master/images/Day6FeedsApp2.gif" height="400" />

[16.12.06] Inject ads blocking script into webview.

[16.12.10] Hide tabbariOS during children scene.

[16.12.11] Add local storage from floating action button inside webview.

[16.12.15] upgrade all code to ES6.

[16.12.17] use scrollable tab bar view.

[TODO] use refreshable listview to replace with usual listview, and test it with collection data.

### Day7 Color Grabber App Demo:

<img src="https://github.com/chocoluffy/ReactNativeEveryday/blob/master/images/Day7ColorGrabber.gif" height="400" />
<img src="https://github.com/chocoluffy/ReactNativeEveryday/blob/master/images/Day7ColorGrabber2.gif" height="400" />

## Trouble Shooting

### hide TabBarIOS in children scenes

By using one single navigator instance, initiated with an component that uses TabBarIOS. Compared with for each tab initiated with its own navigator, this way, navigator pushes new scene that will hide the TabBar on screen.

### if simulator suddenly became slow for react native user

Another potential fix for React-Native users: Chrome de-prioritizes Javascript running in any tabs not in the foreground. So if you have enabled remote debugging, be sure to put the debugger in its own window. 

Or you may accidentally toggle IOS simulator's slow animation, press Command + T to toggle back.

### Latest react-native app doesn't work ":CFBundleIdentifier", Does Not Exist

error: `Latest react-native app doesn't work ":CFBundleIdentifier", Does Not Exist`. [github issue](https://github.com/facebook/react-native/issues/7308) I solved this issue with the `react-native upgrade` command, which helped me reset some details in various xcode files. At least that is what I think solved the issue, usually the version of `"react": "^15.3.2","react-native": "*"`，不能只改package.json然后run`npm install`， 需要用`react-native upgrade`来改IOS内部的文件。
