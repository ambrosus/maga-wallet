import { useCallback, useMemo } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { ContactPersonIcon } from '@components/svgs';
import { COLORS, FONT_SIZE } from '@constants';
import { Contact } from '@core/contacts/types';
import { StringUtils } from '@utils';
import { RowContainer } from '../row-container';
import { Typography } from '../typography';
import { styles } from './styles';

interface ContactListItemProps {
  contact: Contact;
  actions?: boolean;
  onContactPress?: (contact: Contact) => void;
}

export const ContactListItem = ({
  contact,
  actions,
  onContactPress
}: ContactListItemProps) => {
  const address = useMemo(() => {
    const leftSlice = contact.address.length - 13;
    const rightSlice = 4;

    return StringUtils.formatAddress(contact.address, leftSlice, rightSlice);
  }, [contact.address]);

  const handleContactPress = useCallback(() => {
    Keyboard.dismiss();
    if (onContactPress) onContactPress(contact);
  }, [contact, onContactPress]);

  return (
    <RowContainer
      alignItems="center"
      justifyContent="space-between"
      style={styles.container}
    >
      <RowContainer alignItems="center" gap={8}>
        <ContactPersonIcon />
        <TouchableOpacity onPress={handleContactPress}>
          <View>
            <Typography
              fontSize={FONT_SIZE.body.lg}
              fontFamily="Onest500Medium"
              color={COLORS.textPrimary}
            >
              {contact.name}
            </Typography>
            <Typography
              fontSize={FONT_SIZE.body.xs}
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
            >
              {address}
            </Typography>
          </View>
        </TouchableOpacity>
      </RowContainer>

      {actions && (
        <TouchableOpacity>
          <Typography>...</Typography>
        </TouchableOpacity>
      )}
    </RowContainer>
  );
};
