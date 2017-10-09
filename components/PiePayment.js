import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

import PaymentDialogue from './PaymentDialogue'

/**
  *  Props[ publicKey:int, wallet:string, commission:double, amount:double ]
  */

class PiePayment extends Component {

  constructor(props) {
    super(props)
    this.handleInitPayment = this.initPayment.bind(this)
    this.state = {
      sentData: {},
      init: false,
    }
  }

  initPayment() {

  }

  _navigate(passProps) {
    // this.props.navigator.push({
    //   name: 'PiePayment',
    //   passProps
    // })
    this.setState({ init: true })
  }

  render() {
    let { children: Children, publicKey = '', wallet = 'default', commission = 0, amount = 0 } = this.props
    if(publicKey.length && amount) {
      let sentData = { publicKey, wallet, commission, amount }
      this.setState({ sentData, init: true })
    }

    return (
      <View>
          {this.state.init &&
            <Text>Hola</Text>}
          {!this.state.init &&
          this.props.children}
      </View>
    )
  }
}

export { PiePayment as default, PaymentDialogue}
