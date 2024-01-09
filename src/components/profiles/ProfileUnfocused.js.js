import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowProfile, setPhotos } from '../../store/reducers/profileReducer';
import { getProfileData } from './helpers';
import '../../styles/profileunfocused.css';

const ProfileUnfocused = ({ coor, coorKey }) => {
  const dispatch = useDispatch();
  const nameKey = useSelector((state) => state.profileReducer.nameKey);
  const isDragging = useSelector((state) => state.profileReducer.isDragging);
  const scale = useSelector((state) => state.profileReducer.scale);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const styleContainer = {
    width: 60 * scale - 2 + 'px',
    height: 60 * scale - 2 + 'px',
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  const getFontSize = () => {
    let nameLength = 10;
    if (firstName && secondName) {
      nameLength = firstName.length + secondName.length;
    }
    if (nameLength < 15) {
      return { fontSize: 10 * scale + 'px' };
    } else if (nameLength < 20) {
      return { fontSize: 9 * scale + 'px' };
    } else {
      return { fontSize: 8 * scale + 'px' };
    }
  };
  const fontSize = getFontSize();

  const handleShowProfile = () => {
    dispatch(setShowProfile(true));
    getProfileData(coorKey[coor], dispatch);
    dispatch(setPhotos(false));
  };
  useEffect(() => {
    let name = nameKey[coorKey[coor]];
    const nameSplit = name.split(' ');
    setFirstName(nameSplit[0]);
    setSecondName(nameSplit[1]);
  }, [coor, coorKey, nameKey]);
  return (
    <div
      className='profile-unfocused-container'
      style={styleContainer}
      onClick={handleShowProfile}
    >
      <div className='profile-unfocused-name' style={fontSize}>
        {firstName}
      </div>
      {scale > 0.6 && (
        <div className='profile-unfocused-name' style={fontSize}>
          {secondName}
        </div>
      )}
    </div>
  );
};

export default ProfileUnfocused;
