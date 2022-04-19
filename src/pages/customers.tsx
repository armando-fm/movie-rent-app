import { useModel } from 'umi';
import CustomerList from '@/components/CustomerList';

const Customers = () => {
  const { dataSource, reload, deleteCustomers } = useModel('useCustomerList');

  return(
  <div>
      <a onClick={() => reload()}>reload</a>
      <CustomerList onDelete={deleteCustomers} customers={dataSource} />
    </div>)
}

export default Customers;
