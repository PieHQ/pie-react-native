import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Text, Image, ActivityIndicator } from 'react-native'
import { Grid, Row } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'

import * as api from '../utils/api'
import config from '../config/config'

import DialogueBody from './DialogueBody'
import CommonStyles from '../assets/styles/common'
import TabStyles from '../assets/styles/tab'
import Colors from '../assets/literals/colors'

const Screen = Dimensions.get('window')

export default class PaymentDialogue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      error: {},
      sentData: {},
      dataFromPie: {},
      headerName: config.appName,
    }
  }

  componentDidMount() {
    let { publicKey, amount, commission = 0, wallet = 'default', customer, currency = 'NGN' } = this.props
    let sentData = { publicKey, amount, commission, wallet, email: customer, currency }
    console.log(sentData)
    sentData['currencySign'] = sentData.currency === 'USD' ? '$' : '₦'
    api.post('initPaymentDialogue', { apiKey: sentData.publicKey }).then(response => {
      console.log(response)
      if(response && response.business) {
        this.setState({ isLoading: false, sentData, dataFromPie: response, headerName: response.business.name })
      }
    }).catch(e => {
      console.error(e)
    })
  }
  
  _showLoading() {
    this.setState({ isLoading: true })
  }

  _hideLoading() {
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.state.isLoading}
          color={Colors.PrimaryColor} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={[TabStyles.dialogueHeader]} removeClippedSubviews={false}>
            <View style={[TabStyles.dialogueHeaderImageContainer]}>
              <Image source={require('../assets/images/logo.png')} style={[TabStyles.dialogueHeaderImage]} />
            </View>
            <View style={[TabStyles.dialogueHeaderTextContainer]}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[TabStyles.dialogueHeaderText, CommonStyles.text, CommonStyles.h3]}>{this.state.headerName}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[TabStyles.dialogueHeaderText, CommonStyles.text]}>{this.state.sentData.email || ''}</Text>
            </View>
          </View>
          <DialogueBody
            api={api}
            sentData={this.state.sentData}
            dataFromPie={this.state.dataFromPie}
            loading={{ showLoading: () => this._showLoading(), hideLoading: () => this._hideLoading() }}
            actions={{ closeDialogue: (data) => this.props.actions.closeDialogue(data) }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

// export default PaymentDialogue
