import React from 'react';
import { Alert,StyleSheet} from 'react-native';
import { Container, Text, Button, Card, CardItem, Icon, Header, Left, Body, Title, Content, Right, Spinner,Item} from 'native-base'
import { getCartProduct } from '../hasuraApi'
import { PlaceOrder } from '../hasuraApi'
import { RemovefromCart } from '../hasuraApi'


export default class CartProd extends React.Component {

  constructor(props){
    super(props);
    this.state={
      cartId: props.cartId,
      cartproductObj: null,
      
    }
  } 

  async componentDidMount(){
    let cartproductObj = await getCartProduct(this.state.cartId);
    if(cartproductObj.status === 200){
        cartproductObjJson = await cartproductObj.json();
      this.setState({
        cartproductObj: cartproductObjJson[0]
      });
    } else {
      if (cartproductObj.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    let orderObj = await PlaceOrder(this.state.cartproductObj,this.state.cartId);
    if(orderObj.status === 200){
     Alert.alert('Order successful');
      }
    else {
      if (orderObj.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    let orderObj1 = await RemovefromCart(this.state.cartproductObj);
    if(orderObj1.status === 200){
     console.log('Moved out of Cart');
      }
    
    
  }

  render() {
    if(this.state.cartproductObj !== null ){
      return (
        <Container>
          <Header style={{justifyContent:'space-between',backgroundColor:"#00FF00"}}>
          <Item>
             <Icon  name="ios-happy-outline"/>
             <Text> product order placed! </Text>  
                     
          </Item> 
          </Header>
          <Content padder>
            
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