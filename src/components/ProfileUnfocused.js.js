import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowProfile } from '../store/reducers/profileReducer';
import { getProfileData } from './helpers';
import '../styles/profileunfocused.css';

const ProfileUnfocused = ({ coor, coorKey }) => {
  const dispatch = useDispatch();
  const nameKey = useSelector((state) => state.profileReducer.nameKey);
  const isDragging = useSelector((state) => state.profileReducer.isDragging);
  const scale = useSelector((state) => state.profileReducer.scale);
  const [name, setName] = useState('');
  const styleContainer = {
    width: 60 * scale - 2 + 'px',
    height: 60 * scale - 2 + 'px',
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  const fontSizeName = {
    fontSize: 12 * scale + 'px',
  };

  const handleShowProfile = () => {
    dispatch(setShowProfile(true));
    getProfileData(coorKey[coor], dispatch);
  };
  useEffect(() => {
    let name = nameKey[coorKey[coor]];
    if (scale <= 0.6) {
      setName(name.split(' ')[0]);
    } else {
      setName(name);
    }
  }, [scale, coor, coorKey, nameKey]);
  return (
    <div
      className='profile-unfocused-container p-3'
      style={styleContainer}
      onClick={handleShowProfile}
    >
      <div className='p-2' style={fontSizeName}>
        {name}
      </div>
    </div>
  );
};

export default ProfileUnfocused;
