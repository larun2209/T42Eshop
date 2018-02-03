import React from 'react';
import { Alert,StyleSheet} from 'react-native';
import { Container, Text, Button, Card, CardItem, Icon, Header, Left, Body, Title, Content, Right, Spinner,Item} from 'native-base'
import { getProduct } from '../hasuraApi'
import { AddtoCart } from '../hasuraApi'

export default class Grocery extends React.Component {

  constructor(props){
    super(props);
    this.state={
      groceryId: props.groceryId,
      groceryObj: null,
      
    }
  } 

  async componentDidMount(){
    let groceryObj = await getProduct(this.state.groceryId);
    if(groceryObj.status === 200){
      groceryObjJson = await groceryObj.json();
      this.setState({
        groceryObj: groceryObjJson[0]
      });
    } else {
      if (groceryObj.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    let cartObj = await AddtoCart(this.state.groceryObj);
    if(cartObj.status === 200){
     Alert.alert('Succussfully added to cart');
      }
    else {
      if (cartObj.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }
    
  }

  render() {
    if(this.state.groceryObj !== null ){
      return (
        <Container>
          <Header style={{justifyContent:'space-between',backgroundColor:"#00FFFF"}}>
          <Item>
             <Icon  name="ios-happy-outline"/>
             <Text> Grocery accessory added to cart! </Text>  
                     
          </Item> 
          </Header>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>Product:{this.state.groceryObj.prod_name}</Text>
              </CardItem>
              <CardItem>
                <Text>Description:{this.state.groceryObj.prod_desc}</Text>
              </CardItem>
              <CardItem footer>
                <Text>Price: {this.state.groceryObj.prod_price}</Text>
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