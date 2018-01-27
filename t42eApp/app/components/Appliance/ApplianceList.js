import React from 'react';
import {  Alert, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { getApplianceList } from '../hasuraApi';
import Appliance from './Appliance';
import ApplianceRow from './ApplianceRow';


export default class ApplianceList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      articleList: [],
      currentArticleId: null,
      
    }
    this.articleClicked = this.articleClicked.bind(this);
    
  }

  async componentDidMount(){
    appliancetext='amet'
    let articleList = await getApplianceList(appliancetext);

    if(articleList.status === 200){
      articleListJson = await articleList.json();
      this.setState({
        articleList: await articleListJson
      });
    }
    else {
      if (articleList.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    

  }

  articleClicked(id){
    this.setState ({
      currentArticleId: id
    })
  }

  

  render() {
    
      return (
        <Container style={{alignItems: 'center', justifyContent: 'center'}}>
          {
            (this.state.currentArticleId !== null)
            ?
            <Appliance articleId={this.state.currentArticleId} />
            :
            <ApplianceRow articleList={this.state.articleList} articleCallback={this.articleClicked} />
          }
        </Container>
      );
    
    }
}
