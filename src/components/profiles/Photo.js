import { useEffect, useState } from 'react';
import { Carousel, Card, Button, Image, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setShowProfile, setPhotos } from '../../store/reducers/profileReducer';
import {
  getPhotos,
  getPhoto,
  makeProfilePicture,
  updateDescription,
  AddPhoto,
  DeletePhoto,
  getProfileData,
} from './helpers';
import '../../styles/photo.css';

const Photo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const photos = useSelector((state) => state.profileReducer.photos);
  const profileData = useSelector((state) => state.profileReducer.profileData);
  const [photoData, setPhotoData] = useState({ current: '', description: '' });
  const [photoPath, setPhotoPath] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  console.log(addPhoto);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const windowHeightPercentage = 0.6;
  const [imageHeight, setImageHeight] = useState(
    window.innerHeight * windowHeightPercentage
  );
  const isTouchDevice = useSelector((state) => state.profileReducer.isTouchDevice);
  const [touchStart, setTouchStart] = useState(0);
  const photoDescriptionMessage = isTouchDevice
    ? 'tap image to add description'
    : 'double click image to add description';

  useEffect(() => {
    const resizeImage = () => {
      setImageHeight(window.innerHeight * windowHeightPercentage);
    };
    getPhotos(profileData.id, setPhotoData, setPhotoPath);
    window.addEventListener('resize', resizeImage);
    return () => {
      getProfileData(profileData.id, dispatch);
      window.removeEventListener('resize', resizeImage);
    };
  }, [photos, profileData.id, dispatch, deletePhoto]);

  const handleSelect = (selectedIndex, e) => {
    setCurrentSlide(selectedIndex);
  };

  useEffect(() => {
    if (photoPath.length) {
      getPhoto(photoPath[currentSlide], setPhotoData);
    }
    setDescriptionEditing(false);
    // for some unknown reason it would go straight to the add new photo with addPhoto = true
    setAddPhoto(false);
  }, [currentSlide, photoPath]);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      makeProfilePicture(
        profileData.id,
        photoPath[currentSlide],
        setPhotoData,
        currentUser,
        dispatch
      );
    }
  };
  const handleDescription = () => {
    if (currentUser) {
      setDescriptionEditing(true);
    }
  };
  const handleDescriptionChange = (event) => {
    setPhotoData({ ...photoData, description: event.target.value });
  };
  const handleUpdateDescription = () => {
    updateDescription(photoData, photoPath[currentSlide], profileData.name, currentUser);
    setDescriptionEditing(false);
  };
  const handleAdd = () => {
    setAddPhoto(true);
  };
  const handleDelete = () => {
    setDeletePhoto(true);
  };

  const handleClose = () => {
    dispatch(setPhotos(false));
    dispatch(setShowProfile(true));
    setAddPhoto(false);
  };

  const handleTouchStart = () => {
    setTouchStart(Date.now());
  };

  const handleTouchEnd = () => {
    if (Date.now() - touchStart < 300) {
      handleDescription();
    }
  };
  return (
    <Card>
      {addPhoto ? (
        <AddPhoto
          setAddPhoto={setAddPhoto}
          setPhotoData={setPhotoData}
          setPhotoPath={setPhotoPath}
        />
      ) : deletePhoto ? (
        <DeletePhoto
          setDeletePhoto={setDeletePhoto}
          photoData={photoData}
          path={photoPath[currentSlide]}
          setPhotoData={setPhotoData}
          setPhotoPath={setPhotoPath}
          imageHeight={imageHeight}
        />
      ) : (
        <>
          <Card.Header>Photos of {profileData.name}</Card.Header>
          {photoPath.length > 0 && (
            <Card.Body>
              <Carousel
                activeIndex={currentSlide}
                onSelect={handleSelect}
                slide={false}
                interval={null}
              >
                {photoPath.map((path, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={`data:image/png;base64,${photoData.current}`}
                      style={{ maxHeight: imageHeight }}
                      onDoubleClick={handleDescription}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    />
                    <Carousel.Caption>
                      {descriptionEditing ? (
                        <textarea
                          id='descriptionTextarea'
                          value={photoData.description}
                          onBlur={handleUpdateDescription}
                          onChange={handleDescriptionChange}
                        />
                      ) : (
                        <div>
                          {photoData.description ||
                            (currentUser ? photoDescriptionMessage : '')}
                        </div>
                      )}
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          )}
          <Card.Footer>
            {currentUser && (
              <>
                {photoPath.length > 0 && (
                  <Form.Check
                    className='profile-photo-label-check'
                    type='checkbox'
                    label='Profile Photo'
                    checked={photoData.profile_photo}
                    onChange={handleCheckboxChange}
                  />
                )}
                <Button variant='success' onClick={handleAdd}>
                  Add
                </Button>
                {photoPath.length > 0 && (
                  <Button variant='danger' onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </>
            )}
            <Button onClick={handleClose}>Close</Button>
          </Card.Footer>
        </>
      )}
    </Card>
  );
};
export default Photo;
