import { View, Animated } from 'react-native';
import {
  Header,
  Spacer,
  RowContainer,
  PasscodeIndicator,
  Typography,
  Keyboard
} from '@components';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';
import { useShakeAnimation } from '../hooks';

interface PasscodeScreenLayoutProps {
  title: string;
  passcode: string;
  error?: string;
  handleCodeChange: (params: string) => void;
  handleRemove: () => void;
  headerWithGoBack?: boolean;
}

export const PasscodeScreenLayout = ({
  title,
  passcode,
  error = '',
  handleCodeChange,
  handleRemove,
  headerWithGoBack = true
}: PasscodeScreenLayoutProps) => {
  const { animatedStyle } = useShakeAnimation();

  return (
    <View style={styles.main}>
      <View>
        <Header goBack={headerWithGoBack} title={title} />
        <Spacer value={scale(100)} />
        <View style={styles.wrapper}>
          <Animated.View style={animatedStyle}>
            <RowContainer justifyContent="center">
              <PasscodeIndicator passcode={passcode} error={error} />
            </RowContainer>
          </Animated.View>
          <Spacer value={scale(15)} />
          <Typography color={COLORS.destructive500}>{error}</Typography>
        </View>
      </View>
      <Keyboard
        onRemove={handleRemove}
        onButtonPress={(data: string) => handleCodeChange(data)}
      />
    </View>
  );
};
