import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, ScrollView } from 'react-native'
import Modal from 'react-native-modalbox'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import PiePayment, { PaymentDialogue } from './components/PiePayment'

import Colors from './assets/literals/colors'

const Screen = Dimensions.get('window')

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  }

  callback(data) {
    this.setState({isOpen: false})
    console.log(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Click the button to test payment</Text>
        <Text
          onPress={() => this.setState({isOpen: true})} style={styles.btn}
          textStyle={{ textAlign: 'center' }}>Pay</Text>
        <PiePayment
          pubKey="pk_WG3VlzyJ2NhcFbIr"
          wallet="default"
          commission={10}
          amount={5000}
          customer="sales@logicaladdress.com"
          visible={this.state.isOpen}
          callback={(data) => this.callback(data)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    margin: 10,
    backgroundColor: Colors.PrimaryColor,
    color: Colors.white,
    padding: 10
  },
});
