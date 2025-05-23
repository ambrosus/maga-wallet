import { useCallback } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/atoms';
import { Button } from '@components/molecules';
import { FONT_SIZE, COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { HOME_STACK_ROUTES } from '@navigation';
import { RootStackParamsList } from '@navigation/root-stack';
import { styles } from './styles';

interface TxStatusButtonsProps {
  isError: boolean;
  navigation: NativeStackNavigationProp<
    RootStackParamsList,
    'DexTxStatusScreen'
  >;
}

export const TxStatusButtons = ({
  isError,
  navigation
}: TxStatusButtonsProps) => {
  const { t } = useTranslation();
  const { reset } = useSwapContextSelector();

  const onSuccessActionHandle = useCallback(() => {
    reset();
    navigation.replace(HOME_STACK_ROUTES.DEXScreen);
  }, [navigation, reset]);

  const onRetryActionHandle = useCallback(() => {
    navigation.replace(HOME_STACK_ROUTES.DEXScreen);
  }, [navigation]);

  if (isError) {
    return (
      <View style={styles.container}>
        <Button onPress={onRetryActionHandle} style={styles.errorPrimaryButton}>
          <Typography
            fontSize={FONT_SIZE.default}
            fontFamily="Onest600SemiBold"
            color={COLORS.white}
          >
            {t('buttons.try.again')}
          </Typography>
        </Button>

        <Button
          onPress={onSuccessActionHandle}
          style={styles.errorSecondaryButton}
        >
          <Typography
            fontSize={FONT_SIZE.default}
            fontFamily="Onest600SemiBold"
            color={COLORS.primary500}
          >
            {t('buttons.done')}
          </Typography>
        </Button>
      </View>
    );
  }

  if (!isError) {
    return (
      <Button onPress={onSuccessActionHandle} style={styles.successButton}>
        <Typography
          fontSize={FONT_SIZE.default}
          fontFamily="Onest600SemiBold"
          color={COLORS.white}
        >
          {t('buttons.done')}
        </Typography>
      </Button>
    );
  }
};
