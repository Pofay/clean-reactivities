import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserProfile } from '../../../App/models/interfaces/profile';

interface Props {
  attendees: UserProfile[];
}

export default observer(function ActivityDetailedSidebar(props: Props) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {props.attendees.length}{' '}
        {props.attendees.length === 1 ? 'Person' : 'People'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {props.attendees.map((attendee) => (
            <Item style={{ position: 'relative' }} key={attendee.userName}>
              <Label
                style={{ position: 'absolute' }}
                color='orange'
                ribbon='right'
              >
                Host
              </Label>
              <Image size='tiny' src={attendee.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profiles/${attendee.userName}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
