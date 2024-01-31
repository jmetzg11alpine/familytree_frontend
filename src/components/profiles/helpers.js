import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNameBirthKey,
  setCoorKey,
  setCoorRange,
  setProfileData,
  setScale,
  setDimensions,
  setPotentialRelatives,
  setNameRepeatError,
  setSquareCoor,
  setAddNew,
  setIsEditing,
  setShowProfile,
} from '../../store/reducers/profileReducer.js';
import ProfileUnfocused from './ProfileUnfocused.js.js';
import BlankSpace from './BlankSpace.js';
import { Form, Button, Card, Image } from 'react-bootstrap';
const url = process.env.REACT_APP_URL;

export const handleSetCenter = (scale, coorRange, containerRef) => {
  const container = containerRef.current;
  const widthCount = coorRange.maxX - coorRange.minY;
  const heightCount = coorRange.maxY - coorRange.minY;
  const width = (60 * scale - 2) * widthCount;
  const height = (60 * scale - 2) * heightCount;
  container.scrollLeft += width / 2;
  container.scrollTop += height / 2;
};

export const scrollScreenWithResize = (dimensions, containerRef) => {
  const container = containerRef.current;
  const widthDiff = (dimensions.new.width - dimensions.old.width) / 2;
  const heightDiff = (dimensions.new.height - dimensions.old.height) / 2;
  container.scrollLeft += widthDiff;
  container.scrollTop += heightDiff;
};

export const handleScale = (value, scale, dispatch, coorRange) => {
  const newScale = value > 0 ? scale - 0.4 : scale + 0.4;
  if ((scale >= 0.6 && value > 0) || (scale <= 3 && value < 0)) {
    const widthCount = coorRange.maxX - coorRange.minX;
    const heightCount = coorRange.maxY - coorRange.minY;
    const oldSideSquare = scale * 60 - 2;
    const oldWidth = oldSideSquare * widthCount;
    const oldHeight = oldSideSquare * heightCount;
    const newSideSquare = newScale * 60 - 2;
    const newWidth = newSideSquare * widthCount;
    const newHeight = newSideSquare * heightCount;
    dispatch(
      setDimensions({
        old: { width: oldWidth, height: oldHeight },
        new: { width: newWidth, height: newHeight },
      })
    );
    dispatch(setScale(newScale));
  }
};

export const renderGrid = (coorRange, coorKey) => {
  console.log('grid rendered');
  const grid = [];
  for (let y = coorRange.minY; y <= coorRange.maxY; y++) {
    const row = [];
    for (let x = coorRange.minX; x <= coorRange.maxX; x++) {
      const key = `${x}<>${y}`;
      if (coorKey.hasOwnProperty(key)) {
        row.push(<ProfileUnfocused key={key} coor={key} coorKey={coorKey} />);
      } else {
        row.push(<BlankSpace key={key} coor={key} />);
      }
    }
    grid.push(
      <div key={`row-${y}`} className='grid-row'>
        {row}
      </div>
    );
  }
  return grid;
};

export const getData = async (dispatch) => {
  try {
    const response = await fetch(`${url}get_people`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(setNameBirthKey(data.name_birth_key));
    dispatch(setCoorKey(data.coor_key));
    dispatch(setCoorRange(data.coor_range));
  } catch (error) {
    console.error('ERROR!!!!', error);
  }
};

export const getProfileData = async (profileNumber, dispatch) => {
  try {
    const response = await fetch(`${url}get_person/${profileNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(setProfileData(data));
  } catch (error) {
    console.error('ERROR!!!!', error);
  }
};

const handleFormChange = (e, index, multiple, setData, setChangesMade) => {
  setChangesMade(true);
  const { value, checked } = e.target;
  setData((prevData) => {
    const newFields = [...prevData.fields];
    const fieldToUpdate = newFields[index];
    if (multiple) {
      let updatedValues;
      if (checked) {
        if (!fieldToUpdate.value.includes(value)) {
          updatedValues = [...fieldToUpdate.value, value];
        } else {
          updatedValues = [...fieldToUpdate.value];
        }
      } else {
        updatedValues = fieldToUpdate.value.filter((val) => val !== value);
      }
      fieldToUpdate.value = updatedValues;
    } else {
      fieldToUpdate.value = value;
    }
    return { ...prevData, fields: newFields };
  });
};

const handleLabel = (country, label) => {
  if (country === 'US') {
    return label;
  } else {
    if (label === 'Name') {
      return 'Имя';
    } else if (label === 'Birthday') {
      return 'Рождение';
    } else if (label === 'Location') {
      return 'Расположение';
    } else if (label === 'Latitude') {
      return 'Широта';
    } else if (label === 'Longitude') {
      return 'Долгота';
    } else if (label === 'Parents') {
      return 'Родители';
    } else if (label === 'Siblings') {
      return 'Братья и Сестыр';
    } else if (label === 'Spouse') {
      return 'Супруг(а)';
    } else if (label === 'Children') {
      return 'Дети';
    }
  }
};

export const renderFormFields = (data, setData, setChangesMade, country) => {
  return data.fields.map((field, index) => {
    if (field.options && field.options.length === 0) {
      return null;
    }
    return (
      <Form.Group key={index} controlId={field.label}>
        <Form.Label>{handleLabel(country, field.label)}</Form.Label>
        {field.options ? (
          <div className='checkbox-container'>
            {field.options.map((option, optionIndex) => (
              <Form.Check
                type='checkbox'
                label={option}
                name={field.label}
                value={option}
                checked={field.value.includes(option)}
                onChange={(e) =>
                  handleFormChange(e, index, true, setData, setChangesMade)
                }
                key={optionIndex}
              />
            ))}
          </div>
        ) : (
          <Form.Control
            type={field.type}
            placeholder={`Enter ${field.label}`}
            name={field.label}
            value={field.value}
            onChange={(e) => handleFormChange(e, index, false, setData, setChangesMade)}
          />
        )}
      </Form.Group>
    );
  });
};

export const RepeatedNameError = ({ name }) => {
  const dispatch = useDispatch();
  const closeRepatedPerson = () => {
    dispatch(setNameRepeatError({ status: false, name: '' }));
  };
  return (
    <Card>
      <Card.Header>Repeated Person</Card.Header>
      <Card.Body>
        '{name}' is already being used. Each person must have a unique name.
      </Card.Body>
      <Card.Footer>
        <Button onClick={closeRepatedPerson}>Close</Button>
      </Card.Footer>
    </Card>
  );
};

export const getPotentialRelatives = async (coor, dispatch) => {
  try {
    const response = await fetch(`${url}get_potential_relatives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coor }),
    });
    const resp = await response.json();
    dispatch(setPotentialRelatives(resp));
  } catch (error) {
    console.error('potentional relatives error: ', error);
  }
};

export const addNewRelative = async (formData, squareCoor, currentUser, dispatch) => {
  try {
    const response = await fetch(`${url}add_relative`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData, squareCoor, currentUser }),
    });
    const resp = await response.json();
    if (resp.message === 'success') {
      getData(dispatch);
      dispatch(setNameRepeatError({ status: false, name: '' }));
      dispatch(setAddNew(false));
      dispatch(setSquareCoor(''));
    } else {
      dispatch(setNameRepeatError({ status: true, name: resp.name }));
    }
  } catch (error) {
    console.log('add new relative error ', error);
  }
};

export const getDataToEdit = async (id, setUpdatedData, setOriginalName) => {
  const response = await fetch(`${url}get_details_to_edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const resp = await response.json();
  if (resp.fields) {
    setOriginalName(resp.fields[0].value);
  }
  setUpdatedData(resp);
};

export const updatePerson = async (data, id, currentUser, dispatch) => {
  const response = await fetch(`${url}update_details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, id, currentUser }),
  });
  const resp = await response.json();
  try {
    if (resp.message === 'success') {
      dispatch(setNameRepeatError({ status: false, name: '' }));
      dispatch(setIsEditing(false));
      return 'success';
    } else {
      dispatch(setNameRepeatError({ status: true, name: resp.name }));
      return 'failure';
    }
  } catch {
    return 'failure';
  }
};

export const updateBio = async (bio, name, currentUser) => {
  const response = await fetch(`${url}update_bio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bio, name, currentUser }),
  });
  const resp = await response.json();
  console.log(resp);
};

const deletePerson = async (name, currentUser) => {
  const response = await fetch(`${url}delete_person`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, currentUser }),
  });
  const resp = await response.json();
  console.log(resp.message);
};

export const DeleteConfirmation = ({ name, setDeletePerson, dispatch }) => {
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const coorKey = useSelector((state) => state.profileReducer.coorKey);
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const handleCancel = () => {
    setDeletePerson(false);
  };
  const handleDelete = async () => {
    await deletePerson(name, currentUser);
    await getData(dispatch);
    renderGrid(coorRange, coorKey);
    setDeletePerson(false);
    dispatch(setShowProfile(false));
  };
  const style = {
    position: 'fixed',
    backgroundColor: 'var(--color-five)',
    zIndex: 2,
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    boxShadow: '0 0 15px rgba(0, 0, 0, .4)',
  };
  return (
    <Card style={style}>
      <Card.Header>Are you sure you want to remove {name}?</Card.Header>
      <Card.Footer className='d-flex justify-content-between'>
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Card.Footer>
    </Card>
  );
};

export const getPhotos = async (id, setPhotoData, setPhotoPaths) => {
  const response = await fetch(`${url}photos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const resp = await response.json();
  setPhotoPaths(resp.paths);
  setPhotoData(resp.data);
};

export const getPhoto = async (path, setPhotoData) => {
  const response = await fetch(`${url}photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  });
  const resp = await response.json();
  setPhotoData(resp.data);
};

export const makeProfilePicture = async (
  person_id,
  path,
  setPhotoData,
  currentUser,
  dispatch
) => {
  const response = await fetch(`${url}profile_photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ person_id, path, currentUser }),
  });
  const resp = await response.json();
  console.log(resp);
  getPhoto(path, setPhotoData);
  getProfileData(person_id, dispatch);
};

export const updateDescription = async (photoData, path, person_name, currentUser) => {
  const response = await fetch(`${url}update_photo_description`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: photoData.description,
      path,
      person_name,
      currentUser,
    }),
  });
  const resp = await response.json();
  console.log(resp);
};

const uploadPhoto = async (
  photo,
  description,
  person_id,
  setPhotoData,
  setPhotoPath,
  currentUser
) => {
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('description', description);
  formData.append('person_id', person_id);
  formData.append('current_user', currentUser);
  const response = await fetch(`${url}add_photo`, {
    method: 'POST',
    body: formData,
  });
  const resp = await response.json();
  console.log(resp);
  getPhotos(person_id, setPhotoData, setPhotoPath);
};

export const AddPhoto = ({ setAddPhoto, setPhotoData, setPhotoPath }) => {
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const profileData = useSelector((state) => state.profileReducer.profileData);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');

  const handleCancel = () => {
    setAddPhoto(false);
  };
  const handleSubmit = () => {
    if (photo) {
      uploadPhoto(
        photo,
        description,
        profileData.id,
        setPhotoData,
        setPhotoPath,
        currentUser
      );
      setAddPhoto(false);
    }
  };
  const handleUpload = (event) => {
    setPhoto(event.target.files[0]);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <Card.Header>Add a photo for {profileData.name}</Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label className='mt-2'>Upload Photo</Form.Label>
          <Form.Control type='file' onChange={handleUpload} />
        </Form.Group>
        <Form.Group>
          <Form.Label className='mt-2'>Add Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={2}
            value={description}
            onChange={handleDescription}
          />
        </Form.Group>
      </Card.Body>
      <Card.Footer className='photo-bottons'>
        <Button variant='success' onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Card.Footer>
    </>
  );
};

const deletePhoto = async (person_id, setPhotoData, setPhotoPath, path, currentUser) => {
  const response = await fetch(`${url}delete_photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, person_id, currentUser }),
  });
  const resp = await response.json();
  console.log(resp);
  getPhotos(person_id, setPhotoData, setPhotoPath);
};

export const DeletePhoto = ({
  setDeletePhoto,
  photoData,
  path,
  setPhotoData,
  setPhotoPath,
  imageHeight,
}) => {
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const profileData = useSelector((state) => state.profileReducer.profileData);
  const handleCancel = () => {
    setDeletePhoto(false);
  };
  const handleDelete = () => {
    deletePhoto(profileData.id, setPhotoData, setPhotoPath, path, currentUser);
    setDeletePhoto(false);
  };
  return (
    <>
      <Card.Header>Are you sure you want to delete this photo?</Card.Header>
      <Card.Body>
        <Image
          src={`data:image/png;base64,${photoData.current}`}
          style={{ maxHeight: imageHeight, maxWidth: '80%' }}
        />
      </Card.Body>
      <Card.Footer>
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Card.Footer>
    </>
  );
};
