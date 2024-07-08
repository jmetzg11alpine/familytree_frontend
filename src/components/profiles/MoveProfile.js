import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSquare } from '../../store/reducers/profileReducer';
import { getData, updateLocation } from './helpers';
import '../../styles/moveprofile.css';
import upArrow from '../../styles/images/angle-up-solid.svg';
import rightArrow from '../../styles/images/angle-right-solid.svg';
import leftArrow from '../../styles/images/angle-left-solid.svg';
import downArrow from '../../styles/images/angle-down-solid.svg';

const MoveProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileReducer.profileData);
  const activeSquare = useSelector((state) => state.profileReducer.activeSquare);
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const coorKey = useSelector((state) => state.profileReducer.coorKey);
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const country = useSelector((state) => state.profileReducer.country);

  const [cannotMove, setCannotMove] = useState(false);

  useEffect(() => {
    dispatch(setActiveSquare(profileData.coor));
  }, [dispatch, profileData]);

  const handleClose = () => {
    dispatch(setActiveSquare(false));
  };

  const handleCommitMove = () => {
    if (!coorKey.hasOwnProperty(activeSquare)) {
      updateLocation(profileData.id, activeSquare, currentUser);
      dispatch(setActiveSquare(false));
      getData(dispatch);
    }
  };

  const handleMove = (direction) => {
    const [x, y] = activeSquare.split('<>').map(Number);
    let newX = x;
    let newY = y;
    if (direction === 'up' && newY - 1 >= coorRange.minY) {
      newY -= 1;
    } else if (direction === 'right' && newX + 1 <= coorRange.maxX) {
      newX += 1;
    } else if (direction === 'down' && newY + 1 <= coorRange.maxY) {
      newY += 1;
    } else if (direction === 'left' && newX - 1 >= coorRange.minX) {
      newX -= 1;
    }
    const newActiveSquare = `${newX}<>${newY}`;
    if (coorKey.hasOwnProperty(newActiveSquare)) {
      setCannotMove(true);
    } else {
      setCannotMove(false);
    }
    dispatch(setActiveSquare(newActiveSquare));
  };

  return (
    <Card className='move-square-container'>
      <Card.Header>
        <Card.Title>
          {country === 'US' ? 'New Position for' : 'Новая позиция для'} {profileData.name}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <img
          className='arrowVertical'
          alt='up'
          src={upArrow}
          onClick={() => handleMove('up')}
        />
        <div className='middleArrows'>
          <img
            className='arrowHorizontal'
            alt='up'
            src={leftArrow}
            onClick={() => handleMove('left')}
          />
          <img
            className='arrowHorizontal'
            alt='up'
            src={rightArrow}
            onClick={() => handleMove('right')}
          />
        </div>
        <img
          className='arrowVertical'
          alt='up'
          src={downArrow}
          onClick={() => handleMove('down')}
        />
      </Card.Body>
      <Card.Footer>
        <Button
          className={cannotMove ? 'move-disabled' : ''}
          variant={cannotMove ? 'warning' : 'primary'}
          onClick={handleCommitMove}
        >
          {country === 'US' ? 'Move' : 'Переместить'}
        </Button>
        <Button onClick={handleClose}>{country === 'US' ? 'Close' : 'Закрыть'}</Button>
      </Card.Footer>
    </Card>
  );
};
export default MoveProfile;
