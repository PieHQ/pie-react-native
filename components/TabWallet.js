import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native'
import { Button } from 'react-native-elements'

import Colors from '../assets/literals/colors'

const Screen = Dimensions.get('window')

export default class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: ''
    }
  }

  render() {
    const { sentData, onSubmit } = this.props
    return(
      <View>
        <View>
          <TextInput
            style={[styles.input]}
            underlineColorAndroid="transparent"
            placeholder="PHONE NUMBER"
            placeholderTextColor="#666666"
            selectionColor="#666666"
            keyboardType="phone-pad"
            maxLength={11}
            autoCapitalize="none"
            value={this.state.phone}
            onChangeText={ phone => this.setState({phone})} />
        </View>
        <View>
          <Button
            borderRadius={6}
            color={Colors.white}
            buttonStyle={{ backgroundColor: Colors.primaryColor, marginTop: 15 }}
            onPress={() => onSubmit(this.state)}
            title={`Pay ${sentData.currencySign}${sentData.amount}`} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    marginBottom: 0,
    height: 40,
    borderColor: Colors.accent,
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 6,
    padding: 6.5
  }
})
