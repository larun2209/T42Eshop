import React from 'react';
import {Container, Card, CardItem, Header, Title, Content, Button, Left, Text, Icon, Body, Right, Spinner,Item} from 'native-base';
import { View, ActivityIndicator,StyleSheet} from 'react-native';

export default class ApplianceRow extends React.Component {

  onAppliancePressed(id){
    this.props.applianceCallback(id);
  }
    
  render() {
    const showList = () => {
      return this.props.applianceList.map((appliance, i) => {
        
        return (
          <Card key={i}>
            <CardItem button onPress={() => {
              this.onAppliancePressed(appliance.prod_id);
            }}>
              <Text> {appliance.prod_name} </Text>
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
               <Text> Listing appliance items...Select to add to cart! </Text>  
                       
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