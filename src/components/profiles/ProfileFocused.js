import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowProfile,
  setIsEditing,
  setPhotos,
} from '../../store/reducers/profileReducer';
import { Container, Col, Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getProfileData, updateBio, DeleteConfirmation } from './helpers';
import '../../styles/profilefocused.css';

const ProfileFocused = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profileReducer.profileData);
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const [bioIsEditing, setBioIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [deletePerson, setDeletePerson] = useState(false);
  useEffect(() => {
    setBio(data.bio);
  }, [data.bio]);
  const handleClose = () => {
    dispatch(setShowProfile(false));
  };
  const handleEdit = () => {
    dispatch(setIsEditing(true));
  };
  const handleDelete = () => {
    setDeletePerson(true);
  };
  const handleBioEdit = () => {
    if (currentUser) {
      setBioIsEditing(true);
    }
  };
  const handleBioBlur = () => {
    setBioIsEditing(false);
    updateBio(bio, data.name, currentUser);
    getProfileData(data.id, dispatch);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handlePhoto = () => {
    dispatch(setPhotos(true));
    dispatch(setShowProfile(false));
  };
  return (
    <>
      {deletePerson ? (
        <DeleteConfirmation
          name={data.name}
          setDeletePerson={setDeletePerson}
          dispatch={dispatch}
        />
      ) : (
        <Container className='profile-focused-container'>
          <div className='focused-main-body mt-2 p-3'>
            <Col xs={4}>
              {data.profile_photo && (
                <Image
                  src={`data:image/png;base64,${data.profile_photo}`}
                  onDoubleClick={handlePhoto}
                  fluid
                  roundedCircle
                  style={{ cursor: 'pointer' }}
                />
              )}
              <div className='mt-3 mb-2'>
                <h3>{data.name}</h3>
              </div>
              <div className='profile-info-container'>
                {data.birth ? <div className='info'>Birth: {data.birth}</div> : <></>}
                {data.location ? (
                  <div className='info'>Location: {data.location}</div>
                ) : (
                  <></>
                )}
                {data.lat && data.lng ? (
                  <div className='info'>
                    Latitude: {data.lat}, Longitude: {data.lng}
                  </div>
                ) : (
                  <></>
                )}
                {data.parents ? (
                  <div className='info'>Parents: {data.parents.join(', ')}</div>
                ) : (
                  <></>
                )}
                {data.siblings ? (
                  <div className='info'>Siblings: {data.siblings.join(', ')}</div>
                ) : (
                  <></>
                )}
                {data.spouse ? (
                  <div className='info'>Spouse: {data.spouse.join(', ')}</div>
                ) : (
                  <></>
                )}
                {data.children ? (
                  <div className='info'>Children: {data.children.join(', ')}</div>
                ) : (
                  <></>
                )}
              </div>
            </Col>
            <Col xs={8} className='p-4'>
              {bioIsEditing ? (
                <textarea
                  className='bio-text'
                  value={bio}
                  onChange={handleBioChange}
                  onBlur={handleBioBlur}
                  autoFocus
                />
              ) : (
                <div className='bio-text' onDoubleClick={handleBioEdit}>
                  {bio || 'write bio by double clicking'}
                </div>
              )}
            </Col>
          </div>
          <div className='focused-footer'>
            {currentUser && (
              <>
                <Button
                  variant='secondary'
                  className='profile-focused-button'
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant='danger'
                  className='profile-focused-button'
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}

            <Button
              variant='primary'
              className='profile-focused-button'
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </Container>
      )}
    </>
  );
};
export default ProfileFocused;
