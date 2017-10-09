import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native'

const screen = Dimensions.get('window')

export default class Card extends Component {
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
      <KeyboardAvoidingView behavior='padding'>
        <View style={[styles.tabContent, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
          <Text>Wallet Tab</Text>
          <TextInput
            style={{ height: 40, width: (screen), borderColor: '#ececec', borderWidth: 1 }}
            placeholder="Phone Number"
            onChangeText={(text) => this.setState({ text })} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  tabContent: {
    padding: 12,
  }
})
