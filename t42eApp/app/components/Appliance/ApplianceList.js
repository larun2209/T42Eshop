import React from 'react';
import {  Alert, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { getApplianceProductList } from '../hasuraApi';
import Appliance from './Appliance';
import ApplianceRow from './ApplianceRow';


export default class ApplianceList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      applianceList: [],
      currentApplianceId: null,
      
    }
    this.applianceClicked = this.applianceClicked.bind(this);
    
  }

  async componentDidMount(){
    
    let applianceList = await getApplianceProductList();

    if(applianceList.status === 200){
      applianceListJson = await applianceList.json();
      this.setState({
        applianceList: await applianceListJson
      });
    }
    else {
      if (applianceList.status === 504) {
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    

  }

  applianceClicked(id){
    this.setState ({
      currentApplianceId: id
    })
    console.log('in appliance clicked',this.state.currentApplianceId)
  }

  

  render() {
    
      return (
        <Container style={{alignItems: 'center', justifyContent: 'center'}}>
          {
            (this.state.currentApplianceId !== null)
            ?
            <Appliance applianceId={this.state.currentApplianceId} />
            :
            <ApplianceRow applianceList={this.state.applianceList} applianceCallback={this.applianceClicked} />
          }
        </Container>
      );
    
    }
}
