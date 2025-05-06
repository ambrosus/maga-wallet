import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '@components/atoms';
import { Arow } from '@components/svgs';
import { COLORS } from '@constants';
import { RootNavigationProp } from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';
import { Button } from '../button';

interface HeaderProps {
  title?: string;
  goBack?: boolean | (() => void);
  numberOfLines?: number;
}

export const Header = ({ title, goBack, numberOfLines = 1 }: HeaderProps) => {
  const navigation = useNavigation<RootNavigationProp>();

  const handleGoBack = () => {
    if (typeof goBack === 'function') {
      goBack();
    } else if (goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.main}>
      {goBack && (
        <Button
          style={
            numberOfLines > 1
              ? { ...styles.arrowContainer, top: 10 }
              : { ...styles.arrowContainer, justifyContent: 'center' }
          }
          onPress={handleGoBack}
        >
          <Arow orientation="left" />
        </Button>
      )}
      <Typography
        fontSize={scale(20)}
        color={COLORS.textPrimary}
        style={goBack ? styles.titleWithArrow : undefined}
      >
        {title}
      </Typography>
    </View>
  );
};
