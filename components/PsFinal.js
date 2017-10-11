import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

import CommonStyles from '../assets/styles/common'
import Colors from '../assets/literals/colors'

export default ({ timeToClose }) => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ height: '110px', width: '110px', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[CommonStyles.text, CommonStyles.h2, { alignSelf: 'center'}]}>{timeToClose}</Text>
    </View>
    <View className="alert bg--success" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
      <View style={{ backgroundColor: Colors.backgroundSuccess, borderColor: Colors.green, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[CommonStyles.text]}>Your Transaction was successfull! This window will close automatically</Text>
      </View>
    </View>
  </View>
)
