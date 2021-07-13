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
import { set_gridsize } from '../actions';

 class Cell extends Component {
  render() {
    return (
    <View style={styles.container}>


    </View>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1/this.props.grid_size,
    margin:50,
    backgroundColor: '#f0eeed',
    alignItems: 'center',
    justifyContent: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
