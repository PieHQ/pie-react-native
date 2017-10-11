import { StyleSheet } from 'react-native'

import fontMaker from './font'
import Colors from '../literals/colors'

const OpenSans = fontMaker({ weight: 'Light'})

const styles = StyleSheet.create({
  text: {
    color: Colors.fontColor,
    fontWeight: '300',
    marginTop: 0,
    marginBottom: 0,
    ...OpenSans
  },
  h1: {
    fontSize: 40,
  },
  h2: {
    fontSize: 34
  },
  h3: {
    fontSize: 28
  },
  h4: {
    fontSize: 22
  },
})

export default styles