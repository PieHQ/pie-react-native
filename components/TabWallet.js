import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native'
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Input,
  Label,
  Switch
} from 'react-native-clean-form'

import Colors from '../assets/literals/colors'

const Screen = Dimensions.get('window')

export default class Wallet extends Component {
  constructor(props) {
    super(props)
    this.handleWalletEnquiry = this.walletEnquiry.bind(this)
    this.state = {
      submitDisabled: true,
      wallets: []
    }
  }

  walletEnquiry(e) {
    let phone = e.target.value
    if(phone.length >= 11) {
      const { loading, api } = this.props
      loading.showLoading()
      api.post('walletEnquiry', { phone }).then(response => {
        loading.hideLoading()
        if(response && response.data && response.data.wallets) {
          this.setState({ wallets: response.data.wallets, submitDisabled: false })
        } else {
          this.setState({ submitDisabled: true })
        }
      })
    } else {
      this.setState({ submitDisabled: true })
    }
  }

  render() {
    const { sentData, onSubmit } = this.props
    return(
      <View>
        <TextInput
          style={[styles.input]}
          underlineColorAndroid="transparent"
          placeholder="Phone Number"
          placeholderTextColor="#666666"
          selectionColor="#666666"
          keyboardType="phone-pad"
          maxLength={11}
          autoCapitalize="none" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 50,
    borderColor: Colors.accent,
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 6,
    padding: 6.5
  }
})
