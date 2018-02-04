import React from 'react';
import {Container, Card, CardItem, Header, Title, Content, Button, Left, Text, Icon, Body, Right, Spinner,Item} from 'native-base';
import { View, ActivityIndicator,StyleSheet} from 'react-native';

export default class CartRow extends React.Component {

onCartPressed(id){
    this.props.cartCallback(id);
  }
    
  render() {
    const showList = () => {
      return this.props.cartList.map((cart, i) => {
        
        return (
          <Card key={i}>
            <CardItem button onPress={() => {
              this.onCartPressed(cart.cart_id);
            }}>
              <Text> {cart.cart_prodname} </Text>
            </CardItem>
          </Card>
        );
      });
    };

    return (
          <Container>
            <Header style={{justifyContent:'space-between',backgroundColor:"#00FF00"}}>
            <Item>
               <Icon  name="ios-happy-outline"/>
               <Text> Listing cart items...Select to place order! </Text>  
                       
            </Item> 
            </Header>
            <Content style={styles.content} padder >
              {showList()}
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