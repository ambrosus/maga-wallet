import i18n from '@localization/i18n';

export const slippageErrorHandler = (slippage: string) => {
  const { t } = i18n;
  const parsedSlippage = parseFloat(slippage);

  if (parsedSlippage >= 50) return t('swap.settings.slippage.errors.invalid');
  if (parsedSlippage >= 6) return t('swap.settings.slippage.errors.high');
  if (parsedSlippage < 0.5) return t('swap.settings.slippage.errors.low');

  return null;
};
