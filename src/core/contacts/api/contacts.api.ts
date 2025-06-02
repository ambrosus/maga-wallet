import { delay } from '@utils';
import { CONTACTS } from '../constants';

export const fetchAllContacts = async () => {
  try {
    // TODO: Remove this delay & replace with actual API call
    await delay(1000);
    return CONTACTS;
  } catch (error) {
    throw error;
  }
};
