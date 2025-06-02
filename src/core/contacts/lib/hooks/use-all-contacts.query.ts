import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllContacts } from '@core/contacts/api';
import { useContactsStore } from '@core/contacts/model';

export const useAllContactsQuery = () => {
  const { setContacts } = useContactsStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchAllContacts,
    refetchInterval: 5 * 60 * 1000
  });

  useEffect(() => {
    if (data && data.length > 0) setContacts(data);
  }, [data, setContacts]);

  return { loading: isLoading, error };
};
