import { useFetch } from './useFetch';

export function useProfile(id) {
  return useFetch(id ? `/customers/${id}` : null);
}
