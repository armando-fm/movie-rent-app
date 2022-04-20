import { Customer } from '@/models/customer';
import { Movie } from '@/models/movie';
import { MovieRent } from '@/models/movie-rent';
import { queryCustomerList } from '@/services/customer';
import { queryMovieList } from '@/services/movie';
import ProForm,{
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

import { Select } from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;


export default (props) => {
  const {visible, toggleShowForm, onSubmitForm, title} = props;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [customerId, setCustomerId] = useState<Number>(0)
  const [movieId, setMovieId] = useState<Number>(0)

  const handleLoadCustomers = async() => {
    const customers = await queryCustomerList()
    setCustomers(customers.data);
  }

  const handleLoadMovies = async() => {
    const movies = await queryMovieList()
    setMovies(movies.data);
  }

  useEffect(() => {
    if (visible) {
      handleLoadCustomers();
      handleLoadMovies();
    }
  }, [visible])

  const handleChangeCustomer = (value: Number) => {
    setCustomerId(value);
  }

  const handleChangeMovie = (value: Number) => {
    setMovieId(value);
  }

  return (
    <ModalForm<{rentDate: string}>
      title={title}
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel:() => toggleShowForm()
      }}
      onFinish={async (values) => {
        await onSubmitForm({...values, customerId, movieId});
        return true;
      }}
    >
      <ProForm.Group>
        <Select key='select1' style={{ width: 150, marginBottom: 20 }} onChange={handleChangeCustomer}>
          <Option disabled selected>Selecione Cliente</Option>
          {customers?.map((customer: Customer) => {
            return <Option key={`customer${customer.id}`} value={customer.id}>{customer.name}</Option>;
          })}
        </Select>
        <Select key='select2' style={{ width: 150 }} onChange={handleChangeMovie}>
            <Option disabled selected>Selecione Filme</Option>
          {movies?.map((movie: Movie) => {
            return <Option key={`movie${movie.id}`} value={movie.id}>{movie.title}</Option>;
          })}
        </Select>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="rentDate"
          label="Data de locação" />
      </ProForm.Group>
    </ModalForm>
  )
}
