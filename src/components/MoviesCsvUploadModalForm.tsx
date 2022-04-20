import getHostByEnviroment from '@/helpers/utils';
import { Customer } from '@/models/customer';

import ProForm,{
  ModalForm, ProFormUploadButton
} from '@ant-design/pro-form';

import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import { UploadOutput } from '@/models/upload-output';
import { uploadCsv } from '@/services/movie';
const { Option } = Select;


export default (props) => {
  const {visible, toggleShowForm, title, handleUpload, uploading, output, fileList, uploadProps} = props;

  return (
    <ModalForm<{rentDate: string}>
      title={title}
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel:() => toggleShowForm()
      }}
      onFinish={async (values) => toggleShowForm()}
    >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Selecione arquivo</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList?.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      <div>
        {output ? (output?.imported?.map((message: string, index: number) => <p key={`success${index}`}>{message}</p>)) : ''}
        {output ? (output?.notImported?.map((message: string, index: number) => <p key={`error${index}`}>{message}</p>)) : ''}
      </div>
    </ModalForm>
  )
}
