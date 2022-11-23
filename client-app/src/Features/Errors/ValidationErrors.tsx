import { Message, MessageItem } from 'semantic-ui-react'

interface Props {
  errors: string[]
}

function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i) => (
            <MessageItem key={i}>{err}</MessageItem>
          ))}
        </Message.List>
      )}
    </Message>
  )
}

export default ValidationErrors
