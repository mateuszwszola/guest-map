import { useQuery } from 'react-query';
import { getMessages } from './messagesClient';

export function useMessages({ ...options }) {
  return useQuery('messages', getMessages, options);
}
