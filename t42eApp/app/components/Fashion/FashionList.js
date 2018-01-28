import React from 'react';
import {  Alert, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { getFashionProductList } from '../hasuraApi';
import Fashion from './Fashion';
import FashionRow from './FashionRow';


export default class FashionList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      fashionList: [],
      currentFashionId: null,
      
    }
    this.fashionClicked = this.fashionClicked.bind(this);
    
  }

  async componentDidMount(){
    
    let fashionList = await getFashionProductList();

    if(fashionList.status === 200){
      fashionListJson = await fashionList.json();
      this.setState({
        fashionList: await fashionListJson
      });
    }
    else {
      if (fashionList.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    

  }

  fashionClicked(id){
    this.setState ({
      currentFashionId: id
    })
  }

  

  render() {
    
      return (
        <Container style={{alignItems: 'center', justifyContent: 'center'}}>
          {
            (this.state.currentFashionId !== null)
            ?
            <Fashion fashionId={this.state.currentFashionId} />
            :
            <FashionRow fashionList={this.state.fashionList} fashionCallback={this.fashionClicked} />
          }
        </Container>
      );
    
    }
}
