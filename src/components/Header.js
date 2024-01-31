import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCountry } from '../store/reducers/profileReducer';
import { handleScale } from './profiles/helpers';
import { Link, useLocation } from 'react-router-dom';
import { Modal, Button, Form, Navbar } from 'react-bootstrap';
import '../styles/header.css';
import usaFlag from '../styles/images/united-states-flag-icon.svg';
import russianFlag from '../styles/images/russia-flag-icon.svg';

const LoginModal = ({ modalOpen, setModalOpen, dispatch }) => {
  const country = useSelector((state) => state.profileReducer.country);
  const [message, setMessage] = useState(
    country === 'USA' ? 'Log in to make changes' : 'Войдите, чтобы внести изменения'
  );
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
      setMessage(country === 'RU' ? 'Вы вошли в систему' : 'You are logged in');
      dispatch(setCurrentUser(username.trim()));
      setModalOpen(false);
    } else {
      setMessage(country === 'US' ? 'Credentials are wrong' : 'Учетные данные неверны');
      dispatch(setCurrentUser(''));
    }
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    setMessage('You have logged out');
    setMessage(country === 'US' ? 'You have logged out' : 'Вы успешно вышли');
    dispatch(setCurrentUser(''));
  };

  return (
    <Modal show={modalOpen}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{country === 'US' ? 'Username' : 'Имя пользователя'}</Form.Label>
            <Form.Control
              type='text'
              placeholder={
                country === 'US' ? 'Enter username' : 'Введите имя пользователя'
              }
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{country === 'US' ? 'Password' : 'Пароль'}</Form.Label>
            <Form.Control
              type='text'
              placeholder={country === 'US' ? 'Enter password' : 'Введите пароль'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='success' onClick={handleSubmit}>
          {country === 'US' ? 'Submit' : 'Отправить'}
        </Button>
        <Button variant='secondary' onClick={handleLogout}>
          {country === 'US' ? 'Logout' : 'Выйти'}
        </Button>
        <Button onClick={handleCancel}>{country === 'US' ? 'Close' : 'Закрыть'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const FlagSelector = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.profileReducer.country);
  const handleClick = (countryCode) => {
    dispatch(selectCountry(countryCode));
  };
  return (
    <div className='header-flag-container'>
      <img
        alt='usa flag'
        className={`flag ${country === 'US' ? 'active' : ''}`}
        src={usaFlag}
        onClick={() => handleClick('US')}
      />
      <img
        alt='russian flag'
        className={`flag ${country === 'RU' ? 'active' : ''}`}
        src={russianFlag}
        onClick={() => handleClick('RU')}
      />
    </div>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.profileReducer.scale);
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const country = useSelector((state) => state.profileReducer.country);
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
      <Navbar className='py-0'>
        <div className='header'>
          {location.pathname === '/' && (
            <>
              <div className='plus-minus ms-4'>
                <div onClick={makeBigger}>+</div>
                <div onClick={makeSmaller}>-</div>
              </div>
            </>
          )}
          <div className='header-links'>
            <Link to='/'>{country === 'US' ? 'Home' : 'Главная'}</Link>
            <Link to='/map'>{country === 'US' ? 'Map' : 'Карта'}</Link>
            <Link to='/info'>{country === 'US' ? 'Info' : 'Инфо'}</Link>
            <Link onClick={handleLogin}>
              {currentUser
                ? country === 'US'
                  ? 'Lougout'
                  : 'Выход'
                : country === 'RU'
                ? 'Вход'
                : 'Login'}
            </Link>
            <FlagSelector />
          </div>
        </div>
      </Navbar>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} dispatch={dispatch} />
    </>
  );
};
export default Header;
