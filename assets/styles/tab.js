import { StyleSheet, Dimensions } from 'react-native'

import Colors from '../literals/colors'

const Screen = Dimensions.get('window')

const styles = StyleSheet.create({
  dialogueHeader: {
    height: Screen.height * 0.15 * 0.8,
    backgroundColor: Colors.dialogueHeader,
    flex: 1,
    flexDirection: 'row',
  },
  dialogueHeaderText: {
    fontWeight: '300',
  },
  dialogueHeaderTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 0.8,
  },
  dialogueHeaderImage: {
    height: 64,
    width: 64,
  },
  dialogueHeaderImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  }
})

export default styles
