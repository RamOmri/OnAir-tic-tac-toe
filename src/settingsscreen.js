/*
    Settings screen is used to determine grid size and whether or not the game is against the algorithm or
    an opponent. 
*/
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import {connect} from 'react-redux';
import {set_gridsize, set_is_against_alg} from './redux/actions';

class settingsscreen extends Component {
  constructor(props) {
    super(props);
    //prevent back press to intro screen
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./img/onair-black-logo.png')}
          style={styles.logo}
        />
        <Text
          style={{
            ...styles.selection_font,
            color: 'white',
            fontSize: 19,
            marginTop: 20,
          }}>
          Select Grid Dimensions
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              ...styles.selection,
              backgroundColor: this.props.grid_size == 3 ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_gridsize(3);
            }}>
            <Text style={styles.selection_font}>3X3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.selection,
              backgroundColor: this.props.grid_size == 4 ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_gridsize(4);
            }}>
            <Text style={styles.selection_font}>4X4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.selection,
              backgroundColor: this.props.grid_size == 5 ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_gridsize(5);
            }}>
            <Text style={styles.selection_font}>5X5</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...styles.selection_font,
            color: 'white',
            fontSize: 19,
            marginTop: 20,
          }}>
          Who are you playing against?
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              ...styles.selection,
              backgroundColor: !this.props.alg ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_is_against_alg(false);
            }}>
            <Text style={styles.selection_font}>Human</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.selection,
              backgroundColor: this.props.alg ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_is_against_alg(true);
            }}>
            <Text style={styles.selection_font}>Computer</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('game-screen');
          }}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  currentPlayer: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3,
    resizeMode: 'stretch',
  },
  selection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width / 3 - 15,
    width: Dimensions.get('window').width / 3 - 15,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 20,
  },
  selection_font: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    marginTop: 25,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 5,
    marginBottom: 5,
    resizeMode: 'stretch',
  },
  button: {
    marginTop: 20,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e31414',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f0eeed',
  },
});

const mapStateToProps = state => {
  return {
    grid_size: state.grid_size,
    alg: state.isAgainstAlg,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_gridsize: size => dispatch(set_gridsize(size)),
    set_is_against_alg: is => dispatch(set_is_against_alg(is)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(settingsscreen);
