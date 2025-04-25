import { Text, View } from 'react-native';

export const AboutScreen = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Text style={{ textAlign: 'center' }}> ABOUT</Text>
    </View>
  );
};
