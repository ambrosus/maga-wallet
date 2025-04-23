import { RowContainer, Typography } from '@components/atoms';
import { SocialItemCircle } from '@components/molecules';
import { AUTH_METHODS } from '@constants/auth/methods';

export const SocialAuthList = () => {
  return (
    <RowContainer
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      {Object.keys(AUTH_METHODS).map((key) => {
        return (
          <SocialItemCircle key={key}>
            <Typography>{key.slice(0, 1)}</Typography>
          </SocialItemCircle>
        );
      })}
    </RowContainer>
  );
};
