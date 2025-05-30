import { forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Spacer, Typography } from '@components/atoms';
import { TokenLogo } from '@components/molecules';
import { BottomSheet } from '@components/organisms';
import { COLORS, Config, DEVICE_HEIGHT } from '@constants';
import { useForwardedRef } from '@lib/hooks';
import { AppToken } from '@types';
import { scale, verticalScale } from '@utils';
import { styles } from './styles';

interface BottomSheetSupportedTokensProps {
  onTokenSelect?: (token: AppToken) => void;
}

export const BottomSheetSupportedTokens = forwardRef<
  BottomSheetModal,
  BottomSheetSupportedTokensProps
>((_, ref) => {
  const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: AppToken }) => {
    return (
      <View style={styles.tokenItem}>
        <TokenLogo token={item.symbol} />
        <Spacer horizontal value={scale(8)} />
        <Typography
          fontWeight="500"
          fontSize={scale(16)}
          color={COLORS.textPrimary}
        >
          {item.name}
        </Typography>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.dismiss()}>
          <View style={styles.footerButton}>
            <Typography
              align="center"
              fontSize={scale(16)}
              color={COLORS.primary400}
            >
              {t('buttons.got.it')}
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
    >
      <Spacer value={verticalScale(8)} />
      <Typography
        fontSize={scale(18)}
        color={COLORS.textPrimary}
        align="center"
      >
        {t('receive.supported.tokens')}
      </Typography>
      <Spacer value={verticalScale(12)} />
      <View style={styles.container}>
        <BottomSheetFlatList
          data={Config.TOKENS}
          renderItem={renderItem}
          keyExtractor={(item) => item.address}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listWrapper}
          bounces={false}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    </BottomSheet>
  );
});
