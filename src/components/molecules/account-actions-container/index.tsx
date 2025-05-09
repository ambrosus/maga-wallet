import { useNavigation } from '@react-navigation/native';
import {
  AccountActionPressableContainer,
  RowContainer
} from '@components/atoms';
import { HOME_STACK_ROUTES } from '@navigation';
import { HomeNavigationProp } from '@navigation/types';

export const AccountActionsContainer = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <RowContainer gap={16}>
      <AccountActionPressableContainer type="send" onActionPress={() => {}} />
      <AccountActionPressableContainer
        type="swap"
        onActionPress={() => navigation.navigate(HOME_STACK_ROUTES.DEXScreen)}
      />
      <AccountActionPressableContainer
        type="receive"
        onActionPress={() => {}}
      />
    </RowContainer>
  );
};
