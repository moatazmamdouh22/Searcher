import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Splash from './app/Splash';
import RootNavigation from './app/RootNavigation';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RootNavigation/>
    );
  }
}


