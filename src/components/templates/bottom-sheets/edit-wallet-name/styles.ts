import { StyleSheet } from 'react-native';
import { COLORS, DEVICE_HEIGHT } from '@constants'; // Added DEVICE_HEIGHT
import { scale } from '@utils'; // Added scale for margin

export const styles = StyleSheet.create({
  buttonsRowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonStyle: {
    flex: 1
  },
  secondaryButton: {
    marginRight: scale(8)
  },
  primaryButton: {
    marginLeft: scale(8)
  },
  contentWrapper: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    width: '100%',
    marginHorizontal: scale(22),
    borderRadius: 40,
    padding: scale(16)
  },
  inputSectionWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  inputStyle: {
    width: '100%'
  },
  modalStyles: {
    backgroundColor: 'transparent'
  },
  contentContainerStyle: {
    alignItems: 'center',
    height: DEVICE_HEIGHT,
    justifyContent: 'flex-end',
    // paddingTop: '30%',
    backgroundColor: 'transparent'
  }
});
