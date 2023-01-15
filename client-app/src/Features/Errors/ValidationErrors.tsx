import { Message, MessageItem } from 'semantic-ui-react';

interface Props {
  errors: any;
}

function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i: any) => (
            <MessageItem key={i}>{err}</MessageItem>
          ))}
        </Message.List>
      )}
    </Message>
  );
}

export default ValidationErrors;
