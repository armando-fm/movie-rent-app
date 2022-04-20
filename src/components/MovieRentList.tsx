import { MovieRent } from '@/models/movie-rent';
import { removeMovieRent, queryMovieRentList, createMovieRent } from '@/services/movie-rent';
import { useEffect, useState } from 'react';
import { message} from 'antd';
import List from './List';
import MovieRentModalForm from './MovieRentModalForm';

const MovieRentList = () => {

  const [showForm, setShowForm] = useState(false);
  const [movieRents, setMovieRents] = useState<MovieRent[]>([])

  const handleLoadMovieRents = async () => {
    const movieRents = await queryMovieRentList();
    setMovieRents(movieRents.data);
  }

  useEffect(() => {
    handleLoadMovieRents();
  }, []);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  }

  const onSubmitForm = async (values) => {
    console.log(values);

    const itemToCreate: MovieRent = {...values};

    await createMovieRent(itemToCreate)
            .then(async () => {
              await handleLoadMovieRents();
              toggleShowForm();
              message.success('Locação cadastrada com sucesso');
            })
            .catch(() => message.error('Erro ao cadastrar locação'));
  }

  const onDelete = async (id: number) => {
    try {
      await removeMovieRent(id);
      message.success('Excluido com successo');
      await handleLoadMovieRents();
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
            title: 'Titulo',
            dataIndex: ["movie", "title"],
          },
          {
            title: 'Nome do Cliente',
            dataIndex: ["customer", "name"],
          }
        ]}
        headerTitle="Lista de Locações"
        data={movieRents}
        toggleShowForm={toggleShowForm}
        onDelete={onDelete}
        onReload={handleLoadMovieRents}
      />
      <MovieRentModalForm
        visible={showForm}
        toggleShowForm={toggleShowForm}
        onSubmitForm={onSubmitForm}
        title='Cadastrar Locação'
      />
    </>
  );
};

export default MovieRentList;
