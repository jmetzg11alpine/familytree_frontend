import { useDispatch, useSelector } from 'react-redux';
import { handleScale } from './profiles/helpers';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.profileReducer.scale);
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const location = useLocation();
  console.log(location.pathname);
  const makeBigger = () => {
    handleScale(-1, scale, dispatch, coorRange);
  };
  const makeSmaller = () => {
    handleScale(1, scale, dispatch, coorRange);
  };
  return (
    <div className='header'>
      {location.pathname === '/' && (
        <>
          <div onClick={makeBigger}>+</div>
          <div onClick={makeSmaller}>-</div>
        </>
      )}

      <div className='link-container'>
        <Link to='/'>Home</Link>
        <Link to='/map'>Map</Link>
      </div>
    </div>
  );
};
export default Header;
