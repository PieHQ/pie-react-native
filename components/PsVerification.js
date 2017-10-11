import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

import CommonStyles from '../assets/styles/common'

export default class PsVerification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authValue: ''
    }
  }

  render() {
    let { onSubmit, sentData, transactionData } = this.props
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <View>
          <Text style={[CommonStyles.text]}>Please enter the OTP sent to you</Text>
          <TextInput
            style={[styles.input, styles.marginRight, styles.marginLeft]}
            value={this.state.CCname}
            underlineColorAndroid="transparent"
            placeholder="OTP"
            placeholderTextColor="#666666"
            selectionColor="#666666"
            keyboardType="phone-pad"
            maxLength={6}
            onChangeText={(authValue) => this.setState({authValue})} />
        </View>
        <View>
          <Button
            borderRadius={6}
            color={Colors.white}
            buttonStyle={{ backgroundColor: Colors.primaryColor, marginTop: 15 }}
            onPress={() => onSubmit(this.state)}
            title={`Confirm payment of ${sentData.currencySign}${sentData.amount}`} />
        </View>
      </View>
    )
  }
}