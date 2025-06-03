import { delay } from '@utils';
import { CONTACTS } from '../constants';
import { Contact } from '../types';

class ContactsApi {
  private contacts = CONTACTS;

  public getContacts = async () => {
    try {
      // TODO: Remove this delay & replace with actual API call
      await delay(1000);
      return this.contacts;
    } catch (error) {
      throw error;
    }
  };

  public createContact = async (contact: Contact) => {
    try {
      this.contacts.push(contact);
      return contact;
    } catch (error) {
      throw error;
    }
  };
}

export const contactsApi = new ContactsApi();
