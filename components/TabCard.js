import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import CreditCard from 'react-native-credit-card'

import Colors from '../assets/literals/colors'

const Screen = Dimensions.get('window')

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitDisabled: true,
      type: '',
      focused: 'name',
      CCname: '',
      CCcvc: '',
      CCexpiry: '',
      CCnumber: '',
      CCpin: ''
    }
  }

  _onChange(form) {
    console.log(form)
  }

  render() {
    const { sentData, onSubmit } = this.props
    return(
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <CreditCard
          style={{marginVertical: 8, marginHorizontal: 0, marginBottom: 0, elevation: 3, alignSelf: 'center'}}
          imageFront={require('../assets/images/card-front.png')}
          imageBack={require('../assets/images/card-back.png')}
          type={this.state.type}
          shiny={false}
          bar={false}
          focused={this.state.focused}
          number={this.state.CCnumber}
          name={this.state.CCname}
          expiry={this.state.CCexpiry}
          cvc={this.state.CCcvc} />
        <View>
          <TextInput
            style={[styles.input, styles.marginRight, styles.marginLeft]}
            ref="CCname"
            value={this.state.CCname}
            underlineColorAndroid="transparent"
            placeholder="CARDHOLDER NAME"
            placeholderTextColor="#666666"
            selectionColor="#666666"
            keyboardType="default"
            maxLength={52}
            autoCapitalize="characters"
            onChangeText={(CCname) => this.setState({CCname})} />
        </View>
        <View style={{ flexDirection: 'row' }}>
            <TextInput
              ref="CCnumber"
              value={this.state.CCnumber}
              style={[styles.input, styles.marginLeft, { flex: 0.7, alignItems: 'center', justifyContent: 'center', marginRight: 2.5}]}
              underlineColorAndroid="transparent"
              placeholder="CARD NUMBER"
              placeholderTextColor="#666666"
              selectionColor="#666666"
              keyboardType="phone-pad"
              maxLength={19}
              autoCapitalize="none"
              onChangeText={(CCnumber) => this.setState({CCnumber})} />
            <TextInput
              style={[styles.input, styles.marginRight, { flex: 0.3, alignItems: 'center', justifyContent: 'center', marginLeft: 2.5 }]}
              value={this.state.CCpin}
              underlineColorAndroid="transparent"
              placeholder="CARD PIN"
              placeholderTextColor="#666666"
              selectionColor="#666666"
              keyboardType="phone-pad"
              secureTextEntry={true}
              maxLength={4}
              onChangeText={(CCpin) => this.setState({CCpin})} />
        </View>
        <View style={{ flexDirection: 'row' }}>
            <TextInput
              ref="CCexpiry"
              value={this.state.CCexpiry}
              style={[styles.input, styles.marginLeft, { flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 2.5 }]}
              underlineColorAndroid="transparent"
              placeholder="CARD EXPIRY"
              placeholderTextColor="#666666"
              selectionColor="#666666"
              keyboardType="phone-pad"
              maxLength={11}
              autoCapitalize="none"
              onChangeText={(CCexpiry) => this.setState({CCexpiry})} />
            <TextInput
              ref="CCcvc"
              value={this.state.CCcvc}
              style={[styles.input, styles.marginRight, { flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 2.5 }]}
              underlineColorAndroid="transparent"
              placeholder="CARD CVC"
              placeholderTextColor="#666666"
              selectionColor="#666666"
              keyboardType="phone-pad"
              secureTextEntry={true}
              maxLength={11}
              onChangeText={(CCcvc) => this.setState({CCcvc})} />
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
    marginTop: 5,
    height: 40,
    borderColor: Colors.accent,
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 6,
    padding: 6.5
  },
  marginLeft: {
    marginLeft: 15,
  },
  marginRight: {
    marginRight: 15,
  }
})