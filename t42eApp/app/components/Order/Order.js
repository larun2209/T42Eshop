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

import { getArticleList } from '../hasuraApi';


export default class Order extends Component {

    constructor(props){
        super(props);
        this.state={
          articleList: [],
            
        }
        
      }
      async componentDidMount(){
        
            let articleList = await getArticleList();
            
            
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
    render() {
        const showList = () => {
            return this.state.articleList.map((article, i) => {
              
              return (
                <Card key={i}>
                  <CardItem >
                    <Text> {article.title} </Text>
                  </CardItem>
                </Card>
              );
            });
          };
        return (
            <Container >
               <Header style={{justifyContent:'space-between',backgroundColor:"#FF00FF"}}>
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