import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, ScrollView } from 'react-native'
import Modal from 'react-native-modalbox'

import PiePayment, { PaymentDialogue } from './components/PiePayment'

const screen = Dimensions.get('window')

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
            textStyle={{textAlign: 'center'}}>Pay</Text>
        </PiePayment>

        <Modal
          style={[styles.modal, styles.modal4]}
          position={"bottom"}
          isOpen={this.state.isOpen}
          swipeArea={20}
          backdropContent={BContent}
          onClosed={() => this.setState({isOpen: false})}>
          <ScrollView>
            <View style={{ width: screen.width }}>
              <PaymentDialogue />
            </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal4: {
    height: screen.height*0.8
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
},
});
