import { View } from 'react-native';
import { slice } from 'lodash';
import { Spacer, Typography } from '@components/atoms';
import { ReceipientContactsList } from '@components/organisms';
import { COLORS, FONT_SIZE } from '@constants';
import { CONTACTS } from '@core/contacts/constants';
import { Contact } from '@core/contacts/types';
import { verticalScale } from '@utils';
import { styles } from './styles';

interface ReceipientContactsSelectorProps {
  onContactPress?: (contact: Contact) => void;
}

export const ReceipientContactsSelector = ({
  onContactPress
}: ReceipientContactsSelectorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.paddingContainer}>
        <View style={styles.divider} />

        <Typography
          fontSize={FONT_SIZE.body.sm}
          fontFamily="Onest500Medium"
          color={COLORS.textTertiary}
        >
          Choose from Address Book
        </Typography>
      </View>

      <Spacer value={verticalScale(12)} />
      <ReceipientContactsList
        contacts={slice(CONTACTS, 0, 5)}
        onContactPress={onContactPress}
      />
    </View>
  );
};
