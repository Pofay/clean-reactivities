import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'
import { Utils } from '../utils/utils'

interface Props {
  placeholder: string
  name: string
  rows: number
  label?: string
}
function ValidatedTextArea(props: Props) {
  const [field, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !Utils.isNullOrUndefined(meta.error)}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}

export default ValidatedTextArea
