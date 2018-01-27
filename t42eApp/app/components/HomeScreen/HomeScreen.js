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


import { getSearchList } from '../hasuraApi';
import { getArticle } from '../hasuraApi';

export default class HomeScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
        articleList: [],
        searchTextBox : '',
        currentArticleId: null,  
        articleObj: null,
      }
      
  }

handleSearchChange = searchTextBox => {
    this.setState({
        ...this.state,
        searchTextBox: searchTextBox
    })
}

handleSearchPressed = async () => {
    let articleList = await getSearchList(this.state.searchTextBox);
    
    
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
 

  onArticlePressed(id){
    this.setState ({
      currentArticleId: id
    })
  }


  async componentDidMount(){
    let articleObj = await getArticle(this.state.articleId);
    if(articleObj.status === 200){
      articleObjJson = await articleObj.json();
      this.setState({
        articleObj: articleObjJson[0]
      });
    } else {
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
            <CardItem button onPress={() => {
              this.onArticlePressed(article.id);
            }}>
              <Text> {article.title} </Text>
            </CardItem>
          </Card>
        );
      });
    };

    const showArticle=()=>{
      return (
        <Container>
          <Header style={{justifyContent:'space-between',backgroundColor:"#00FFFF"}}>
          <Item>
             <Icon  name="ios-happy-outline"/>
             <Text> Product added to cart! </Text>  
                     
          </Item> 
          </Header>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>{this.state.articleObj.title}</Text>
              </CardItem>
              <CardItem>
                <Text>{this.state.articleObj.content}</Text>
              </CardItem>
              <CardItem footer>
                <Text>By: {this.state.articleObj.author.name}</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
      )
    };
    return (
      <Container>
        <Header searchBar style={{justifyContent:'space-between',backgroundColor:"white"}}>
        <Item>
        <Input placeholder="Search for products here!" value={this.state.searchTextBox} onChangeText={this.handleSearchChange}/>
        <Button transparent onPress={this.handleSearchPressed}> 
            <Icon  name="ios-search-outline"/>
        </Button>    

        <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
        </Button>
             
        </Item> 
        </Header>
        <Content padder>
          {
            (this.state.currentArticleId !== null)
            ?
            showArticle()
            :
            showList()
          }
        
        </Content>
        <Footer>
            <FooterTab style={{backgroundColor: "#FFF",borderColor: 'black', borderWidth: 1}}>
                        <Button transparent onPress={() => this.props.navigation.navigate("Fashion")}>
                            <Icon  name="ios-shirt" />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("Grocery")}>
                            <Icon  name="ios-basket" />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("Appliance")}>
                            <Icon  name="ios-phone-portrait" />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("MyCart")}>
                            <Icon  name="ios-cart" />
                        </Button>
                        
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}


AppRegistry.registerComponent('HomeScreen', () => HomeScreen);