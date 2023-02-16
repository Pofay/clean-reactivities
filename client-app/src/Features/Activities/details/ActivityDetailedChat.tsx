import ValidatedTextArea from 'App/common/form/ValidatedTextArea';
import { Images } from 'App/common/utils/images';
import { useStore } from 'App/stores/store';
import ValidationErrors from 'Features/Errors/ValidationErrors';
import { Formik, Form, yupToFormErrors } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Button } from 'semantic-ui-react';
import * as Yup from 'yup';

interface Props {
  activityId: string;
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
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>

        <Formik
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            commentStore.addComment(values).then(() => resetForm());
          }}
          initialValues={{ body: '' }}
          validationSchema={Yup.object({ body: Yup.string().required() })}
        >
          {({ isSubmitting, isValid }) => (
            <Form className='ui form'>
              <ValidatedTextArea
                placeholder='Add Comment'
                name='body'
                rows={2}
              />
              <Button
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                content='Add Reply'
                labelPosition='left'
                icon='edit'
                primary
                type='submit'
                floated='right'
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
});
