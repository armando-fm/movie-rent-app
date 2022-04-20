import ProTable, { ActionType } from '@ant-design/pro-table';
import { Popconfirm, Button, message } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { request } from 'umi';

const List = ({fieldColumns, headerTitle, toggleShowForm, data, onDelete, onReload}) => {

  const columns = [
    ...fieldColumns,
    {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Excluir?" onConfirm={() => onDelete?.(record.id)}>
            <Button>Excluir</Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <ProTable
      headerTitle={headerTitle}
      rowKey="id"
      dataSource={data}
      columns={columns}
      options={false}
      toolBarRender={() => [
        <Button
          key="add"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => toggleShowForm?.()}>
          Cadastrar
        </Button>,
        <Button
          key="reload"
          icon={<ReloadOutlined />}
          onClick={() => onReload?.()}>
        </Button>
      ]}
    />
  );
};

export default List;
