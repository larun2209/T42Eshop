import React from 'react';
import {Container, Card, CardItem, Header, Title, Content, Button, Left, Text, Icon, Body, Right, Spinner,Item,Thumbnail} from 'native-base';
import { View, ActivityIndicator,StyleSheet,Dimensions} from 'react-native';

const deviceWidth = Dimensions.get("window").width;

export default class FashionRow extends React.Component {

  onFashionPressed(id){
    this.props.fashionCallback(id);
  }
    
  render() {
    const showList = () => {
      return this.props.fashionList.map((fashion, i) => {
        
        return (
          <Card key={i}>
            <CardItem  button onPress={() => {
              this.onFashionPressed(fashion.prod_id);
            }}>
              <Text> {fashion.prod_name} </Text>
            </CardItem>
            <CardItem>
             <Thumbnail
                style={{
                alignSelf: "center",
                height: 150,
                resizeMode: "cover",
                width: deviceWidth / 1.18,
                marginVertical: 5
                        
                }}
                source= {{uri:'https://filestore.clarinetist87.hasura-app.io/v1/file/'+ fashion.prod_picurl}}
                />
            </CardItem>
          </Card>
        );
      });
    };

    return (
          <Container>
            <Header style={{justifyContent:'space-between',backgroundColor:"#FFFF00"}}>
            <Item>
               <Icon  name="ios-happy-outline"/>
               <Text> Listing fashion items...Select to add to cart! </Text>  
                       
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