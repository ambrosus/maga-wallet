import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { RowContainer, Spacer, Typography, Separator } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { EditIcon, SendIcon } from '@components/svgs';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { Contact } from '@core/contacts/types';
import { useForwardedRef } from '@lib/hooks';
import { scale, StringUtils, verticalScale } from '@utils';
import { styles } from './styles';

interface BottomSheetContactActionProps {
  contact: Contact | null;
  onSendPress: () => void;
  onEditPress: () => void;
  onRemovePress: () => void;
}

interface ContactActionItemProps {
  textColor?: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export const BottomSheetContactAction = forwardRef<
  BottomSheetModal,
  BottomSheetContactActionProps
>(({ contact, onSendPress, onEditPress, onRemovePress }, ref) => {
  const { t } = useTranslation();
  const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);

  const ContactActionItem = ({
    title,
    icon,
    textColor = COLORS.textPrimary,
    onPress
  }: ContactActionItemProps) => {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <RowContainer alignItems="center" gap={scale(10)}>
          {icon}
          <Spacer horizontal value={scale(4)} />
          <Typography color={textColor}>{title}</Typography>
        </RowContainer>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
    >
      <Spacer value={verticalScale(6)} />
      <Typography
        color={COLORS.textPrimary}
        align="center"
        fontSize={scale(18)}
      >
        {contact?.name || ''}
      </Typography>
      <Spacer value={verticalScale(6)} />
      <Typography align="center" fontSize={scale(12)}>
        {StringUtils.formatAddress(contact?.address || '', 25, 4)}
      </Typography>
      <Spacer value={verticalScale(16)} />
      <ContactActionItem
        title={t('settings.address.book.action.send')}
        icon={<SendIcon />}
        onPress={onSendPress}
      />
      <ContactActionItem
        title={t('settings.address.book.action.edit')}
        icon={<EditIcon />}
        onPress={onEditPress}
      />
      <ContactActionItem
        textColor={COLORS.destructive500}
        title={t('buttons.remove')}
        icon={<Separator itemWidth={14} color={COLORS.destructive500} />}
        onPress={onRemovePress}
      />
      <Spacer value={verticalScale(20)} />
    </BottomSheet>
  );
});
