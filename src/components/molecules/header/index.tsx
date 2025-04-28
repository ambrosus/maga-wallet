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
}

export const Header = ({ title, goBack }: HeaderProps) => {
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
        <Button style={styles.arrowContainer} onPress={handleGoBack}>
          <Arow orientation="left" />
        </Button>
      )}
      <Typography fontSize={scale(20)} color={COLORS.textPrimary}>
        {title}
      </Typography>
    </View>
  );
};
