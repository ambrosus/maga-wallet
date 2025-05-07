import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IProvider } from '@web3auth/base';
import { RowContainer } from '@components/atoms';
import { SocialItemCircle } from '@components/molecules';
import { isAndroid } from '@constants';
import { AUTH_METHODS, StaticAuthPreset } from '@constants/auth';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';
import { AuthMethods } from '@types';

interface SocialAuthListProps {
  loading: boolean;
  authCallback: (method: AuthMethods) => Promise<IProvider | null | undefined>;
}

export const SocialAuthList = ({
  loading,
  authCallback
}: SocialAuthListProps) => {
  const navigation = useNavigation<RootNavigationProp>();

  const justifyContentProp = useMemo(() => {
    const length = AUTH_METHODS.filter(({ visible }) => visible).length;

    return length === AUTH_METHODS.length ? 'space-between' : 'space-around';
  }, []);

  const onAuthHandle = useCallback(
    async (method: AuthMethods) => {
      const response = await authCallback(method);

      if (response) {
        navigation.navigate(ROOT_STACK_ROUTES.SetupPasskeyScreen);
      }
    },
    [authCallback, navigation]
  );

  const renderSocialItem = useCallback(
    ({ key, component: Icon, visible }: StaticAuthPreset) => {
      const onItemPress = () => onAuthHandle(key);

      if (isAndroid && key === 'apple' && visible)
        console.warn('Apple login is not supported on Android');

      return (
        visible && (
          <SocialItemCircle key={key} disabled={loading} onPress={onItemPress}>
            <Icon />
          </SocialItemCircle>
        )
      );
    },
    [loading, onAuthHandle]
  );

  return (
    <RowContainer
      width="100%"
      justifyContent={justifyContentProp}
      alignItems="center"
    >
      {AUTH_METHODS.map(({ key, component: Icon, visible }) =>
        renderSocialItem({ key, component: Icon, visible })
      )}
    </RowContainer>
  );
};
