import { useField } from 'formik'
import { Form, Label, Select } from 'semantic-ui-react'
import { Utils } from '../utils/utils'

interface Props {
  placeholder: string
  name: string
  options: any
  label?: string
}
function ValidatedSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !Utils.isNullOrUndefined(meta.error)}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(event, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />

      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}

export default ValidatedSelectInput
