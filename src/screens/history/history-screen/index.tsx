import { Text, View } from 'react-native';

export const HistoryScreen = () => {
  return (
    <View
      testID="history-screen"
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Text style={{ textAlign: 'center' }}> HISTORY SCREEN</Text>
    </View>
  );
};
