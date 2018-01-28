import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import{
  Container, 
  Header, 
  Title, 
  Left, 
  Icon, 
  Right, 
  Button, 
  Body, 
  Content,
  Card, 
  CardItem,
  Item,
  Text,
  Input,
  Footer,
  FooterTab
  
} from "native-base";


import { getSearchProductList } from '../hasuraApi';
import { getProduct } from '../hasuraApi';
import HomeScreenProd from './HomeScreenProd';

export default class HomeScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
        productList: [],
        searchTextBox : '',
        currentProductId: null,  
        productObj: null,
      }
      
  }

handleSearchChange = searchTextBox => {
    this.setState({
        ...this.state,
        searchTextBox: searchTextBox
    })
}

handleSearchPressed = async () => {
    let productList = await getSearchProductList(this.state.searchTextBox);
    
    
    if(productList.status === 200){
      productListJson = await productList.json();
      this.setState({
      productList: await productListJson
      });
      
    }
    else {
      if (productList.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }
  }
 

  onProductPressed(id){
    this.setState ({
      currentProductId: id
    })
  
  }

  render() {
    const showList = () => {
      return this.state.productList.map((product, i) => {
        
        return (
          <Card key={i}>
            <CardItem button onPress={() => {
              this.onProductPressed(product.prod_id);
            }}>
              <Text> {product.prod_name} </Text>
            </CardItem>
          </Card>
        );
      });
    };

  return (
      <Container>
        <Header searchBar style={{justifyContent:'space-between',backgroundColor:"blue"}}>
        <Item>
        <Icon  name="ios-happy-outline" style={{color:'black'}}/>  
        <Input placeholder="Search for products here!" value={this.state.searchTextBox} onChangeText={this.handleSearchChange}/>
        <Button transparent onPress={this.handleSearchPressed}> 
            <Icon  name="ios-search-outline" style={{color:'black'}}/>
        </Button>    

        <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu"  style={{color:'black'}}/>
        </Button>
             
        </Item> 
        </Header>
        <Content padder>
          {
            (this.state.currentProductId !== null)
            ?
            <HomeScreenProd productId={this.state.currentProductId}/>
            :
            showList()
          }
        
        </Content>
        <Footer>
            <FooterTab style={{backgroundColor: "blue",borderColor: 'black', borderWidth: 1}}>
                        <Button transparent onPress={() => this.props.navigation.navigate("Fashion")}>
                            <Icon  name="ios-shirt" style={{color:'white'}} />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("Grocery")}>
                            <Icon  name="ios-basket" style={{color:'white'}} />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("Appliance")}>
                            <Icon  name="ios-phone-portrait" style={{color:'white'}} />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("MyCart")}>
                            <Icon  name="ios-cart" style={{color:'white'}} />
                        </Button>
                        
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}


AppRegistry.registerComponent('HomeScreen', () => HomeScreen);