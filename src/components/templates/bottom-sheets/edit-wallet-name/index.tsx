import { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { View, Animated } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Input, RowContainer, Spacer, Typography } from '@components/atoms';
import { InputRef } from '@components/atoms/input/types';
import { PrimaryButton, SecondaryButton } from '@components/molecules';
import { BottomSheet } from '@components/organisms';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { useWalletStore } from '@core/wallets';
import { useForwardedRef, useKeyboardHeight } from '@lib/hooks';
import { IWallet } from '@types';
import { scale } from '@utils';
import { styles } from './styles';

interface ModalEditWalletNameProps {
  wallet: IWallet | null;
}

export const BottomSheetEditWalletName = forwardRef<
  BottomSheetModal,
  ModalEditWalletNameProps
>(({ wallet }, ref) => {
  const { t } = useTranslation();

  const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);
  const inputRef = useRef<InputRef>(null);
  const marginAnim = useRef(new Animated.Value(DEVICE_HEIGHT / 2)).current;

  const { updateWalletName } = useWalletStore();

  const [newName, setNewName] = useState(wallet?.name || '');

  const onChangeText = (text: string) => {
    setNewName(text);
  };

  useEffect(() => {
    setNewName(wallet?.name || '');
  }, [wallet]);

  const keyboardHeight = useKeyboardHeight();

  useEffect(() => {
    Animated.timing(marginAnim, {
      toValue: keyboardHeight || DEVICE_HEIGHT / 2,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [keyboardHeight, marginAnim]);

  const handleSheetChange = useCallback((index: number) => {
    if (index === 1 && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      swiperIconVisible={false}
      maxDynamicContentSize={DEVICE_HEIGHT}
      modalStyles={styles.modalStyles}
      contentContainerStyle={styles.contentContainerStyle}
      onChange={handleSheetChange}
    >
      <Animated.View
        style={{
          ...styles.contentWrapper,
          marginBottom: marginAnim
        }}
      >
        <Typography fontSize={scale(20)} color={COLORS.textPrimary}>
          {t('settings.manage.accounts.rename.account')}
        </Typography>
        <Spacer value={scale(16)} />
        <View style={styles.inputSectionWrapper}>
          <Typography>{t('settings.manage.accounts.account.name')}</Typography>
          <Spacer value={scale(16)} />
          <Input
            ref={inputRef}
            onChangeText={onChangeText}
            value={newName}
            placeholder={wallet?.name}
            style={styles.inputStyle}
          />
          <Spacer value={scale(10)} />
          <RowContainer
            justifyContent="space-between"
            style={styles.buttonsRowContainer}
          >
            <SecondaryButton
              title={t('buttons.cancel')}
              onPress={() => {
                bottomSheetRef.current?.dismiss();
                setNewName(wallet?.name || '');
              }}
              style={[styles.buttonStyle, styles.secondaryButton]}
            />
            <PrimaryButton
              title={t('buttons.save')}
              onPress={() => {
                if (wallet) {
                  updateWalletName(wallet?.id, newName);
                }
                bottomSheetRef.current?.dismiss();
              }}
              style={[styles.buttonStyle, styles.primaryButton]}
            />
          </RowContainer>
          <Spacer value={scale(16)} />
        </View>
      </Animated.View>
    </BottomSheet>
  );
});
