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
import {set_current_player} from '../actions';

class Cell extends Component {
  state = {
    identity: null,
  };

  handlePress = () => {
    this.set_cell_identity();
    this.set_player();
  };
  set_cell_identity = () => {
    if (this.props.current_player == 'crosses') {
      this.setState({identity: 'crosses'});
    } else {
      this.setState({identity: 'knots'});
    }
  };
  set_player = () => {
    this.props.set_current_player(this.state.identity);
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
          {this.state.identity === 'crosses' && (
            <Image
              style={{
                width:
                  Dimensions.get('window').width / this.props.grid_size - 9,
                height:
                  Dimensions.get('window').width / this.props.grid_size - 9,
                resizeMode: 'stretch',
                borderRadius: 20,
              }}
              source={require('../img/Cross-red.png')}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    board_map: state.board_map,
    current_player: state.current_player,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_current_player: player => dispatch(set_current_player(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
