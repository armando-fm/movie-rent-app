import { Movie } from '@/models/movie';
import { removeMovie, queryMovieList, uploadCsv } from '@/services/movie';
import { useEffect, useState } from 'react';
import { message, Upload} from 'antd';
import List from './List';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import MoviesCsvUploadModalForm from './MoviesCsvUploadModalForm';
import { UploadOutput } from '@/models/upload-output';

const MovieList = () => {

  const [showForm, setShowForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [output, setOutput] = useState<UploadOutput>()

  const handleLoadMovies = async () => {
    const movies = await queryMovieList();
    setMovies(movies.data);
  }

  useEffect(() => {
    handleLoadMovies();
  }, []);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  }

  const toggleShowUploadCsvForm = () => {
    setShowUploadForm(!showUploadForm)
  }

  const onDelete = async (id: number) => {
    try {
      await removeMovie(id);
      message.success('Excluido com successo');
      await handleLoadMovies();
    } catch (error) {
      message.error('Erro ao tentar excluir');
    }
  };


  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach?.(file => {
      formData.append('file', file);
    });

    setUploading(true);

    uploadCsv(formData).then((response) => {
      setFileList([]);
      setOutput(response);
      handleLoadMovies();
      message.success('Carregado com sucesso.');
    })
      .catch(() => {
        message.error('Erro ao carregar.');
      })
      .finally(() => {
        setUploading(false);
      });
  }

  const uploadProps = {
    onRemove: () => {
      setFileList([])
    },
    beforeUpload: (file) => {

      const isCsv = file.type === 'text/csv';

      if (!isCsv) {
        message.error(`${file.name} Não é um ficheiro csv`);
        return isCsv || Upload.LIST_IGNORE;;
      }

      const files = [];
      files.push(file);
      setFileList(files)
      return false;
    },
    fileList,
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
          title: 'Title',
          dataIndex: 'title',
        },
        {
          title: 'Classificação',
          dataIndex: 'indicativeClassification',
        }
      ]}
      headerTitle="Lista de Filmes"
      data={movies}
      toggleShowForm={toggleShowForm}
      onDelete={onDelete}
      onReload={handleLoadMovies}

    />

    <MoviesCsvUploadModalForm
      visible={showUploadForm}
      toggleShowForm={toggleShowUploadCsvForm}
      output={output}
      fileList={fileList}
      handleUpload={handleUpload}
      uploading={uploading}
      uploadProps={uploadProps}
    />

    <Button
        style={{ margin: 20 }}
        key="reload"
        type="primary"
        icon={<SaveOutlined />}
        onClick={() => toggleShowUploadCsvForm()}>
          Importar
    </Button>
  </>
  );
};

export default MovieList;
