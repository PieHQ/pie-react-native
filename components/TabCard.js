import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'

export default class Card extends Component {

  constructor(props) {
    super(props)
    this.handleCheckVerve = this.checkVerve.bind(this)
    this.state = {
      isVerve: false,
      submitDisabled: false,
    }
  }

  checkVerve(e) {
    let cardNumber = e.target.value
    if(cardNumber.length) {
      cardNumber = cardNumber.replace(/ /g, '')
      if(cardNumber.match(/^(506099506198|650002650027|50610)/)) {
        this.setState({ isVerve: true })
      } else {
        this.setState({ isVerve: false })
      }
    }
  }

  render() {
    const { sentData, onSubmit } = this.props
    return(
    <div className="row">
      <div className="col-xs-12">
        <CreditCardInput onChange={this._onChange} />
        <Button
          raised
          buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Pay ${sentData.currencySign}${sentData.amount}`
          accessibilityLabel="Click to pay" />
      </div>
    </div>
    )
  }
}
