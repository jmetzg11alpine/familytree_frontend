import { useDispatch, useSelector } from 'react-redux';
import { setShowProfile, setIsEditing } from '../store/reducers/profileReducer';
import { Container, Col, Image } from 'react-bootstrap';
import ProfileEdit from './ProfileEdit';
import { Button } from 'react-bootstrap';
import '../styles/profilefocused.css';

const ProfileFocused = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profileReducer.profileData);
  console.log(data);
  const isEditing = useSelector((state) => state.profileReducer.isEditing);
  const handleClose = () => {
    dispatch(setShowProfile(false));
  };
  const handleEdit = () => {
    dispatch(setIsEditing(true));
  };
  return (
    <Container className='profile-focused-container'>
      {isEditing ? (
        <ProfileEdit data={data} dispatch={dispatch} />
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
                  <div className='info'>Parents: {data.parents}</div>
                ) : (
                  <></>
                )}
                {data.siblings ? (
                  <div className='info'>Siblings: {data.siblings}</div>
                ) : (
                  <></>
                )}
                {data.spouse ? <div className='info'>Spouse: {data.spouse}</div> : <></>}
                {data.children ? (
                  <div className='info'>Children: {data.children}</div>
                ) : (
                  <></>
                )}
              </div>
            </Col>
            <Col xs={8} className='p-4'>
              <div className='bio-text'>{data.bio ? data.bio : 'add bio'}</div>
            </Col>
          </div>
          <div className='focused-footer'>
            <Button className='profile-focused-button' onClick={handleEdit}>
              Edit
            </Button>
            <Button className='profile-focused-button' onClick={handleClose}>
              Close
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};
export default ProfileFocused;
