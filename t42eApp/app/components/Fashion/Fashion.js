import React from 'react';
import { Alert,StyleSheet} from 'react-native';
import { Container, Text, Button, Card, CardItem, Icon, Header, Left, Body, Title, Content, Right, Spinner,Item} from 'native-base'
import { getArticle } from '../hasuraApi'

export default class Fashion extends React.Component {

  constructor(props){
    super(props);
    this.state={
      articleId: props.articleId,
      articleObj: null,
      
    }
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
    if(this.state.articleObj !== null ){
      return (
        <Container>
          <Header style={{justifyContent:'space-between',backgroundColor:"#00FF00"}}>
          <Item>
             <Icon  name="ios-happy-outline"/>
             <Text> Fashion item added to cart! </Text>  
                     
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

    }
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color='black' />
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