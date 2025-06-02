import { useCallback } from 'react';
import { View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ContactListItem } from '@components/atoms';
import { Contact } from '@core/contacts/types';
import { styles } from './styles';

interface ReceipientContactsListProps {
  contacts: Contact[];
  onContactPress?: (contact: Contact) => void;
}

export const ReceipientContactsList = ({
  contacts,
  onContactPress
}: ReceipientContactsListProps) => {
  const renderContactItem = useCallback(
    ({ item }: ListRenderItemInfo<Contact>) => {
      return <ContactListItem contact={item} onContactPress={onContactPress} />;
    },
    [onContactPress]
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  return (
    <FlashList
      data={contacts}
      keyboardShouldPersistTaps="always"
      renderItem={renderContactItem}
      keyExtractor={({ _id }) => _id.toString()}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={renderSeparator}
      estimatedItemSize={38}
    />
  );
};
