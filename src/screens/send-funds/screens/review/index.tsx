import { SafeViewContainer } from '@components/atoms';
import { Header } from '@components/molecules';

export const SendFundsReviewScreen = () => {
  return (
    <SafeViewContainer>
      <Header title="Review" closeIconVisible backIconVisible={false} />
    </SafeViewContainer>
  );
};
