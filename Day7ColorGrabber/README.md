
## External Module

### grab image

[react-native-image-picker](https://github.com/marcshilling/react-native-image-picker)

### get primary color

[react-native-color-grabber](https://github.com/bsudekum/react-native-color-grabber)

A typical example of Objective-C, how to use that in project?

[bridging in react native](http://tadeuzagallo.com/blog/react-native-bridge/)
[Building Custom React Native Components From Scratch](http://moduscreate.com/react_native_custom_components_ios/)

比较有用的还是第二篇， 最终竟然是通过自己来改名字来run起来这个`colorGrabber`模块的， 其实问题就是最好让文件名`.h`和`.m`的文件都和执行的函数拥有一样的名字， 然后在xcode里假如到项目的同名xcode文件夹， 不一定要是Libraries文件夹， 然后在`index.ios.js`里面这样引用就好了：

```javascript
var { NativeModules } = require('react-native');
var { colorGrabber } = NativeModules;
```
![colorGrabber](http://ww2.sinaimg.cn/large/006y8mN6gw1f9npz2813ej30ei0r076w.jpg)

同时在Xcode的console里面可以看得到`console.log()`的信息， 可以帮助debug。

一个新问题是“Only tested with images from assets-library://”， 而我在RN里面应该怎样传入？

好消息是， image-picker会返回来自`assets-library`的信息， 可以将改信息传给color-grabber； 然后用本身的`file://`形式加载到RN的image组件里面。

## Trouble Shooting

### A list of children component in RN

for each child component, add `key` prop to it, the attribute value should be in string.

### `react-native run-ios` not working

By opening Xcode project, then deleting and adding `colorGrabber.h` and `colorGrabber.m` files again, to make Xcode compiles it right and running, then can do `react-native run-ios` from terminal.

### libraries file not found.

Compile source iOS dependencies for react-native, sometimes, the external modules cannot just be added by using `rnpm link`, instead, need to add files to libraries manually.

### Transplant project to be working independently.

note that Example/ folder only works in office's computer, not for home one.

try init another project called Example2/ to set up the same thing as Example/; No, instead, directly try in Day7/

NOTE: Example/ was run inside color_picker/ folder, thus, some liraries, especially around its own module, is messed up.

Fixed.

### info.plist update to allow photo access.

```
<key>NSPhotoLibraryUsageDescription</key>
<string>Photo Library Access Warning</string>
```

add the above key value pair into info.plist.

### same working env.

Update Day7ColorGrabber project to work universally over home and office pc, make sure if display red in xcode, delete and add files again.

## Useful links

- [How to add logical if statement when rendering React components?](http://stackoverflow.com/questions/28258465/how-to-add-logical-if-statement-when-rendering-react-components)
- [Stateless components in React Native](https://medium.com/front-end-hacking/stateless-components-in-react-native-e9034f2e3701#.xjtpnm6zw)
- [Objective-c - Getting least used and most used color in a image](http://stackoverflow.com/questions/13694618/objective-c-getting-least-used-and-most-used-color-in-a-image/29266983#29266983)
