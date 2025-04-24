import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  }
});
