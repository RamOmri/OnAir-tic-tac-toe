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
    console.log(this.props.grid_size)
    return (
        <>
        <View style = {{flex:1, backgroundColor:'black'}}>
            <Board />
        </View>
        
        </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
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