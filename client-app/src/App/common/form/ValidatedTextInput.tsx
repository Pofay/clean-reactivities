import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'
import { Utils } from '../utils/utils'

interface Props {
  placeholder: string
  name: string
  label?: string
  type?: string  
}
function ValidatedTextInput(props: Props) {
  const [field, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !Utils.isNullOrUndefined(meta.error)}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}

export default ValidatedTextInput
