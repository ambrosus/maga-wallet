import {
  AccountActionsContainer,
  SafeViewContainer,
  Spacer
} from '@components';
import { verticalScale } from '@utils';
import { styles } from './styles';

export const HomeScreen = () => {
  return (
    <SafeViewContainer style={styles.container}>
      <Spacer value={verticalScale(64)} />
      <AccountActionsContainer />
    </SafeViewContainer>
  );
};
