import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/atoms';
import { Button } from '@components/molecules';
import { StatusView } from '@components/organisms';
import { SendFundsCreateContactPopup } from '@components/templates/popups';
import { COLORS, FONT_SIZE } from '@constants';
import { useCreateContactQuery } from '@core/contacts/lib';
import { useSendFundsStore } from '@core/send-funds/model';
import { usePopup } from '@lib';
import { HOME_STACK_ROUTES } from '@navigation';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { StringUtils } from '@utils';
import { styles } from './styles';

export const SendFundsTxStatusScreen = ({
  navigation,
  route
}: RootNavigationScreenProps<HOME_STACK_ROUTES.SendFundsTxStatusScreen>) => {
  const { t } = useTranslation();
  const { amount, receipient, reset } = useSendFundsStore();
  const {
    params: { token, status }
  } = route;

  const { visible, present, dismiss } = usePopup();
  const { createContact, loading, success } = useCreateContactQuery();

  const title = useMemo(() => {
    switch (status) {
      case 'success':
        return t('send.status.success.title');
      case 'error':
        return t('swap.status.error.title');
    }
  }, [status, t]);

  const description = useMemo(() => {
    switch (status) {
      case 'error': {
        return t('swap.status.error.description');
      }
    }
  }, [status, t]);

  const onDoneActionHandle = useCallback(async () => {
    await new Promise<void>((resolve) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: HOME_STACK_ROUTES.HomeScreen,
              params: undefined
            },
            {
              name: HOME_STACK_ROUTES.SendFundsScreen,
              params: { token }
            }
          ]
        })
      );
      requestAnimationFrame(() => resolve());
    });

    reset();
  }, [navigation, reset, token]);

  return (
    <>
      <StatusView
        title={title}
        description={description ?? ''}
        descriptionComponent={
          status === 'success' && (
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textPrimary}
              style={styles.successDescription}
              align="center"
            >
              <Typography
                fontSize={FONT_SIZE.body.md}
                fontFamily="Onest600SemiBold"
                color={COLORS.textPrimary}
                align="center"
              >
                {amount} {token.currencyCode}
              </Typography>{' '}
              {t('send.status.success.description')}{' '}
              <Typography
                fontSize={FONT_SIZE.body.md}
                fontFamily="Onest600SemiBold"
                color={COLORS.textPrimary}
                align="center"
              >
                {StringUtils.formatAddress(
                  receipient,
                  receipient.length - 27,
                  4
                )}
              </Typography>
            </Typography>
          )
        }
        status={status}
        typographyStyle={{
          title: {
            fontSize: FONT_SIZE.heading.xl,
            color: COLORS.textPrimary
          },
          description: {
            fontSize: FONT_SIZE.body.md,
            fontFamily: 'Onest500Medium',
            color: COLORS.textPrimary,
            align: 'center'
          }
        }}
      >
        {status === 'success' && (
          <View style={styles.buttonsContainer}>
            <Button
              activeOpacity={0.75}
              onPress={present}
              disabled={loading || success}
              style={styles.saveContactButton}
            >
              <Typography
                fontSize={FONT_SIZE.body.lg}
                fontFamily="Onest600SemiBold"
                color={COLORS.neutral700}
              >
                {t(
                  `send.status.success.buttons.${
                    success ? 'saved' : 'save'
                  }.contact`
                )}
              </Typography>
            </Button>
            <Button
              activeOpacity={0.75}
              onPress={onDoneActionHandle}
              style={styles.doneButton}
            >
              <Typography
                fontSize={FONT_SIZE.body.lg}
                fontFamily="Onest600SemiBold"
                color={COLORS.white}
              >
                {t('buttons.done')}
              </Typography>
            </Button>
          </View>
        )}
      </StatusView>

      <SendFundsCreateContactPopup
        visible={visible}
        onClose={dismiss}
        createContact={createContact}
        loading={loading}
      />
    </>
  );
};
