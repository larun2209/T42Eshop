import React from 'react';
import {  Alert, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { getGroceryProductList } from '../hasuraApi';
import Grocery from './Grocery';
import GroceryRow from './GroceryRow';


export default class GroceryList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      groceryList: [],
      currentGroceryId: null,
      
    }
    this.groceryClicked = this.groceryClicked.bind(this);
    
  }

  async componentDidMount(){
    
    let groceryList = await getGroceryProductList();

    if(groceryList.status === 200){
      groceryListJson = await groceryList.json();
      this.setState({
        groceryList: await groceryListJson
      });
    }
    else {
      if (groceryList.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    

  }

  groceryClicked(id){
    this.setState ({
      currentGroceryId: id
    })
  }

  

  render() {
    
      return (
        <Container style={{alignItems: 'center', justifyContent: 'center'}}>
          {
            (this.state.currentGroceryId !== null)
            ?
            <Grocery groceryId={this.state.currentGroceryId} />
            :
            <GroceryRow groceryList={this.state.groceryList} groceryCallback={this.groceryClicked} />
          }
        </Container>
      );
    
    }
}
