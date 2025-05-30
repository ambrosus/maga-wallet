import { RowContainer } from '@components/atoms';
import { WalletSelector } from '@components/templates';

export const HomeHeader = () => {
  return (
    <RowContainer justifyContent="space-between">
      <WalletSelector settingsButton />
    </RowContainer>
  );
};
