import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contactsApi } from '@core/contacts/api';
import { useContactsStore } from '@core/contacts/model';

export const useAllContactsQuery = () => {
  const { setContacts } = useContactsStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getContacts,
    refetchInterval: 5 * 60 * 1000
  });

  useEffect(() => {
    if (data && data.length > 0) setContacts(data);
  }, [data, setContacts]);

  return { loading: isLoading, error };
};
