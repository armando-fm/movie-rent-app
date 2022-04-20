import { queryCustomerList, removeCustomer, createCustomer } from '@/services/customer';
import { useEffect, useState } from 'react';
import List from './List';
import{ message }from'antd';
import CustomerModalForm from './CustomerModalForm';
import { Customer } from '@/models/customer';

const CustommerList = () => {

  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState<Customer>(new Customer())
  const [customers, setCustomers] = useState<Customer[]>([])

  const handleLoadCustomers = async () => {
    const customers = await queryCustomerList();
    setCustomers(customers.data);
  }

  useEffect(() => {
    handleLoadCustomers();
  }, [])

  const toggleShowForm = () => {
    setShowForm(!showForm);
  }

  const onSubmitForm = async (values) => {

    const customerToCeate: Customer = {...values};

    await createCustomer(customerToCeate)
            .then(async () => {
              await handleLoadCustomers();
              toggleShowForm();
              message.success('Cliente cadastrado com sucesso');
            })
            .catch(() => message.error('Erro ao cadastrar cliente'));
  }

  const onDelete = async (id: number) => {
    try {
      await removeCustomer(id);
      message.success('Excluido com successo');
      await handleLoadCustomers();
    } catch (error) {
      message.error('Erro ao tentar excluir');
    }
  };

  return (
    <>
    <List
        fieldColumns={[
          {
            title: 'ID',
            dataIndex: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'CPF',
            dataIndex: 'cpf',
          }, {
            title: 'Data de Nascimento',
            dataIndex: 'birthdate'
          }
        ]}
        data={customers}
        headerTitle='Lista de Clientes'
        toggleShowForm={toggleShowForm}
        onReload={handleLoadCustomers}
        onDelete={onDelete}
    />
    <CustomerModalForm
      visible={showForm}
      toggleShowForm={toggleShowForm}
      onSubmitForm={onSubmitForm}
      title='Cadastrar Cliente'
    />
    </>
  );
};

export default CustommerList;
