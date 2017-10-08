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
    let { publicKey = '', wallet = 'default', commission = 0, amount = 0 } = this.props
    if(this.publicKey.length && amount) {
      let = sentData
      this.setState({ sentData, init: true })
    }
  }

  render() {
    let { children: Button, props } = this.props.children
    return (
      {this.state.init &&
      <View
        <PaymentDialogue sentData={this.state.sentData} />
      </View>}
      {!this.state.init &&
      <Button
        onPress={this.handleInitPayment}
        {...props} />}
    )
  }
}
