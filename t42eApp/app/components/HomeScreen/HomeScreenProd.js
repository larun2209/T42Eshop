import React from 'react';
import { Alert,StyleSheet} from 'react-native';
import { Container, Text, Button, Card, CardItem, Icon, Header, Left, Body, Title, Content, Right, Spinner,Item} from 'native-base'
import { getProduct } from '../hasuraApi'

export default class HomeScreenProd extends React.Component {

  constructor(props){
    super(props);
    this.state={
      productId: props.productId,
      productObj: null,
      
    }
  } 

  async componentDidMount(){
    let productObj = await getProduct(this.state.productId);
    if(productObj.status === 200){
      productObjJson = await productObj.json();
      this.setState({
        productObj: productObjJson[0]
      });
    } else {
      if (productObj.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    
  }

  render() {
    if(this.state.productObj !== null ){
      return (
        <Container>
          <Header style={{justifyContent:'space-between',backgroundColor:"#00FF00"}}>
          <Item>
             <Icon  name="ios-happy-outline"/>
             <Text> product added to cart! </Text>  
                     
          </Item> 
          </Header>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>Product:{this.state.productObj.prod_name}</Text>
              </CardItem>
              <CardItem>
                <Text>Description:{this.state.productObj.prod_desc}</Text>
              </CardItem>
              <CardItem footer>
                <Text>Price: {this.state.productObj.prod_price}</Text>
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