import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowProfile, setIsEditing } from '../store/reducers/profileReducer';
import { Container, Col, Image } from 'react-bootstrap';
import ProfileEdit from './ProfileEdit';
import { Button } from 'react-bootstrap';
import { getProfileData, updateBio, DeleteConfirmation } from './helpers';
import '../styles/profilefocused.css';

const ProfileFocused = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profileReducer.profileData);
  const isEditing = useSelector((state) => state.profileReducer.isEditing);
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
    setBioIsEditing(true);
  };
  const handleBioBlur = () => {
    setBioIsEditing(false);
    updateBio(bio, data.name);
    getProfileData(data.id, dispatch);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  return (
    <Container className='profile-focused-container'>
      {isEditing ? (
        <ProfileEdit id={data.id} />
      ) : deletePerson ? (
        <DeleteConfirmation
          name={data.name}
          setDeletePerson={setDeletePerson}
          dispatch={dispatch}
        />
      ) : (
        <>
          <div className='focused-main-body mt-2 p-3'>
            <Col xs={4}>
              {data.profile_photo && (
                <Image
                  src={`data:image/png;base64,${data.profile_photo}`}
                  fluid
                  roundedCircle
                />
              )}
              <div className='mt-3 mb-2'>
                <h3>{data.name}</h3>
              </div>
              <div className='info-container'>
                {data.birth ? <div className='info'>Birth: {data.birth}</div> : <></>}
                {data.location ? (
                  <div className='info'>Location: {data.location}</div>
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
            <Button
              variant='secondary'
              className='profile-focused-button'
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button variant='warning' className='profile-focused-button'>
              Move
            </Button>
            <Button
              variant='danger'
              className='profile-focused-button'
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant='primary'
              className='profile-focused-button'
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};
export default ProfileFocused;
