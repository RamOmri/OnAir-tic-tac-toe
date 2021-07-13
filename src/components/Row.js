import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

 class Board extends Row {

  render() {
    return (
    <View style={styles.container}>


    </View>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:50,
    height:
    backgroundColor: '#f0eeed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Board