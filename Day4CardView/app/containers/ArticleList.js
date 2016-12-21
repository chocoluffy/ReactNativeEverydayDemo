import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
  ListView,
  ScrollView,
  InteractionManager,
  ProgressBarAndroid,
  Platform,
  Image,
  View
} from 'react-native';
import RequestBuilder from '../http/RequestBuilder';
import {fetchArticles} from '../actions/article';
import DetailArticleCmp from './DetailArticleCmp';
class ArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  render() {
    const {dispatch, read, category} = this.props;
    let nowRead;
    switch (category) {
      case 'Android':
        nowRead = read[0];
        break;
      case 'iOS':
        nowRead = read[1];
        break;
      default:
        nowRead = read[2];
    }
    let isFirstLoaded = nowRead.articleList.length != 0;
    return(

        <ListView
            enableEmptySections={true}
            style={{flex: 1}}
            renderFooter={this._renderFooter.bind(this, isFirstLoaded)}
            onEndReached={this._onEndReached.bind(this, dispatch, nowRead, category)}
            dataSource={this.dataSource.cloneWithRows(nowRead.articleList)}
            renderRow={this._renderRow.bind(this)}
            //renderSectionHeader  = {this._renderSectionHeader.bind(this)}
            initialListSize={10}
            onEndReachedThreshold={10}
            pageSize={nowRead.articleList.length}
            refreshControl={
                <RefreshControl
                  refreshing={nowRead.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                  progressBackgroundColor="#ffffff"/>}
          />

    );
  }

  componentWillMount(){
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, category} = this.props;
      dispatch(fetchArticles(category));
    });
  }

  _onRefresh() {
    this.componentWillMount();
  }

  _onItemClick(rowData,rowID){
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
            name: 'DetailArticleCmp',
            component: DetailArticleCmp,
            params:{
              rowData
            }
        })
    }
  }
  _renderSectionHeader(sectionData, sectionID){
    retrun(
      <View>
        <Text>123</Text>
      </View>
    )

  }
  _renderRow(rowData, sectionID, rowID, highlightRow){
    let date = (
      <Text style={{}}>{this._formatDate(rowData.topic_name)}</Text>
    );
    return(
      <TouchableHighlight underlayColor="rgba(34, 1, 38, 0.7)" onPress={()=>this._onItemClick(rowData,rowID)}>
        <View style={{flexDirection:'row',padding:12,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#c9c9c9'}}>
          {/*<Image
            source = {{uri: rowData.small_photo}}
            style = {{height:80,width:120}}
          />*/}
          <View style={{marginLeft:10,flex:1}}>
            <Text style={{fontSize: 15,fontWeight: 'bold',color:'black'}}>{rowData.title}</Text>
            <View style={{marginTop: 4, justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{}}>{'作者：' + rowData.topic_name}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _onEndReached(dispatch, nowRead, category, index){
    if(typeof(nowRead) == 'undefined' || nowRead.isFirstLoaded){
      return;
    }
    // wait till animation finishes, then dispatch an action!
    InteractionManager.runAfterInteractions(() => {
      dispatch(fetchArticles(category, nowRead.index + 1, true, nowRead));
    });
  }
  _renderFooter(isFirstLoaded){
    if(!isFirstLoaded){
      return;
    }

    if (1) {
      if (Platform.OS === 'ios') {
        return (
          <View style={styles.progress}></View>
        );
      }else {
        return (
          <View style={styles.progress}>
            <ProgressBarAndroid />
          </View>
        );
      }
    } else {
      return (
        <View style={styles.progress}>
          <Text style={{color: 'rgba(0, 0, 0, 0.3)'}}>数据已结加载完了- -|||</Text>
        </View>
      );
    }
  }
  _formatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  progress:{
    marginVertical: 20,
    paddingBottom: 20,
    alignSelf: 'center'
  },
});
export{ ArticleList as default };
