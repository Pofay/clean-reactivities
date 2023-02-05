import { Images } from 'App/common/utils/images';
import { useStore } from 'App/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

export default observer(function Navbar() {
  const {
    userStore: { user, logout },
  } = useStore();

  const navigate = useNavigate();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src={Images.logo} alt='logo' style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Actitivies' />
        <Menu.Item as={NavLink} to='/errors' name='Errors' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/activities/createActivity'
            positive
            content='Create Activity'
          />
          <Menu.Item position='right'>
            <Image
              src={user?.image || Images.baseUserImage}
              avatar
              spaced='right'
            ></Image>
            <Dropdown pointing='top left' text={user?.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profiles/${user?.userName}`}
                  text='My Profile'
                  icon='user'
                />
                <Dropdown.Item
                  onClick={() => logout().then(() => navigate('/'))}
                  text='Log out'
                  icon='power'
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
