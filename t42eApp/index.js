import React, { Component } from "react";
import { AppRegistry } from 'react-native';
import App from './App';
import { DrawerNavigator } from "react-navigation";



import HomeScreen from './app/components/HomeScreen/HomeScreen';
import FashionList from './app/components/Fashion/FashionList';
import GroceryList from './app/components/Grocery/GroceryList';
import ApplianceList from './app/components/Appliance/ApplianceList';
import Cart from './app/components/Cart/Cart';
import Order from './app/components/Order/Order';
import SideBar from './app/components/SideBar/SideBar';
import AuthScreen from './app/components/AuthScreen/AuthScreen';

const HomeScreenRouter = DrawerNavigator(
    {
      Home:{ screen: HomeScreen},
      Fashion: { screen: FashionList },
      Grocery: { screen: GroceryList },
      Appliance: {screen: ApplianceList},
      MyCart:{screen:Cart},
      MyOrder:{screen:AuthScreen},
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  );

export default HomeScreenRouter;

AppRegistry.registerComponent('t42eApp', () => App);
