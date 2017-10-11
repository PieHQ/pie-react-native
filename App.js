import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, ScrollView } from 'react-native'
import Modal from 'react-native-modalbox'
import { Font } from 'expo'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import PiePayment, { PaymentDialogue } from './components/PiePayment'

import Colors from './assets/literals/colors'

const Screen = Dimensions.get('window')

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  }
  
  componentDidMount() {
    Font.loadAsync({
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
      'OpenSans-CondBold': require('./assets/fonts/OpenSans-CondBold.ttf'),
      'OpenSans-CondLight': require('./assets/fonts/OpenSans-CondLight.ttf'),
      'OpenSans-Extrabold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      'OpenSans-ExtraboldItalic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
      'OpenSans-LightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Semibold': require('./assets/fonts/OpenSans-Semibold.ttf'),
      'OpenSans-SemiboldItalic': require('./assets/fonts/OpenSans-SemiboldItalic.ttf'),
    })
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  closeDialogue(data) {
    this.setState({isOpen: false})
    console.log(data)
  }

  render() {
    const BContent = (
      <Button
        onPress={() => this.setState({isOpen: false})}
        style={[styles.btn, styles.btnModal]}
        title='×'/>
    )
    return (
      <View style={styles.container}>
        <Text>Click the button to test payment</Text>
        <PiePayment
          publicKey=""
          wallet="default"
          commission={10}
          amount={5000}>
          <Text
            onPress={() => this.setState({isOpen: true})} style={styles.btn}
            textStyle={{ textAlign: 'center' }}>Pay</Text>
        </PiePayment>

        <Modal
          style={[styles.modal, styles.modal4]}
          position={"bottom"}
          isOpen={this.state.isOpen}
          swipeArea={20}
          backdropContent={BContent}
          onClosed={() => this.setState({isOpen: false})}>
          <ScrollView scrollEnabled={false}>
            <View style={{ width: Screen.width }}>
              <PaymentDialogue
                publicKey="pk_WG3VlzyJ2NhcFbIr"
                wallet="default"
                commission={10}
                amount={5000}
                email="kb.james@logicaladdress.com"
                actions={{ closeDialogue: (data) => this.closeDialogue(data) }} />
            </View>
            <KeyboardSpacer/>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal4: {
    height: Screen.height*0.8
  },

  btn: {
    margin: 10,
    backgroundColor: Colors.PrimaryColor,
    color: Colors.white,
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: Colors.transparent
  },
});
