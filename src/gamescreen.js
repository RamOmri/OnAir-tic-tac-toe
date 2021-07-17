import React, {Component} from 'react';
import {
  BackHandler,
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {
  set_current_player,
  reset_game,
  set_winner,
} from './redux/actions';

import Board from './components/Board';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick = () => {
    /*On hardware back button press alert asks whether user wants to quit the game. 
    If yes return to intro screen*/
    Alert.alert('', 'Are you sure that you want to quit the game?', [
      {
        text: 'Yes',
        onPress: () => {
          this.props.reset_game();
          this.props.navigation.popToTop();
        },
      },
      {
        text: 'No',
      },
    ]);
    return true;
  };
  onNextTurn = () => {
    this.setState({counter: this.state.counter + 1});
    if (this.state.counter == this.props.grid_size * this.props.grid_size)
      this.props.set_winner('Tie');
  };
  render() {
    return (
      <>
        <View style={styles.container}>
          <Image
            source={require('./img/onair-black-logo.png')}
            style={styles.logo}
          />
          <View style={styles.board}>
            <Board onNextTurn={this.onNextTurn} />
          </View>
          <Text style={styles.text}>
            {(!this.props.winner && 'Current player') ||
              (this.props.winner == 'Tie' && this.props.winner) ||
              'Winner!!!'}
          </Text>
        {  /*
              Images change shape and colour in accordance with whose turn it is
          */}
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Image
              style={{
                height: Dimensions.get('window').width / (this.props.current_player == 'crosses' ? 4 : 5),
              width: Dimensions.get('window').width / (this.props.current_player == 'crosses' ? 4 : 5),
              resizeMode: 'stretch',
              margin: 10,
              borderRadius: 20,}}
              source={
                this.props.current_player == 'crosses'
                  ? require('./img/Cross-green.png')
                  : require('./img/Cross-red.png')
              }
            />
            <Image
              style={{
                height: Dimensions.get('window').width / (this.props.current_player == 'knots' ? 4 : 5),
              width: Dimensions.get('window').width / (this.props.current_player == 'knots' ? 4 : 5),
              resizeMode: 'stretch',
              margin: 10,
              borderRadius: 20,}}
              source={
                this.props.current_player == 'knots'
                  ? require('./img/Knot-green.png')
                  : require('./img/Knot-red.png')
              }
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.reset_game();
              this.props.navigation.pop();
            }}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              Start A New Game
            </Text>
          </TouchableOpacity>
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
  text: {
    color: 'white',
    fontSize: 25,
    marginTop: 18,
  },
  board: {
    marginTop: 8,
    borderWidth: 6,
    borderColor: 'white',
  },
  button: {
    marginTop: 20,
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e31414',
    borderRadius: 50,
  },
  logo: {
    marginTop: 25,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 5,
    marginBottom: 5,
    resizeMode: 'stretch',
  },
});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    board_map: state.board_map,
    current_player: state.current_player,
    winner: state.winner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset_game: () => dispatch(reset_game()),
    set_current_player: player => dispatch(set_current_player(player)),
    set_winner: winner => dispatch(set_winner(winner)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
