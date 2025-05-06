import { FlatList, ListRenderItemInfo, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, Header, Separator, Typography } from '@components';
import { Arow } from '@components/svgs';
import { COLORS } from '@constants';
import { MMKV_KEYS } from '@lib/mmkv/keys';
import { RootNavigationProp } from '@navigation/root-stack';
import { SecurityToggleItem } from './components';
import { SECURITY_SETTINGS } from './constants';
import { useSecurityScreenStorage } from './hooks';
import { styles } from './styles';
import { SecurityItemTypes, SecuritySettingItem } from './types';

export const SecurityScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { t } = useTranslation();

  const signWithFaceID = useSecurityScreenStorage(
    MMKV_KEYS.signWithFaceID,
    navigation
  );
  const twoFAAuth = useSecurityScreenStorage(
    MMKV_KEYS.twoFAAuthConnected,
    navigation
  );
  const autoApproval = useSecurityScreenStorage(
    MMKV_KEYS.autoApproval,
    navigation
  );

  const toggles: Partial<
    Record<SecurityItemTypes, ReturnType<typeof useSecurityScreenStorage>>
  > = {
    [SecurityItemTypes.signWithFaceID]: signWithFaceID,
    [SecurityItemTypes.twoFAAuth]: twoFAAuth,
    [SecurityItemTypes.autoApproval]: autoApproval
  };

  const renderItem = ({
    item,
    index
  }: ListRenderItemInfo<SecuritySettingItem>) => (
    <View>
      <SecurityToggleItem
        label={t(item.labelKey)}
        value={toggles[item.type]?.value ?? false}
        onValueChange={() => {
          if (!toggles[item.type]?.toggle) return;
          toggles[item.type]?.toggle();
        }}
        description={item.descriptionKey ? t(item.descriptionKey) : undefined}
      />
      {index < SECURITY_SETTINGS.length - 1 && (
        <Separator color={COLORS.neutral300} />
      )}
    </View>
  );

  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.security')} />
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <Button
            style={styles.securityItem}
            onPress={() => {
              //ignore
            }}
          >
            <>
              <Typography color={COLORS.textPrimary}>
                {t('settings.tabs.security.change.passkey')}
              </Typography>
              <Arow color={COLORS.neutral400} orientation="right" />
            </>
          </Button>
          <Separator color={COLORS.neutral300} />
          <FlatList
            data={SECURITY_SETTINGS}
            keyExtractor={(item) => item.type}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
