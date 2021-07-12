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

export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./img/onair-red-logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity>
        <Text style={{color: 'white'}}>
            Play Now
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    resizeMode: 'stretch',
    borderRadius:1000
  },
});
