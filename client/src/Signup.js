import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const Signup = ({ login }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const [name, email, username, password] = [
      'name',
      'email',
      'username',
      'password',
    ].map((field) => formData.get(field));
    axios
      .post(`${process.env.REACT_APP_API_KEY}/api/v1/users`, {
        name,
        email,
        username,
        password,
        previous_login: new Date(),
      })
      .then((res) => {
        setSuccess(true);
        login(res.data.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
      });
  };

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
      }}
    >
      <h1>Create Account</h1>
      <Form style={{ width: '30rem' }} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name='name'
            onClick={() => setSuccess(null)}
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter email'
            name='email'
            onClick={() => setSuccess(null)}
            autoComplete='off'
          />
          <Form.Text className='text-muted'>
            Personal information will not be shared with external sources
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            name='username'
            onClick={() => setSuccess(null)}
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onClick={() => setSuccess(null)}
          />
          {success === null ? (
            <Form.Text>
              Please use a password different from the one you use for email
            </Form.Text>
          ) : success ? (
            <Form.Text style={{ color: 'green' }}>
              Successful - Account Created
            </Form.Text>
          ) : (
            <Form.Text style={{ color: 'red' }}>
              No spaces allowed in username and password. Username may already
              exist.
            </Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
