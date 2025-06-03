import { useMutation } from '@tanstack/react-query';
import { contactsApi } from '@core/contacts/api';
import { useContactsStore } from '@core/contacts/model';
import { queryClient } from '@lib/react-query';

export const useCreateContactQuery = () => {
  const { contacts, setContacts } = useContactsStore();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: contactsApi.createContact,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setContacts([...contacts, data]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });

  return {
    createContact: mutateAsync,
    loading: isPending,
    success: isSuccess
  };
};
