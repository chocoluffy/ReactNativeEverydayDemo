## Trouble Shooting

### Image not rendering from ListView

- One weird thing happened is that using the same uri from Day2 project, I want to render luffy on each row of ListView, but it doesn't show up. Then, I change to a *small and https-sourced* image from facebook's github repo, then it works. Not sure how to deal with it yet.
- Some one from issue panel says that image may not be updated in ListView and you have to add an "ID" attribute to forcely update it, it can be saved for later's use.

### Use `rnpm` to link with third-party libraries

Sometimes the third-party libraries not fully integrated into the project even doing `rnpm link`. In such case, delete the node_modules folder and install again, `rm -rf node_modules && npm install`, then do `rnpm link` to help link with IOS libraries instead of doing it mannually.

### How to center an image of fixed size

Apply `flex: 1, justifyContent: 'center', alignItems: 'center'` styling on image's parent element, then for that image's styling, only specify its fixed height and width will work!

### TouchableHighlight

TouchableHighlight component can only has one child element, thus if we want to have multiple children elements, wrap them into a single view container.

### Navigator

Finally using Navigator instead of NavigatorIOS, there are several important things to remember:

- we have an `renderScene` method in index.ios.js that defines what component to render when there is an scene being pushed.
```javascript
// In parent component, we define renderScene method:
renderScene(route, navigator) {
   if(route.name == 'Main') {
     return <Main navigator={navigator} {...route.passProps} />
   }
   if(route.name == 'Home') {
     return <Home navigator={navigator} {...route.passProps} />
   }
},

// And in child component, we put all data we want to pass to next scene in route object.
_navigate(property){
  this.props.navigator.push({
    name: 'Home',
    passProps: {
      name: property
    }
  })
}

<TouchableHighlight onPress={ () => this._navigate('Hello World') }>
    <Text>GO To View</Text>
</TouchableHighlight>
```
And utilizing the spread syntax of passing properties, we can easily allow next scene to use the data passed from the previous scene, the one being trigger(ususally by pressing).

- The problem of "this". In the above example, we use the ES6 arrow syntax, which automatically bind "this" for us, which means that the "this" inside the function we called points to the current component. However, if we use common function assignment like `onPress={this.onPress.bind(this)}`, we have to manually bind this to it!!!

check [this post](https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30#.1kuxzxyps) for more information. And refer to the source code of example [navigator example](https://rnplay.org/apps/9_1QSA).

### TabBarIOS

Check [this post](https://devdactic.com/react-native-tab-bar/) for more helpful information.

```javascript
render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'welcome'}
          systemIcon="featured"
          onPress={() => {
              this.setState({
                  selectedTab: 'welcome',
              });
          }}>
            <Welcome/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'more'}
          systemIcon="featured"
          onPress={() => {
                this.setState({
                    selectedTab: 'more',
                });
          }}>
          <More/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

```
### ProgressBar

Using `Animated.View` to display progressBar, pay attention to the fading-away effect of progressBar, if we choose to use `setTimeout(() => {this.setState({progressOpacity: 0})}, 2);`, use the arrow syntax instead of function syntax, since `this` in function refers to window instead of component itself.

### Test on real device

- Change from localhost to my computer's IP.
- [Add one more key to info.plist](https://gist.github.com/andrewsardone/91797ff9923b9ac6ea64)

## Data

### Grab data from RSS

Here is a handy website that transforms rss feed into json, and provides a API for that: http://rss2json.com/. For example, my blog's rss feed being transformed to json is: http://rss2json.com/api.json?rss_url=http%3A%2F%2Fchocoluffy.com%2Fatom.xml. Then using this json file, we can have a much more consistent and clear structure to formatize into RN app.
