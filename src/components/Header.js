import '../styles/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleScale } from './helpers';

const Header = () => {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.profileReducer.scale);
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const makeBigger = () => {
    handleScale(-1, scale, dispatch, coorRange);
  };
  const makeSmaller = () => {
    handleScale(1, scale, dispatch, coorRange);
  };
  return (
    <div className='header'>
      <div onClick={makeBigger}>+</div>
      <div onClick={makeSmaller}>-</div>
    </div>
  );
};
export default Header;
