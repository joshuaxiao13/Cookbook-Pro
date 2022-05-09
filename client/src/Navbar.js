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
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='justify-content-between flex-grow-1'>
              <Nav>
                <Nav className='justify-content-evenly flex-grow-1 pe-3'>
                  <Link
                    to='/browse'
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Browse
                  </Link>
                </Nav>
                <Nav />
                {user && (
                  <Nav>
                    <Link
                      to='mycookbook'
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      My Cookbook
                    </Link>
                  </Nav>
                )}
              </Nav>
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
                <>
                  <Nav className='justify-content-end flex-grow-1 pe-3'>
                    <Link
                      to='login'
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                      }}
                    >
                      Login
                    </Link>
                  </Nav>
                  <Nav>
                    <Link
                      to='signup'
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                      }}
                    >
                      Sign Up
                    </Link>
                  </Nav>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
