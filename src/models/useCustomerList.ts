import { useRequest } from 'umi';
import { queryCustomerList, removeCustomer } from '@/services/customer';

export default function useCustomerList() {

  const { data, run, loading } = useRequest(() => queryCustomerList());

  console.log(data);
  const deleteCustomers = async (id: string) => {
    try {
      await removeCustomer(id);
      //message.success('success');
      run();
    } catch (error) {
      //message.error('fail');
    }
  };

  return {
    dataSource: data,
    reload: run,
    loading: loading,
    deleteCustomers,
  };
}
