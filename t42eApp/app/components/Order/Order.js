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

import { getOrderList } from '../hasuraApi';


export default class Order extends Component {

    constructor(props){
        super(props);
        this.state={
          orderList: [],
            
        }
        
      }
      async componentDidMount(){
        
            let orderList = await getOrderList();
            
            
            if(orderList.status === 200){
              orderListJson = await orderList.json();
              this.setState({
              orderList: await orderListJson
              });
              
            }
            else {
              if (orderList.status === 504) {
                Alert.alert('Network error', 'Check your internet connection');
              } else {
                Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
              }
            }
                    
          }  
    render() {
        const showList = () => {
            return this.state.orderList.map((order, i) => {
              
              return (
                <Card key={i}>
                  <CardItem header style={{backgroundColor:'#F0FFFF'}}>
                    <Text>Product Name: {order.order_prodname} </Text>
                  </CardItem>
                  <CardItem footer>  
                    <Text> Price:{order.order_prodprice} </Text>
                  </CardItem>
                </Card>
              );
            });
          };
        return (
            <Container >
               <Header style={{justifyContent:'space-between',backgroundColor:"#7B68EE"}}>
               <Item>
                  <Icon  name="ios-happy-outline"/>
                  <Text> Your recent orders! </Text>  
                          
               </Item> 
               </Header>
               <Content style={styles.content} padder>
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


AppRegistry.registerComponent('Order', () => Order);