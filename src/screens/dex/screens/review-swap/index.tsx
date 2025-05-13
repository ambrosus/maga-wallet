import { useTranslation } from 'react-i18next';
import { SafeViewContainer } from '@components/atoms';
import { Header } from '@components/molecules';

export const DexReviewSwapScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeViewContainer>
      <Header title={t('buttons.review')} />
    </SafeViewContainer>
  );
};
