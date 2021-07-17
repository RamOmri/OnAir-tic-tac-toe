import React, {Component} from 'react';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import {connect} from 'react-redux';
import {set_current_player} from '../redux/actions';

class Cell extends Component {
  /*
    Simple cell component to determine the size of the playing tiles on the board. A call back function is 
    triggered when the cell gets pressed which returns the coordinates of the cell. 
  */
  constructor(props) {
    super(props);
    this.state = {
      xIndex: this.props.xIndex,
      yIndex: this.props.yIndex,
    };
  }

  handlePress = () => {
    if (this.props.winner) return;
    this.props.onMoveMade(this.state.xIndex, this.state.yIndex, this.props.key, 'knots');
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
            width: Dimensions.get('window').width / this.props.grid_size - 8,
            height: Dimensions.get('window').width / this.props.grid_size - 8,
          }}></View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    current_player: state.current_player,
    board_map: state.board_map,
    winner: state.winner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_current_player: player => dispatch(set_current_player(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
