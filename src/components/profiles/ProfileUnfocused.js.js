import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowProfile, setPhotos } from '../../store/reducers/profileReducer';
import { getProfileData } from './helpers';
import '../../styles/profileunfocused.css';

const getColor = (stringYear) => {
  if (!stringYear) return '#82a0bc';
  const startYear = 1800;
  const endYear = 2030;
  const startColor = { r: 0xd7, g: 0x26, b: 0x3d };
  const endColor = { r: 0x30, g: 0x4d, b: 0x6d };
  const year = new Date(stringYear).getFullYear();
  const position = (year - startYear) / (endYear - startYear);
  const interpolate = (start, end, pos) => Math.round(start + (end - start) * pos);
  const r = interpolate(startColor.r, endColor.r, position);
  const g = interpolate(startColor.g, endColor.g, position);
  const b = interpolate(startColor.b, endColor.b, position);
  const rgbToHex = (r, g, b) =>
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  return rgbToHex(r, g, b);
};

const ProfileUnfocused = ({ coor, coorKey, activeSquare }) => {
  const dispatch = useDispatch();
  const nameBirthKey = useSelector((state) => state.profileReducer.nameBirthKey);
  const isDragging = useSelector((state) => state.profileReducer.isDragging);
  const scale = useSelector((state) => state.profileReducer.scale);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const styleContainer = {
    width: 60 * scale - 2 + 'px',
    height: 60 * scale - 2 + 'px',
    cursor: isDragging ? 'grabbing' : 'grab',
    backgroundColor: getColor(nameBirthKey[coorKey[coor]]['birth']),
  };
  const isActive = coor === activeSquare;

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
    let name = nameBirthKey[coorKey[coor]]['name'];
    if (name) {
      const nameSplit = name.split(' ');
      setFirstName(nameSplit[0]);
      setSecondName(nameSplit[1]);
    }
  }, [coor, coorKey, nameBirthKey]);

  return (
    <div
      className={`profile-unfocused-container ${isActive ? 'active' : ''}`}
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
