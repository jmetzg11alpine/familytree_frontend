import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSquareCoor, setSquareSelected } from '../../store/reducers/profileReducer';

const BlankSpace = ({ coor, isDragging }) => {
  const dispatch = useDispatch();
  const squareCoor = useSelector((state) => state.profileReducer.squareCoor);
  const scale = useSelector((state) => state.profileReducer.scale);
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const [touchStart, setTouchStart] = useState(0);

  const style = {
    width: 60 * scale - 2 + 'px',
    height: 60 * scale - 2 + 'px',
    userSelect: 'none',
    border: squareCoor === coor ? '1px solid black' : '1px solid transparent',
    cursor: isDragging ? 'grabbing' : 'grab',
    backgroundColor: squareCoor === coor ? '#82a0bc' : '',
  };

  const handleDoubleClick = () => {
    if (currentUser) {
      dispatch(setSquareCoor(coor));
      dispatch(setSquareSelected(true));
    }
  };

  const handleTouchStart = () => {
    setTouchStart(Date.now());
  };

  const handleTouchEnd = () => {
    if (Date.now() - touchStart < 300) {
      if (currentUser) {
        dispatch(setSquareCoor(coor));
        dispatch(setSquareSelected(true));
      }
    }
  };
  return (
    <>
      <div
        style={style}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      ></div>
    </>
  );
};

export default BlankSpace;
