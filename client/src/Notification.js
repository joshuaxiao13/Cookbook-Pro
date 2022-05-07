import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const Notification = ({ notifs, removeNotif }) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer
      className='position-fixed'
      position='top-end'
      style={{ marginTop: '5%', marginRight: '3%' }}
    >
      {notifs.map((recipeName) => {
        return (
          <Toast
            show={show}
            onClose={() => {
              removeNotif(recipeName);
            }}
          >
            <Toast.Header>
              <img
                src='holder.js/20x20?text=%20'
                className='rounded me-2'
                alt=''
              />
              <strong className='me-auto' style={{ color: 'green' }}>
                Request Successful
              </strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>
              A moderator will review your <u>{recipeName}</u> recipe soon.
              Meanwhile, browse or create more recipes.
            </Toast.Body>
          </Toast>
        );
      })}
    </ToastContainer>
  );
};

export default Notification;
