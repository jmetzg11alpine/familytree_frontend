import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/reducers/profileReducer';
import { handleScale } from './profiles/helpers';
import { Link, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/header.css';

const LoginModal = ({ modalOpen, setModalOpen, dispatch }) => {
  const [message, setMessage] = useState('Log in to make changes');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const url = process.env.REACT_APP_URL;
    const response = await fetch(`${url}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const resp = await response.json();
    if (resp.message === true) {
      setMessage('You have logged in');
      dispatch(setCurrentUser(username));
    } else {
      setMessage('Credntials are wrong');
      dispatch(setCurrentUser(''));
    }
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const handleLogout = () => {
    setMessage('You have logged out');
    dispatch(setCurrentUser(''));
  };
  return (
    <Modal show={modalOpen}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='success' onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant='secondary' onClick={handleLogout}>
          Logout
        </Button>
        <Button onClick={handleCancel}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.profileReducer.scale);
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const makeBigger = () => {
    handleScale(-1, scale, dispatch, coorRange);
  };
  const makeSmaller = () => {
    handleScale(1, scale, dispatch, coorRange);
  };
  const handleLogin = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className='header pb-4 pt-2'>
        {location.pathname === '/' && (
          <>
            <div className='plus-minus'>
              <div onClick={makeBigger}>+</div>
              <div onClick={makeSmaller}>-</div>
            </div>
          </>
        )}

        <Link to='/'>Home</Link>
        <Link to='/map'>Map</Link>
        <Link to='/info'>Info</Link>
        <Link onClick={handleLogin}>{currentUser ? 'Logout' : 'Login'}</Link>
      </div>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} dispatch={dispatch} />
    </>
  );
};
export default Header;
