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

class Board extends Component {
  form_grid = () => {
    let components = [];
    for(let i = 0; i < this.props.numCells; i++){

    }

    return components;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.form_grid()}
        <Text>{this.props.grid_size}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: '#f0eeed',
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);
