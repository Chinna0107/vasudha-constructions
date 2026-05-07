import { useFetch } from './useFetch';

export function useCustomers() {
  return useFetch('/customers');
}
