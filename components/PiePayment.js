import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

/**
  *  Props[ publicKey:int, wallet:string, commission:double, amount:double ]
  */

export default class PiePayment extends Component {

  constructor(props) {
    super(props)
    this.handleInitPayment = ::this.initPayment
    this.state = {
      sentData: {},
      init: false,
    }
  }

  initPayment() {

  }

  render() {
    let { publicKey = '', wallet = 'default', commission = 0, amount = 0 } = this.props
    if(publicKey.length && amount) {
      let = sentData = { publicKey, wallet, commission, amount }
      this.setState({ sentData, init: true })
    }

    return (
      <View>
        {this.state.init &&
          <PaymentDialogue sentData={this.state.sentData} />}
        {!this.state.init &&
        this.props.children}
      </View>
    )
  }
}
