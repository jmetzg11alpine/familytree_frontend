import { useDispatch } from 'react-redux';
import {
  setNameKey,
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
} from '../store/reducers/profileReducer';
import ProfileUnfocused from './ProfileUnfocused.js';
import BlankSpace from './BlankSpace.js';
import { Form, Button, Card } from 'react-bootstrap';

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

export const scrollScreen = (dimensions, containerRef) => {
  const container = containerRef.current;
  const widthDiff = (dimensions.new.width - dimensions.old.width) / 2;
  const heightDiff = (dimensions.new.height - dimensions.old.height) / 2;
  container.scrollLeft += widthDiff;
  container.scrollTop += heightDiff;
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
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
  try {
    const response = await fetch(`${url}get_people`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(setNameKey(data.name_key));
    dispatch(setCoorKey(data.coor_key));
    dispatch(setCoorRange(data.coor_range));
  } catch (error) {
    console.error('ERROR!!!!', error);
  }
};

export const getProfileData = async (profileNumber, dispatch) => {
  console.log(profileNumber);
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
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

const handleFormChange = (e, index, multiple, setData) => {
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

export const renderFormFields = (data, setData) => {
  return data.fields.map((field, index) => {
    if (field.options && field.options.length === 0) {
      return null;
    }
    return (
      <Form.Group key={index} controlId={field.label}>
        <Form.Label>{field.label}</Form.Label>
        {field.options ? (
          <div className='checkbox-container'>
            {field.options.map((option, optionIndex) => (
              <Form.Check
                type='checkbox'
                label={option}
                name={field.label}
                value={option}
                checked={field.value.includes(option)}
                onChange={(e) => handleFormChange(e, index, true, setData)}
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
            onChange={(e) => handleFormChange(e, index, false, setData)}
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
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
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

export const addNewRelative = async (formData, squareCoor, dispatch) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
  try {
    const response = await fetch(`${url}add_relative`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData, squareCoor }),
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

export const getDataToEdit = async (id, setUpdatedData) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
  const response = await fetch(`${url}get_details_to_edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const resp = await response.json();
  setUpdatedData(resp);
  console.log(resp);
};

export const updatePerson = async (data, id, dispatch) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
  const response = await fetch(`${url}update_details`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ data, id }),
  });
  const resp = await response.json();
  if (resp.message === 'success') {
    dispatch(setNameRepeatError({ status: false, name: '' }));
    dispatch(setIsEditing(false));
  } else {
    dispatch(setNameRepeatError({ status: true, name: resp.name }));
  }
};
