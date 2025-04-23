import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  PrimaryButton,
  SetupPasskeyBenefitsContainer,
  Spacer,
  Typography
} from '@components';
import { DEVICE_WIDTH, DEVICE_HEIGHT, FONT_SIZE, COLORS } from '@constants';
import { verticalScale } from '@utils';
import { styles } from './styles';

export const SetupPasskeyScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        width={DEVICE_WIDTH}
        height={DEVICE_HEIGHT}
        source={require('@assets/images/passkey-background.png')}
      />

      <View style={styles.header}>
        <Typography
          fontSize={FONT_SIZE.heading.xl}
          fontFamily="Onest600SemiBold"
          color={COLORS.textPrimary}
          letterSpacing={-1}
        >
          {t('setupPasskey.title')}
        </Typography>
        <Spacer value={verticalScale(8)} />
        <Typography
          fontSize={FONT_SIZE.body.md}
          fontFamily="Onest500Medium"
          color={COLORS.textSecondary}
          style={styles.description}
        >
          {t('setupPasskey.description')}
        </Typography>

        <View style={styles.benefitsContainer}>
          <SetupPasskeyBenefitsContainer />
        </View>
      </View>

      <View style={styles.footer}>
        <Button style={styles.cancelButton} onPress={() => null}>
          <Typography fontFamily="Onest600SemiBold" color={COLORS.neutral700}>
            {t('setupPasskey.button.later')}
          </Typography>
        </Button>
        <PrimaryButton onPress={() => null}>
          <Typography fontFamily="Onest600SemiBold" color={COLORS.white}>
            {t('buttons.faceID')}
          </Typography>
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};
