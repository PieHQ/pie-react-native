import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import formSerializer from 'form-serialize'

import CardTab from './TabCard'
import BankTab from './TabCard'
import WalletTab from './TabWallet'

import Verification from './PsVerification'
import Final from './PsFinal'

import CommonStyles from '../assets/styles/common'
import Colors from '../assets/literals/colors'

const screen = Dimensions.get('window')

const ErrorOccurred = ({ errors }) => {
  const errorMessage = errors.message.split('|')
  return (
  <View className="alert bg--error">
    { errorMessage.length > 1 ? <Text h4 className="alert-heading text-center">{errorMessage[0].toUpperCase()}</Text> : '' }
    <View className="alert__body text-center">
      <Text>{ errorMessage.length > 1 ? errorMessage[1] : errorMessage[0] }</Text>
    </View>
  </View>
  )
}

class DialogueBody extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.chargeCustomer.bind(this)
    this.handleAuthentication = this.authenticateCustomer.bind(this)
    this.state = {
      currentChannel: 'card',
      currentTab: CardTab,
      unswitchable: false,
      paymentStep: 1,
      errors: {},
      transactionData: {},
      timeToClose: 5
    }
  }

  _getActive(channel) {
    if(this.state.currentChannel === channel) {
      return {
        color: Colors.PrimaryColor
      }
    }
    return {}
  }

  _changeChannel(channel, tab) {
    if(!this.state.unswitchable) this.setState({ currentChannel: channel, currentTab: tab })
  }

  chargeCustomer(formData) {
    const { loading, api } = this.props
    formData.chargeWith = this.state.currentChannel
    formData = { ...formData,...this.props.sentData }
    this.setState({ unswitchable: true })
    console.log(formData)
    const formErors = {}
    if(this.state.currentChannel === 'card') {
      // Validate form
      if(!formData.CCname) {
        formErors['CCname'] = 'Cardholder\'s name is required'
      }
      if(!formData.CCnumber) {
        formErors['CCnumber'] = 'Card number is required for billing'
      }
      if(!formData.CCcvc) {
        formErors['CCcvc'] = 'Your card\'s CCV is required. CCV is the 3 digit number at the back of your card'
      }
      if(!formData.CCexpiry) {
        formErors['CCexpiry'] = 'Enter a valid expiry data for your CCV'
      }
    }
    if(this.state.currentChannel === 'account') {
      if(!formData.accName) {
        formErors['accName'] = 'Enter a valid account name'
      }
      if(!formData.accNumber) {
        formErors['accNumber'] = 'Enter a valid account name'
      }
      if(!formData.bankCode) {
        formErors['accNumber'] = 'Enter a valid account name'
      }
    }
    if(!formData.amount || !formData.email || !formData.publicKey) {
      formErors['submit'] = 'Invalid session. Please, close the dialog box and retry'
    }
    console.log(formErors)
    if(Object.keys(formErors).length === 0) {
      loading.showLoading()
      api.post('charge', formData).then(response => {
        console.log(response)
        if(response && response.status && response.status === 'success') {
          this.setState({ paymentStep: 2, transactionData: response.transaction })
        } else {
          this.setState({ unswitchable: false, errors: response })
        }
        loading.hideLoading()
      }).catch(e => {
        console.log(e)
        this.setState({ unswitchable: false, errors: e })
        loading.hideLoading()
      })
    }
  }

  authenticateCustomer(formData) {
    const { loading, sentData, api } = this.props
    formData.chargeWith = this.state.currentChannel
    formData.transactionId = this.state.transactionData.id
    this.setState({ unswitchable: true })
    formData = { ...formData, ...sentData }
    console.log(formData)
    const formErors = {}
    if(!formData.authValue || !formData.authValue.length) {
      formErors['authValue'] = 'Please enter the OTP sent to you'
    }
    if(!formData.transactionId || !formData.publicKey) {
      formErors['submit'] = 'Invalid session. Please, close the dialog box and retry again'
    }
    console.log(formErors)
    if(Object.keys(formErors).length === 0) {
      loading.showLoading()
      let context = this
      api.post('charge/verify', formData).then(response => {
        if(response && response.status && response.status === 'success') {
          loading.hideLoading()
          setInterval(() => {
            let timeToClose = this.state.timeToClose
            if(timeToClose < 1) {
              actions.closeDialogue({
                transaction_reference: response.transaction.id,
                raw: response,
              })
            } else {
              timeToClose -= 1
              context.setState({ timeToClose: timeToClose })
              console.log(context.state.timeToClose)
            }
          }, 1000)
          this.setState({ paymentStep: 3 })
        } else {
          this.setState({ unswitchable: false, errors: response })
        }
      })
    }
  }

  render() {
    const { currentTab: CurrentTab } = this.state
    const { dataFromPie, sentData } = this.props
    const setToRender = Object.keys(dataFromPie).length !== 0 && dataFromPie.constructor === Object
    return (
      <View style={{ /*height: screen.height * 0.8 * 0.8*/ }}>
        {setToRender &&
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={[styles.tabRow]}>
              <View style={[styles.tab]}>
                <TouchableHighlight onPress={() => this._changeChannel('card', CardTab) }>
                  <Text style={[styles.tabText, CommonStyles.text, this._getActive('card')]}>Card</Text>
                </TouchableHighlight>
              </View>
              <View style={[styles.tab]}>
                <TouchableHighlight onPress={() => this._changeChannel('account', BankTab) }>
                  <Text style={[styles.tabText, CommonStyles.text, this._getActive('account')]}>Bank Account</Text>
                </TouchableHighlight>
              </View>
              <View style={[styles.tab]}>
                <TouchableHighlight onPress={() => this._changeChannel('wallet', WalletTab) }>
                  <Text style={[styles.tabText, CommonStyles.text, this._getActive('wallet')]}>Wallet</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{ /*height: screen.height * 0.8 * 0.8 * 0.9 */ }}>
            {Object.keys(this.state.errors).length !== 0 && <ErrorOccurred errors={this.state.errors} />}
            {(Object.keys(this.state.errors).length === 0 && this.state.paymentStep === 1) && <CurrentTab sentData={sentData} onSubmit={this.handleSubmit} dataFromPie={dataFromPie} api={this.props.api} loading={this.props.loading} />}
            {(Object.keys(this.state.errors).length === 0 && this.state.paymentStep === 2) && <Verification sentData={sentData} transactionData={this.state.transactionData} onSubmit={this.handleAuthentication} />}
            {(Object.keys(this.state.errors).length === 0 && this.state.paymentStep === 3) && <Final timeToClose={this.state.timeToClose} />}
          </View>
        </View>}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  tabRow: { height: screen.height * 0.8 * 0.8 * 0.1, flex: 1, flexDirection: 'row' },
  tab: {
    width: screen.width * 0.333333333333333333333333,
    borderColor: Colors.accent,
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
  }
})

export default DialogueBody
