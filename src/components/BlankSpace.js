import { useSelector, useDispatch } from 'react-redux';
import { setSquareCoor, setSquareSelected } from '../store/reducers/profileReducer';

const BlankSpace = ({ coor, isDragging }) => {
  const dispatch = useDispatch();
  const squareCoor = useSelector((state) => state.profileReducer.squareCoor);
  const scale = useSelector((state) => state.profileReducer.scale);
  const style = {
    width: 60 * scale - 2 + 'px',
    height: 60 * scale - 2 + 'px',
    userSelect: 'none',
    border: squareCoor === coor ? '1px solid black' : '1px solid transparent',
    cursor: isDragging ? 'grabbing' : 'grab',
    backgroundColor: squareCoor === coor ? '#82a0bc' : '',
  };

  const handleDoubleClick = () => {
    dispatch(setSquareCoor(coor));
    dispatch(setSquareSelected(true));
  };
  return (
    <>
      <div style={style} onDoubleClick={handleDoubleClick}></div>
    </>
  );
};

export default BlankSpace;
