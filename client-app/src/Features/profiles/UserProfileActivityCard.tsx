import { Images } from 'App/common/utils/images';
import { UserActivity } from 'App/models/interfaces/activity';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

interface Props {
  userActivity: UserActivity;
}

function UserProfileActivityCard(props: Props) {
  const { userActivity } = props;
  return (
    <Card key={userActivity.id} as={Link} to={`/activities/${userActivity.id}`}>
      <Image
        src={Images.categoryImage(userActivity.category)}
        style={{ minHeight: 100, objectFit: 'cover' }}
      />
      <Card.Content>
        <Card.Header textAlign='center'>{userActivity.title}</Card.Header>
        <Card.Meta textAlign='center'>
          <div>{format(new Date(userActivity.date), 'do LLL')}</div>
          <div>{format(new Date(userActivity.date), 'h:mm a')}</div>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default observer(UserProfileActivityCard);
