import { View } from 'react-native';
import { styles } from './styles';

interface PasscodeIndicatorProps {
  passcode: string;
  error?: string;
}

export const PasscodeIndicator = ({
  passcode,
  error = ''
}: PasscodeIndicatorProps) => {
  const circleElements = [];

  for (let i = 0; i < 4; i++) {
    const isFilled = i < passcode.length || (i === 3 && passcode.length === 4);
    circleElements.push(
      <View
        key={i}
        style={[
          styles.circle,
          isFilled && styles.circleFilled,
          !!error && styles.error
        ]}
      />
    );
  }

  return <>{circleElements}</>;
};
