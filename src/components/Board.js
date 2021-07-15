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
    this.state = {
      cells: [],
    };
    for (let i = 0; i < this.props.grid_size; i++) {
      this.set_columns(i);
    }
  }

  set_columns = x => {
    let cells = [];
    let board_column = [];
    
    for (let i = 0; i < this.props.grid_size; i++) {
     let key = i + this.state.cells.length*this.props.grid_size
      cells.push(
        <Cell
          key={key} 
          onMoveMade={(x, y, key) => this.onMoveMade(x, y, key)}
          xIndex={x}
          yIndex={i}
        />,
      );
      board_column.push(0);
    }
    this.state.cells.push(cells);
    this.props.add_column(board_column);
  };

  onMoveMade = (x, y, key) => {

    this.state.cells[x][y] = (
      <Image
      key = {key}
        style={{
          width: Dimensions.get('window').width / this.props.grid_size - 5,
          height: Dimensions.get('window').width / this.props.grid_size - 5,
          resizeMode: 'stretch',
          borderWidth:6,
          borderColor:'black',
          borderRadius: 20,
        }}
        source={this.set_cell_identity()}
      />
    );
    this.set_player();
    this.props.onNextTurn();
  };
  set_cell_identity = () => {
    if (this.props.current_player == 'crosses') {
      return require('../img/Cross-red.png');
    } else {
      return require('../img/Knot-red.png');
    }
  };
  set_player = () => {
    this.props.set_current_player(
      this.props.current_player == 'crosses' ? 'knots' : 'crosses',
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.column_container}>{this.state.cells[0]}</View>
        <View style={styles.column_container}>{this.state.cells[1]}</View>
        <View style={styles.column_container}>{this.state.cells[2]}</View>

        {this.props.grid_size >= 4 && (
          <View style={styles.column_container}>{this.state.cells[3]}</View>
        )}
        {this.props.grid_size >= 5 && (
          <View style={styles.column_container}>{this.state.cells[4]}</View>
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
