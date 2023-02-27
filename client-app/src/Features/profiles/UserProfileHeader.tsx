import { Images } from 'App/common/utils/images';
import { UserProfile } from 'App/models/interfaces/profile';
import UserProfileFollowButton from 'Features/profiles/UserProfileFollowButton';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';

export interface Props {
  profile: UserProfile;
}

function UserProfileHeader(props: Props) {
  const { profile } = props;
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.image || Images.baseUserImage}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1' content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount} />
            <Statistic label='Following' value={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          <UserProfileFollowButton profile={profile} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default observer(UserProfileHeader);
