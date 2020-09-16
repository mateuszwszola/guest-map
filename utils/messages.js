import { queryCache, useMutation, useQuery } from 'react-query';
import { getMessages, createMessage } from './messagesClient';

export function useMessages({ ...options }) {
  return useQuery('messages', getMessages, options);
}

export function useCreateMessage() {
  return useMutation(createMessage, {
    onMutate: (newMessage) => {
      queryCache.cancelQueries('messages');

      const previousMessages = queryCache.getQueryData('messages');

      queryCache.setQueryData('messages', (old) => [
        ...old,
        {
          _id: new Date().toISOString(),
          message: newMessage.message,
          user: {
            displayName: newMessage.identity,
          },
          location: {
            type: 'Point',
            geo: [newMessage.longitude, newMessage.latitude],
          },
          createdAt: new Date().toISOString(),
        },
      ]);

      return () => queryCache.setQueryData('messages', previousMessages);
    },
    onError: (err, newMessage, rollback) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries('messages');
    },
  });
}
