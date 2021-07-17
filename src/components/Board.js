/*
 Board component shows a representation of the game and replaces cells with images 
of either crosses or knots in response to a call back function from the cell component.
The board component also contains a minimax agent which can play the game against a human player. 
*/
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import MiniMaxAgent from './MiniMaxAgent';

import {connect} from 'react-redux';
import {add_column, set_gridsize, set_current_player, update_board_map, set_winner} from '../redux/actions';
import Cell from './Cell';
import checkForWinner from './checkForWinner';
var cloneDeep = require('lodash.clonedeep');

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
      agent: new MiniMaxAgent(this.props.grid_size)
    };
    //for loop calls the set columns function which creates the board. 
    //each column is an array of cells
    for (let i = 0; i < this.props.grid_size; i++) {
      this.set_columns(i);
    }
  }

  set_columns = async (x) => {
    /*
        The cells array contains cell components which are then pushed onto another array to form the 
        playing board displayed on thegame screen. 
    */
    let cells = [];
    let board_column = [];

    for (let i = 0; i < this.props.grid_size; i++) {
      let key = i + this.state.cells.length * this.props.grid_size;
      cells.push(
        <Cell
          key={key}
          onMoveMade={(x, y) => this.onMoveMade(x, y)}
          xIndex={x}
          yIndex={i}
        />,
      );
      board_column.push(null);
    }
    this.state.cells.push(cells);
    //function below constructs a map of the board in the redux store. 
   await this.props.add_column(board_column);
  };

  onMoveMade = async (x, y) => {
    /*
      Call back function triggered when a cell is pressed or when the minimax agent makes a move. 
      This function takes x and y coordinates to update the board map and replace a cell with an image
      of a cross or a knot. 
    */
    let key = y + this.props.grid_size * x
    let obj = {x: x, y: y, val: this.props.current_player  == 'crosses'? 'crosses': 'knots' }

    //must check for winner and update board_map and cell before setting the next player
    await this.props.update_board_map(obj) 

    this.change_cell(x, y, key);
    if(checkForWinner(this.props.current_player, this.props.grid_size, this.props.board_map)){
      this.props.set_winner(this.props.current_player)
      return
    }
    else  await this.set_player();   
    
    this.props.onNextTurn();

    //If the current player is knots and the game is against the algorithm, 
    //derive the best move and then call onMoveMade
    if(this.props.current_player == 'knots' && this.props.alg && !this.props.winner){
      let best_move = this.state.agent.bestMove(cloneDeep(this.props.board_map))
      this.onMoveMade(best_move.x, best_move.y)
    }
    
  };
   change_cell = (x, y, key) => {
     /*
      function replaces a cell with an image of cross or knot given x and y coordinates. 
     */
    this.state.cells[x].splice(
      y,
      1,
      <Image
        key={key}
        style={{
          width: Dimensions.get('window').width / this.props.grid_size - 8,
          height: Dimensions.get('window').width / this.props.grid_size - 8,
          resizeMode: 'stretch',
          borderWidth: 6,
          borderColor: 'black',
          borderRadius: 20,
        }}
        source={this.set_cell_identity()}
      />,
    );
  };
  
  set_cell_identity = () => {
    /*
      Function used to derive the correct image to place on the board. 
    */
    if (this.props.current_player == 'crosses') {
      return require('../img/Cross-red.png');
    } else {
      return require('../img/Knot-red.png');
    }
  };
 
  set_player = async () => {
    /*
      Sets the player who plays next after the last player made a move in the store. 
    */
     await this.props.set_current_player(
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
    board_map: state.board_map,
    winner: state.winner,
    alg: state.isAgainstAlg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_gridsize: size => dispatch(set_gridsize(size)),
    add_column: cells => dispatch(add_column(cells)),
    set_current_player: player => dispatch(set_current_player(player)),
    update_board_map : obj => dispatch(update_board_map(obj)),
    set_winner: winner => dispatch(set_winner(winner))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
