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

import {connect} from 'react-redux';
import { set_gridsize } from './actions';

import Board from './components/Board'

class GameScreen extends Component {
  
  render() {
    return (
        <>
        <View style = {styles.container}>
            <Image source = {require('./img/onair-black-logo.png')} 
            style = {styles.logo}/>
            <Board />
        </View>
        
        </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    paddingBottom: 100,
  },
  logo: {
    marginTop: 25,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 5,
    marginBottom:5,
    resizeMode: 'stretch',
  },
});

const mapStateToProps = (state) => {
    return {
      grid_size: state.grid_size,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      set_gridsize: (size) => dispatch(set_gridsize(size)),
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);