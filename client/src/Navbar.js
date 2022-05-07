import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MyNavbar = ({ user, logout }) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='light'
        variant='light'
        fixed='top'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Cookbook Pro</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/browse'>
                <Nav.Link>Browse</Nav.Link>
              </LinkContainer>
              {user && (
                <LinkContainer to='mycookbook'>
                  <Nav.Link>My Cookbook</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav>
              {user !== null ? (
                <NavDropdown title={user.username} id='collasible-nav-dropdown'>
                  <NavDropdown.Item
                    href='/'
                    onClick={() => logout(null)}
                    style={{ color: 'red' }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Nav.Link href='login'>Login</Nav.Link>
                  <Nav.Link href='signup'>Sign Up</Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
