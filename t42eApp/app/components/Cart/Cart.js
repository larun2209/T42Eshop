import React, { Component } from "react";

import {
  StyleSheet,
  View,
  AppRegistry,
} from "react-native";

import {
  Container,
  Header,
  Button,
  Icon,
  Item,
  Content,
  Text,
  Footer,
  FooterTab,
  Input,
  Card,
  CardItem
} from "native-base";

import { getCartList } from '../hasuraApi';
import CartProd from './CartProd';

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state={
          cartList: [],
          currentCartId: null,  
            
        }
        
      }
      async componentDidMount(){
        
            let cartList = await getCartList();
            
            
            if(cartList.status === 200){
              cartListJson = await cartList.json();
              this.setState({
                cartList: await cartListJson
              });
              
            }
            else {
              if (cartList.status === 504) {
                Alert.alert('Network error', 'Check your internet connection');
              } else {
                Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
              }
            }
                    
          }  

      onCartPressed(id){
            this.setState ({
              currentCartId: id
            })
          
          }      
    render() {
        const showList = () => {
            return this.state.cartList.map((cart, i) => {
              
              return (
                <Card key={i}>
                  <CardItem style={{backgroundColor:'#FFFACD'}} button onPress={() => {
              this.onCartPressed(cart.cart_id);
            }} >
                    <Text> {cart.cart_prodname} </Text>
                  </CardItem>
                </Card>
              );
            });
          };
        return (
            <Container style={styles.container}>
               <Header style={{justifyContent:'space-between',backgroundColor:"#0000CD"}}>
               <Item>
                  <Icon  name="ios-happy-outline"/>
                  <Text> Listing cart items...Select to place order! </Text>   
                          
               </Item> 
               </Header>
               <Content style={styles.content} padder>
               {
                 (this.state.currentCartId !== null)
                 ?
                 <CartProd productId={this.state.currentCartId}/>
                 :
                 showList()
               }
                              
               </Content>
                       
            </Container>
        );
    }
}
const styles = StyleSheet.create({

  backarrow:{
            color:"#4169e1"
            },
  header:   {
            backgroundColor: "#FFF",
            },
  content: {
            backgroundColor: "#e6e6fa",
            },
  footermb: {
        backgroundColor: "#FFF",
            },
    
});


AppRegistry.registerComponent('Cart', () => Cart);