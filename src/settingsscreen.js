import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {set_gridsize} from './actions';

class settingsscreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./img/onair-black-logo.png')}
          style={styles.logo}
        />
        <Text
          style={{
            ...styles.select_gridsize_font,
            color: 'white',
            fontSize: 19,
            marginTop: 20,
          }}>
          Select Grid Dimensions
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              ...styles.select_gridsize,
              backgroundColor: this.props.grid_size == 3 ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_gridsize(3);
            }}>
            <Text style={styles.select_gridsize_font}>3X3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.select_gridsize,
              backgroundColor: this.props.grid_size == 4 ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_gridsize(4);
            }}>
            <Text style={styles.select_gridsize_font}>4X4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.select_gridsize,
              backgroundColor: this.props.grid_size == 5 ? 'green' : 'white',
            }}
            onPress={() => {
              this.props.set_gridsize(5);
            }}>
            <Text style={styles.select_gridsize_font}>5X5</Text>
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
  select_gridsize: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width / 3 - 15,
    width: Dimensions.get('window').width / 3 - 15,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 20,
  },
  select_gridsize_font: {
    fontSize: 26,
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_gridsize: size => dispatch(set_gridsize(size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(settingsscreen);
