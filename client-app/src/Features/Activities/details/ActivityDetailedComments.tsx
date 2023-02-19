import { Images } from 'App/common/utils/images';
import { ChatComment } from 'App/models/interfaces/comment';
import { formatDistanceToNow } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';

interface Props {
  comments: ChatComment[];
}

function ActivityDetailedComments(props: Props) {
  const { comments } = props;
  return (
    <Comment.Group>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <Comment.Avatar src={comment.image || Images.baseUserImage} />
          <Comment.Content>
            <Comment.Author as={Link} to={`/profiles/${comment.userName}`}>
              {comment.displayName}
            </Comment.Author>
            <Comment.Metadata>
              <div>{formatDistanceToNow(comment.createdAt)} ago</div>
            </Comment.Metadata>
            <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
              {comment.body}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
}

export default observer(ActivityDetailedComments);
