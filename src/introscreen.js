import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class IntroScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./img/onair-red-logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('game-screen');
          }}>
          <Text style={styles.buttonText}>Play Now</Text>
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
  logo: {
    marginTop: 25,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    resizeMode: 'stretch',
    borderRadius: 1000,
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
