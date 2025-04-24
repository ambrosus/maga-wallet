import { useTranslation } from 'react-i18next';
import { Spacer } from '@components/atoms';
import { SetupPasskeyRowItem } from '@components/molecules';
import { FingerprintIcon, ShieldIcon } from '@components/svgs';
import { verticalScale } from '@utils';

export const SetupPasskeyBenefitsContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <SetupPasskeyRowItem
        icon={<ShieldIcon />}
        title={t('setupPasskey.benefits.secure.title')}
        description={t('setupPasskey.benefits.secure.description')}
      />
      <Spacer value={verticalScale(32)} />
      <SetupPasskeyRowItem
        icon={<FingerprintIcon />}
        title={t('setupPasskey.benefits.accessibility.title')}
        description={t('setupPasskey.benefits.accessibility.description')}
      />
    </>
  );
};
