import { useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { SafeViewContainer, Typography, Spacer } from '@components/atoms';
import { Header, QRCodeBox } from '@components/molecules';
import { BottomSheetSupportedTokens } from '@components/templates';
import { COLORS } from '@constants';
import { useWalletStore } from '@core/wallets/store';
import { scale, StringUtils } from '@utils';
import { UserInfoContainer, SupportedTokensList } from './components';
import { styles } from './styles';

// TODO remove after we have a real user data
const HARD_CODE_USER_DATA = {
  address: '0x0000000000000000000000000000000000000000',
  email: 'testMAga-wallet123@test.com',
  phone: '+1234567890'
};

export const ReceiveScreen = () => {
  const { selectedWallet } = useWalletStore();
  const { t } = useTranslation();
  const walletAddress = selectedWallet?.address || '';

  const supportedTokensRef = useRef<BottomSheetModal>(null);

  return (
    <SafeViewContainer>
      <View style={{ flex: 1 }}>
        <View>
          <Header
            title={t('receive.title')}
            closeIconVisible
            backIconVisible={false}
          />
          <View style={styles.content}>
            <View style={styles.qrContainer}>
              <QRCodeBox
                showLogo
                value={walletAddress}
                testID="wallet-qr-code"
              />
            </View>
            <Typography
              align="center"
              fontWeight="500"
              fontSize={14}
              color={COLORS.primary500}
            >
              {t('receive.qr.description')}
            </Typography>
            <Spacer value={scale(24)} />
            <View style={styles.userInfoList}>
              <UserInfoContainer
                title={t('receive.user.wallet.address')}
                data={StringUtils.formatAddress(
                  HARD_CODE_USER_DATA.address,
                  13,
                  4
                )}
              />
              <UserInfoContainer
                title={t('receive.user.email')}
                data={HARD_CODE_USER_DATA.email}
              />
              <UserInfoContainer
                title={t('receive.user.phone')}
                data={HARD_CODE_USER_DATA.phone}
              />
            </View>
          </View>
        </View>
        <View style={styles.supportedTokensContainer}>
          <TouchableOpacity
            style={{ alignItems: 'center', padding: scale(6) }}
            onPress={() => {
              supportedTokensRef.current?.present();
            }}
          >
            <Typography
              color={COLORS.neutral400}
              fontSize={14}
              fontWeight="500"
            >
              {t('receive.supported.tokens')}
            </Typography>
            <Spacer value={scale(8)} />
            <SupportedTokensList />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetSupportedTokens ref={supportedTokensRef} />
    </SafeViewContainer>
  );
};
