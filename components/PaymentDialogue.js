import React, { Component } from 'react'
import * as api from '../../utils/api'

import config from '../config'

import DialogueBody from './DialogueBody'

if(process.env.WEBPACK) require('./payment.scss')

class PaymentDialogue extends Component {
  constructor(props) {
    super(props)
    this.handleClose = ::this.closeDialogue
    this.state = {
      isLoading: true,
      error: {},
      sentData: {},
      dataFromPie: {},
      headerName: config.appName,
      headerLogo: '/assets/images/logo.png'
    }
  }

  componentDidMount() {
    let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent', eventer = window[eventMethod],
    messageEvent = 'attachEvent' === eventMethod ? 'onmessage' : 'message'
    eventer(messageEvent, (e) => {
      let sentData = e.data || e.message
      sentData['currency'] = sentData.currency || 'NGN'
      sentData['currencySign'] = sentData.currency === 'USD' ? '$' : '₦'
      api.post('initPaymentDialogue', { apiKey: sentData.publicKey,  }).then(response => {
        if(response && response.data && response.data.business) {
          this.setState({ isLoading: false, sentData, dataFromPie: response.data, headerName: response.data.business.name })
        }
      })
    })
  }

  closeDialogue(e) {
    window.parent.postMessage('closeIframe', '*')
    e.preventDefault()
  }

  showLoading() {
    this.setState({ isLoading: true })
  }

  hideLoading() {
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <div>
        <div className="pieTestingEnv text-center clearfix">
          {(this.state.dataFromPie.business && !this.state.dataFromPie.business.livemode) &&
          <div className="pieTestingEnvTab">
            <div className="pieTestingEnvText">TEST</div>
          </div>}
        </div>
        <div className="container pos-vertical-center">
          <div className="piePaymentContainer">
            <div className="cancel" onClick={this.handleClose}>×</div>
            {this.state.isLoading &&
            <div className="pieLoading">
              <div className="hive-spinner">
                <div className="hive-dot1"></div>
                <div className="hive-dot2"></div>
              </div>
            </div>}
            <div className="piePaymentContainer-header">
              <div className="row">
                <div className="logo">
                  <img src={this.state.headerLogo} />
                </div>
                <div className="title text-center">
                  <h3 className="">{this.state.headerName}</h3>
                  <p className="lead">{this.state.sentData.customer}</p>
                </div>
              </div>
            </div>
            <DialogueBody dataFromPie={this.state.dataFromPie} sentData={this.state.sentData} api={api} loading={{showLoading: () => this.showLoading(), hideLoading: () => this.hideLoading()}} />
          </div>
        </div>
      </div>
    )
  }
}

export default Payment
