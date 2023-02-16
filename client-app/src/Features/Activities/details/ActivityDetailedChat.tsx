import ValidatedTextArea from 'App/common/form/ValidatedTextArea';
import { Images } from 'App/common/utils/images';
import { useStore } from 'App/stores/store';
import ValidationErrors from 'Features/Errors/ValidationErrors';
import { Formik, Form, yupToFormErrors, FieldProps, Field } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Button, Loader } from 'semantic-ui-react';
import * as Yup from 'yup';

interface Props {
  activityId: string;
}

const validationSchema = Yup.object({
  body: Yup.string().required(),
});

function isSubmitKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  return e.key === 'Enter' && !e.shiftKey;
}

function isPressingNewLineKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  return e.key === 'Enter' && e.shiftKey;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) {
      commentStore.createAndStartHubConnection(activityId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || Images.baseUserImage} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.userName}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>

        <Formik
          onSubmit={(values, { resetForm }) => {
            commentStore.addComment(values).then(() => resetForm());
          }}
          initialValues={{ body: '' }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className='ui form'>
              <Field name='body'>
                {(props: FieldProps) => (
                  <div style={{ position: 'relative' }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder='Enter your comment (Enter to submit, SHIFT + ENTER for new line)'
                      rows={2}
                      {...props.field}
                      onKeyDownCapture={(e) => {
                        if (isPressingNewLineKeys(e)) {
                          return;
                        }
                        if (isSubmitKey(e)) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
});
