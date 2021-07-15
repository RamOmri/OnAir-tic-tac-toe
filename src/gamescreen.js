import React, {Component} from 'react';
import {
  SafeAreaView,
  BackHandler,
  Alert,
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
import {set_current_player, update_board_map, reset_game} from './redux/actions';

import Board from './components/Board';

class GameScreen extends Component {
  constructor(props){
    super(props)
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    Alert.alert('', 
    'Are you sure that you want to quit the game?',
     [
      {
        text: 'Yes',
        onPress: () => {
          this.props.reset_game()
          this.props.navigation.popToTop()
        }
      },
      {
        text: 'No',
      },
    ]);
    return true
  };
  onNextTurn = () =>{
    
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Image
            source={require('./img/onair-black-logo.png')}
            style={styles.logo}
          />
          <View style = {styles.board} >
           <Board onNextTurn = {this.onNextTurn}/>
          </View>
          <Image
            style={styles.currentPlayer}
            source={this.props.current_player == 'knots' ? require('./img/Knot-red.png'): require('./img/Cross-red.png')}
          />
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
  board:{
    marginTop:8,
    borderWidth:6,
    borderColor:'white',
  },  
  currentPlayer: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3,
    resizeMode: 'stretch',
    marginTop: 20,
    borderRadius: 20,
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
    current_player: state.set_current_player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset_game: () => dispatch(reset_game()),
    set_current_player: player => dispatch(set_current_player(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
