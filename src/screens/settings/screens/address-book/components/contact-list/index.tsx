import { TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { ThreeDotsIcon, UserIcon } from '@components/svgs';
import { Contact } from '@core/contacts/types';
import { scale, StringUtils } from '@utils';
import { styles } from './styles';

interface ContactListProps {
  contacts: Contact[];
  openAction: (contact: Contact) => void;
}

export const ContactList = ({ contacts, openAction }: ContactListProps) => {
  const renderItem = ({ item, index }: { item: Contact; index: number }) => {
    return (
      <>
        <RowContainer
          justifyContent="space-between"
          alignItems="center"
          style={{
            ...styles.row,
            borderBottomWidth: contacts.length !== index + 1 ? 1 : 0
          }}
        >
          <RowContainer alignItems="center">
            <UserIcon scale={0.5} />
            <Spacer horizontal value={scale(16)} />
            <View>
              <Typography style={styles.name}>{item.name}</Typography>
              <Spacer value={scale(6)} />
              <Typography style={styles.address}>
                {StringUtils.formatAddress(item.address, 25, 4)}
              </Typography>
            </View>
          </RowContainer>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openAction(item)}
          >
            <ThreeDotsIcon />
          </TouchableOpacity>
        </RowContainer>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contacts}
        keyboardShouldPersistTaps="always"
        renderItem={renderItem}
        keyExtractor={({ _id }) => _id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};
