import React from 'react';
import {  Alert, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { getGroceryList } from '../hasuraApi';
import Grocery from './Grocery';
import GroceryRow from './GroceryRow';


export default class GroceryList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      articleList: [],
      currentArticleId: null,
      
    }
    this.articleClicked = this.articleClicked.bind(this);
    
  }

  async componentDidMount(){
    grocerytext='mm'
    let articleList = await getGroceryList(grocerytext);

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
            <Grocery articleId={this.state.currentArticleId} />
            :
            <GroceryRow articleList={this.state.articleList} articleCallback={this.articleClicked} />
          }
        </Container>
      );
    
    }
}
