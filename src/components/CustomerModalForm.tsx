import ProForm,{
  ModalForm,
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-form';

export default (props) => {
  const {visible, toggleShowForm, onSubmitForm, title, name, cpf, birthDate} = props;
  return (
    <ModalForm<{name: string, cpf: string, birthDate: string}>
      title={title}
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel:() => toggleShowForm()
      }}
      onFinish={async (values) => {
        await onSubmitForm(values);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Nome"
          placeholder="Por favor introduza o nome"
          initialValue={name}
        />
        <ProFormText
          width="md"
          name="Cpf"
          label="CPF"
          placeholder="Por favor introduza o cpf"
          initialValue={cpf}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="birthdate"
          label="Data de nascimento" />
      </ProForm.Group>
    </ModalForm>
  )
}
