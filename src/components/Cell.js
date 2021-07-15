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
import {set_current_player} from '../redux/actions';

class Cell extends Component {
  state = {
    xIndex:this.props.xIndex,
    yIndex:this.props.yIndex
  };

  handlePress = () => {
    this.props.onMoveMade(this.state.xIndex, this.state.yIndex, this.props.key)
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View
          style={{
            backgroundColor: '#f1f1f1',
            borderColor: 'black',
            borderWidth: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width / this.props.grid_size - 5,
            height: Dimensions.get('window').width / this.props.grid_size - 5,
          }}>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    current_player: state.current_player,
    board_map: state.board_map
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_current_player: player => dispatch(set_current_player(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
