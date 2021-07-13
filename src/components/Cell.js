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
import {set_gridsize} from '../actions';

class Cell extends Component {
  render() {
    return (
        <TouchableOpacity
        onPress = {()=>{
            console.log(this.props.board_map)
        }}
        >
      <View
        style={{
          backgroundColor: '#f1f1f1',
          borderColor: 'black',
          borderWidth: 5,
          width:Dimensions.get('window').width/this.props.grid_size - 5,
          height: Dimensions.get('window').width/this.props.grid_size - 5,
        }}>
            

        </View>
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
 
});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    board_map: state.board_map
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_gridsize: size => dispatch(set_gridsize(size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
