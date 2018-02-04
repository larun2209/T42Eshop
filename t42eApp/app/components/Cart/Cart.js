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
import CartRow from './CartRow';

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state={
          cartList: [],
          currentCartId: null,  
            
        }
        this.onCartPressed = this.onCartPressed.bind(this); 
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
        
        return (
            <Container style={{alignItems: 'center', justifyContent: 'center'}}>
              
              {
                 (this.state.currentCartId !== null)
                 ?
                 <CartProd cartId={this.state.currentCartId}/>
                 :
                 <CartRow cartList={this.state.cartList} cartCallback={this.onCartPressed} />
               }
                              
               
                       
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