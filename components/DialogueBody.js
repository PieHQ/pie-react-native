import React, { Component } from 'react'
import formSerializer from 'form-serialize'

import CardTab from './TabCard'
import BankTab from './TabBank'
import WalletTab from './TabWallet'

import Verification from './PsVerification'
import Final from './PsFinal'

const ErrorOccurred = ({ errors }) => {
  const errorMessage = errors.message.split('|')
  return (
  <div className="alert bg--error">
    { errorMessage.length > 1 ? <h4 className="alert-heading text-center">{errorMessage[0].toUpperCase()}</h4> : '' }
    <div className="alert__body text-center">
      <span>{ errorMessage.length > 1 ? errorMessage[1] : errorMessage[0] }</span>
    </div>
  </div>
  )
}

class DialogueBody extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = ::this.chargeCustomer
    this.handleAuthentication = ::this.authenticateCustomer
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

  getClassName(channel) {
    if(this.state.currentChannel === channel) {
      return 'active'
    }
    return ''
  }

  changeChannel(channel, tab) {
    if(!this.state.unswitchable) this.setState({ currentChannel: channel, currentTab: tab })
  }

  chargeCustomer(e) {
    e.preventDefault()
    const formData = formSerializer(e.target, { hash: true })
    const { loading } = this.props
    formData.chargeWith = this.state.currentChannel
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
      this.props.api.post('charge', formData).then(response => {
        console.log(response)
        if(response && response.data && response.data.status && response.data.status === 'success') {
          this.setState({ paymentStep: 2, transactionData: response.data.transaction })
        } else {
          this.setState({ unswitchable: false, errors: response.data })
        }
        loading.hideLoading()
      }).catch(e => {
        this.setState({ unswitchable: false, errors: e })
        loading.hideLoading()
      })
    }
  }

  authenticateCustomer(e) {
    e.preventDefault()
    const formData = formSerializer(e.target, { hash: true })
    const { loading } = this.props
    formData.chargeWith = this.state.currentChannel
    this.setState({ unswitchable: true })
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
      this.props.api.post('charge/verify', formData).then(response => {
        if(response && response.data && response.data.status && response.data.status === 'success') {
          loading.hideLoading()
          setInterval(() => {
            let timeToClose = this.state.timeToClose
            if(timeToClose < 1) {
              window.parent.postMessage({
                transaction_reference: response.data.transaction.id,
                raw: response.data,
              }, '*')
            } else {
              timeToClose -= 1
              context.setState({ timeToClose: timeToClose })
              console.log(context.state.timeToClose)
            }
          }, 1000)
          this.setState({ paymentStep: 3 })
        } else {
          this.setState({ unswitchable: false, errors: response.data })
        }
      })
    }
  }

  render() {
    const { currentTab: CurrentTab } = this.state
    const { dataFromPie, sentData } = this.props
    const setToRender = Object.keys(dataFromPie).length !== 0 && dataFromPie.constructor === Object
    console.log('transactionData', this.state.transactionData)
    return (
      <div className="hivePaymentContainer-body">
        {setToRender &&
        <div>
          <div className="tabs-container" data-content-align="left">
            <ul className="tabs">
              <li className={this.getClassName('card')} onClick={(e) => this.changeChannel('card', CardTab)}>
                <div className="tab__title">
                  <span className="h5">Debit Card</span>
                </div>
              </li>
              <li className={this.getClassName('bank')} onClick={(e) => this.changeChannel('account', BankTab)}>
                <div className="tab__title">
                  <span className="h5">Bank Account</span>
                </div>
              </li>
              <li className={this.getClassName('wallet')}>
                <div className="tab__title" onClick={(e) => this.changeChannel('wallet', WalletTab)}>
                  <span className="h5">Wallet</span>
                </div>
              </li>
            </ul>
          </div>
          {Object.keys(this.state.errors).length !== 0 && <ErrorOccurred errors={this.state.errors} />}
          {(Object.keys(this.state.errors).length === 0 && this.state.paymentStep === 1) && <CurrentTab sentData={sentData} onSubmit={this.handleSubmit} dataFromPie={dataFromPie} api={this.props.api} loading={this.props.loading} />}
          {(Object.keys(this.state.errors).length === 0 && this.state.paymentStep === 2) && <Verification sentData={sentData} transactionData={this.state.transactionData} onSubmit={this.handleAuthentication} />}
          {(Object.keys(this.state.errors).length === 0 && this.state.paymentStep === 3) && <Final timeToClose={this.state.timeToClose} />}
        </div>}
      </div>
    )
  }
}

export default DialogueBody
