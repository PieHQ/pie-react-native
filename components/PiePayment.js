import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableHighlight, Modal, ScrollView, Dimensions } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Expo, { Font } from 'expo'

import PaymentDialogue from './PaymentDialogue'
import Colors from '../assets/literals/colors'

const Screen = Dimensions.get('window')

/**
  *  Props[ publicKey:int, wallet:string, commission:double, amount:double ]
  */

class PiePayment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sentData: {},
      init: false,
      fontLoaded: false,
      visible: false
    }
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans-BoldItalic': require('../assets/fonts/OpenSans-BoldItalic.ttf'),
      'OpenSans-CondBold': require('../assets/fonts/OpenSans-CondBold.ttf'),
      'OpenSans-CondLight': require('../assets/fonts/OpenSans-CondLight.ttf'),
      'OpenSans-Extrabold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
      'OpenSans-ExtraboldItalic': require('../assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
      'OpenSans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
      'OpenSans-LightItalic': require('../assets/fonts/OpenSans-LightItalic.ttf'),
      'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Semibold': require('../assets/fonts/OpenSans-Semibold.ttf'),
      'OpenSans-SemiboldItalic': require('../assets/fonts/OpenSans-SemiboldItalic.ttf'),
    })
    this.setState({ fontLoaded: true })
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.visible) {
      this.setState({ visible: true })
    } else {
      this.setState({ visible: false })
    }
  }

  closeDialogue(data) {
    this.setState({ visible: false })
    if(data.trxref) {
      this.props.callback(data)
    }
  }

  render() {
    console.log(this.props)
    let { children: Children, publicKey = '', wallet = 'default', commission = 0, amount = 0 } = this.props
    if(publicKey.length && amount) {
      let sentData = { publicKey, wallet, commission, amount }
      this.setState({ sentData, init: true })
    }

    return (
      <View>
        {this.state.fontLoaded && (<Modal
        style={[styles.modal, styles.modal4]}
        animationType="slide"
        visible={this.state.visible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => this.setState({isOpen: false})}
        supportedOrientations={['portrait']}>
        <ScrollView scrollEnabled={false}>
          <View style={{ width: Screen.width }}>
            <PaymentDialogue
              publicKey={this.props.pubKey}
              wallet={this.props.wallet}
              commission={this.props.commission}
              commissionWallet={this.props.commissionWallet}
              amount={this.props.amount}
              customer={this.props.customer}
              inclusive={this.props.inclusive}
              amount={this.props.amount}
              actions={{ closeDialogue: (data) => this.closeDialogue(data) }} />
          </View>
          <KeyboardSpacer/>
        </ScrollView>
      </Modal>)}
      </View>
    )
  }
}

PiePayment.propTypes = {
  pubKey: PropTypes.string.isRequired,
  wallet: PropTypes.string,
  amount: PropTypes.number.isRequired,
  customer: (props, propName, componentName) => {
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(props[propName])) {
      return new Error(`Invalid prop '${propName}' supplied to '${componentName}' as email. Validation failed.`);
    }
  },
  commission: PropTypes.number,
  commissionWallet: PropTypes.string,
  inclusive: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired
}

PiePayment.defaultProps = {
  wallet: 'default',
  commission: 0,
  commissionWallet: 'default',
  inclusive: true
}

const styles = StyleSheet.create({

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal4: {
    height: Screen.height*0.8
  }
});

export { PiePayment as default, PaymentDialogue}
