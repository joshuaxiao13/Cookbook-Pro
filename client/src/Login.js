import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    axios
      .patch(`${process.env.REACT_APP_API_KEY}/api/v1/users/login`, {
        username,
        password,
        previous_login: new Date(),
      })
      .then((res) => {
        setSuccess(true);
        login(res.data.user);
        navigate('/mycookbook');
      })
      .catch((error) => {
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
      <h1>Login</h1>
      <Form style={{ width: '30rem' }} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            name='username'
            onClick={() => setSuccess(null)}
            autoComplete='off'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='off'
            onClick={() => setSuccess(null)}
            required
          />
          {success !== null &&
            (success ? (
              <Form.Text style={{ color: 'green' }}>Successful Login</Form.Text>
            ) : (
              <Form.Text style={{ color: 'red' }}>
                Username and Password Don't Match
              </Form.Text>
            ))}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
        <Form.Group>
          <Form.Text className='text-muted'>
            <br />
            Do not post sensitive information (passwords, etc.) anywhere on the
            site
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
