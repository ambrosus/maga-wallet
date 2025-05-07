import {
  AccountActionPressableContainer,
  RowContainer
} from '@components/atoms';

export const AccountActionsContainer = () => {
  return (
    <RowContainer gap={16}>
      <AccountActionPressableContainer type="send" onActionPress={() => {}} />
      <AccountActionPressableContainer type="swap" onActionPress={() => {}} />
      <AccountActionPressableContainer
        type="receive"
        onActionPress={() => {}}
      />
    </RowContainer>
  );
};
