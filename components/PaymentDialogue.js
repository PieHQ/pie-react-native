import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import { Grid, Row } from 'react-native-elements'

import * as api from '../utils/api'
import config from '../config/config'

import DialogueBody from './DialogueBody'

const screen = Dimensions.get('window')

export default class PaymentDialogue extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.closeDialogue.bind(this)
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
    // let sentData = {}
    // sentData['currency'] = sentData.currency || 'NGN'
    // sentData['currencySign'] = sentData.currency === 'USD' ? '$' : '₦'
    // api.post('initPaymentDialogue', { apiKey: sentData.publicKey,  }).then(response => {
    //   if(response && response.data && response.data.business) {
    //     this.setState({ isLoading: false, sentData, dataFromPie: response.data, headerName: response.data.business.name })
    //   }
    // })
  }

  closeDialogue(e) {

  }

  showLoading() {
    this.setState({ isLoading: true })
  }

  hideLoading() {
    this.setState({ isLoading: false })
  }

  changeChannel(channel, tab) {
    if(!this.state.unswitchable) this.setState({ currentChannel: channel, currentTab: tab })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ height: screen.height * 0.2 * 0.8, backgroundColor: '#e8e9eb' }}>
          <Text style={[{ lineHeight: screen.height * 0.2 * 0.8, textAlign: 'center', fontWeight: '100' }, styles.h, styles.h3]}>{this.state.headerName}</Text>
        </View>
        <DialogueBody sentData={{}} dataFromPie={{ business: { name: 'Test business' } }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  h: {
    //fontFamily: 'Open Sans',
    color: '#252525',
    fontWeight: '300',
    marginTop: 0,
    marginBottom: 0,
  },
  h1: {
    fontSize: 40,
  },
  h2: {
    fontSize: 34
  },
  h3: {
    fontSize: 28
  },
  h4: {
    fontSize: 22
  },
})

// export default PaymentDialogue
