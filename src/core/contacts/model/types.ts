import { Contact } from '../types';

export interface ContactsStoreModel {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
}
