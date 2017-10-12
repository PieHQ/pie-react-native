# Pie Payment System

[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/pie-react-native.svg?style=flat-square
[npm-url]: http://npmjs.org/package/pie-react-native
[download-image]: https://img.shields.io/npm/dm/pie-react-native.svg?style=flat-square
[download-url]: https://npmjs.org/package/pie-react-native
[pie-react-native-example]: https://github.com/JamesKator/pie-react-native-example

## Index

* [Install](#install)
* [Usage](#usage)
* [Development](#development)
* [Notes](#notes)

## Install

[![pie-react-native](https://nodei.co/npm/pie-react-native.png)](https://npmjs.org/package/pie-react-native)

## Usage
PiePayment component requires the following props.

| Property      | Type           |   Default  | Description  |
|---------------|----------------|------------|--------------|
| pubKey    | `string`      |    `none` | Your business public key |
| amount    | `number`      |    `none` | Amount in Naira |
| customer    | `string`      |    `none` | The customer's email address |
| callback    | `func`      |    `none` | Callback to retrieve the transaction reference. This function will be called on successful charge |
| wallet    | `string`      |    `default` | The wallet tag you want to credit |
|  commission   | `number`      |    `0` | Your commission or service charge |
| commissionWallet    | `string`      |    `default` | The business wallet tag to credit with `commission` |
| inclusive    | `bool`      |    `true` | `true` means you will incur transaction charges and vice versa |

On successful charge, PiePayment will call your `callback` with object with the following properties
| Property      | Type           | Description  |
|---------------|----------------|--------------|
| trxref    | `string`      | The transaction reference with the prefix `chg_`. You can use this string to verify a transaction on your server |
| raw    | `object`      | Detail transaction response |


```javascript
import React, { Component } from 'react'
import { View, Button } from 'react-native'
import PiePayment from 'pie-react-native'

class PaymentPage extends Component {

  constructor() {
    this.state = {
      visibility: false
    }
  }

  callback(transactionData) {
    console.log(transactionData)
  }

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({visibility: true})}>Pay</Button>
        <PiePayment
          pubKey="pk_WG3VlzyJ2NhcFbIr"
          wallet="default"
          commission={10}
          amount={5000}
          customer="sales@logicaladdress.com"
          visible={this.state.visibility}
          callback={(data) => this.callback(data)} />
      </View>
    )
  }
}
```
## Development

1. Fork/clone this repository
2. Run `npm install`
4. Make changes
6. Run `npm test` when you're done
7. Submit a pull request

## Notes
For a working example, clone and run [this repo][pie-react-native-example]