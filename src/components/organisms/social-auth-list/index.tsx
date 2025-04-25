import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RowContainer } from '@components/atoms';
import { SocialItemCircle } from '@components/molecules';
import { AUTH_METHODS } from '@constants/auth';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';

export const SocialAuthList = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const justifyContentProp = useMemo(() => {
    const length = AUTH_METHODS.filter(({ visible }) => visible).length;

    return length === AUTH_METHODS.length ? 'space-between' : 'space-around';
  }, []);

  const onNavigateToPasskey = async () => {
    navigation.navigate(ROOT_STACK_ROUTES.SetupPasskeyScreen);
  };

  return (
    <RowContainer
      width="100%"
      justifyContent={justifyContentProp}
      alignItems="center"
    >
      {AUTH_METHODS.map(
        ({ key, component: Icon, visible }) =>
          visible && (
            <SocialItemCircle key={key} onPress={onNavigateToPasskey}>
              <Icon />
            </SocialItemCircle>
          )
      )}
    </RowContainer>
  );
};
