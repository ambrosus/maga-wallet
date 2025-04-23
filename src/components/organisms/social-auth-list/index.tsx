import { useMemo } from 'react';
import { RowContainer } from '@components/atoms';
import { SocialItemCircle } from '@components/molecules';
import { AUTH_METHODS } from '@constants/auth';

export const SocialAuthList = () => {
  const justifyContentProp = useMemo(() => {
    const length = AUTH_METHODS.filter(({ visible }) => visible).length;

    return length === AUTH_METHODS.length ? 'space-between' : 'space-around';
  }, []);

  return (
    <RowContainer
      width="100%"
      justifyContent={justifyContentProp}
      alignItems="center"
    >
      {AUTH_METHODS.map(
        ({ key, component: Icon, visible }) =>
          visible && (
            <SocialItemCircle key={key}>
              <Icon />
            </SocialItemCircle>
          )
      )}
    </RowContainer>
  );
};
