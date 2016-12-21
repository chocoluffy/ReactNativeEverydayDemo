note that Example/ folder only works in office's computer, not for home one.

try init another project called Example2/ to set up the same thing as Example/; No, instead, directly try in Day7/

NOTE: Example/ was run inside color_picker/ folder, thus, some liraries, especially around its own module, is messed up.



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

### Trouble Shooting

Compile source iOS dependencies for react-native, sometimes, the external modules cannot just be added by using `rnpm link`, instead, need to add files to libraries manually.
