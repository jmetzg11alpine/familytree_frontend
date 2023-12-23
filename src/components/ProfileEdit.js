import { useState } from 'react';
import { setIsEditing } from '../store/reducers/profileReducer';

const ProfileEdit = ({ data, dispatch }) => {
  const [bioText, setBioText] = useState(data.bio);
  const handleSave = () => {
    dispatch(setIsEditing(false));
  };
  return (
    <>
      <form>
        <textarea value={bioText} onChange={(e) => setBioText(e.target.value)} />
        <button className='profile-focused-button' type='submit' onClick={handleSave}>
          Save
        </button>
      </form>
    </>
  );
};

export default ProfileEdit;
