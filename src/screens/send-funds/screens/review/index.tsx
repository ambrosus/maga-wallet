import { SafeViewContainer } from '@components/atoms';
import { Header } from '@components/molecules';
import { SendFundsReviewForm } from '@components/templates';
import { HOME_STACK_ROUTES } from '@navigation';
import { RootNavigationScreenProps } from '@navigation/root-stack';

export const SendFundsReviewScreen = ({
  route
}: RootNavigationScreenProps<HOME_STACK_ROUTES.SendFundsReviewScreen>) => {
  const {
    params: { token }
  } = route;

  return (
    <SafeViewContainer>
      <Header title="Review" closeIconVisible backIconVisible={false} />

      <SendFundsReviewForm token={token} />
    </SafeViewContainer>
  );
};
