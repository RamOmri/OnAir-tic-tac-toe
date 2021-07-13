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
import {add_column, set_gridsize, set_current_player} from '../actions';
import Cell from './Cell';

class Board extends Component {
  constructor(props) {
    super(props);
  }
  onMoveMade = () => {
    this.set_player();
  };
  set_player = () => {
    this.props.set_current_player(
      this.props.current_player == 'crosses' ? 'knots' : 'crosses',
    );
  };
  render_column = () => {
    let cells = [];
    let board_column = [];
    for (let i = 0; i < this.props.grid_size; i++) {
      cells.push(<Cell key={i} onMoveMade={this.onMoveMade} />);
      board_column.push(0);
    }
    this.props.add_column(board_column);
    return cells;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.column_container}>{this.render_column()}</View>
        <View style={styles.column_container}>{this.render_column()}</View>
        <View style={styles.column_container}>{this.render_column()}</View>

        {this.props.grid_size >= 4 && (
          <View style={styles.column_container}>{this.render_column()}</View>
        )}
        {this.props.grid_size >= 5 && (
          <View style={styles.column_container}>{this.render_column()}</View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  column_container: {
    backgroundColor: '#f0eeed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    current_player: state.current_player,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_gridsize: size => dispatch(set_gridsize(size)),
    add_column: cells => dispatch(add_column(cells)),
    set_current_player: player => dispatch(set_current_player(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
