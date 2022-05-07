import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

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
          <Navbar.Brand>
            <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
              Cookbook Pro
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <div
                style={{
                  minWidth: '120%',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Link
                  to='/browse'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Browse
                </Link>{' '}
                {user && (
                  <Link
                    to='mycookbook'
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    My Cookbook
                  </Link>
                )}
              </div>
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      minWidth: '120%',
                    }}
                  >
                    <Link
                      to='login'
                      style={{
                        marginRight: '5%',
                        textDecoration: 'none',
                        color: 'black',
                      }}
                    >
                      Login
                    </Link>
                    <br />
                    <Link
                      to='signup'
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                      }}
                    >
                      Sign Up
                    </Link>
                  </div>
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
