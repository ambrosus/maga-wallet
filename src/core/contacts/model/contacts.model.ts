import { create } from 'zustand';
import { Contact } from '../types';
import { ContactsStoreModel } from './types';

export const useContactsStore = create<ContactsStoreModel>((set) => ({
  contacts: [],
  setContacts: (contacts: Contact[]) => set({ contacts }),
  addContact: (contact: Contact) =>
    set(({ contacts }) => ({ contacts: [...contacts, contact] }))
}));
