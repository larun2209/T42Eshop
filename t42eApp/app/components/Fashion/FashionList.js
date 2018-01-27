import React from 'react';
import {  Alert, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { getFashionList } from '../hasuraApi';
import Fashion from './Fashion';
import FashionRow from './FashionRow';


export default class FashionList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      articleList: [],
      currentArticleId: null,
      
    }
    this.articleClicked = this.articleClicked.bind(this);
    
  }

  async componentDidMount(){
    fashiontext='Integer'
    let articleList = await getFashionList(fashiontext);

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
            <Fashion articleId={this.state.currentArticleId} />
            :
            <FashionRow articleList={this.state.articleList} articleCallback={this.articleClicked} />
          }
        </Container>
      );
    
    }
}
