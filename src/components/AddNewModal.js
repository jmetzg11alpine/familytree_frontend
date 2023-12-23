import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddNew, setSquareCoor } from '../store/reducers/profileReducer';
import { Modal, Button, Form } from 'react-bootstrap';
import { addNewRelative, getPotentialRelatives } from './helpers';
import '../styles/addnew.css';

const AddNewModal = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profileReducer.potentialRelatives);
  const addNew = useSelector((state) => state.profileReducer.addNew);
  const squareCoor = useSelector((state) => state.profileReducer.squareCoor);
  const [formData, setFormData] = useState({ fields: [] });
  const [showError, setShowError] = useState(false);
  const [errorName, setErrorName] = useState();

  useEffect(() => {
    if (squareCoor) {
      getPotentialRelatives(squareCoor, dispatch);
    }
  }, [dispatch, squareCoor]);

  useEffect(() => {
    if (data.parents && squareCoor) {
      setFormData({
        fields: [
          { label: 'Name', type: 'text', value: '', multiple: false },
          { label: 'Location', type: 'text', value: '', multiple: false },
          {
            label: 'Parents',
            options: data.parents.map((d) => d.name),
            value: [],
            multiple: true,
          },
          {
            label: 'Siblings',
            options: data.siblings.map((d) => d.name),
            value: [],
            multiple: true,
          },
          {
            label: 'Children',
            options: data.children.map((d) => d.name),
            value: [],
            multiple: true,
          },
          {
            label: 'Spouse',
            options: [...data.spouses.map((d) => d.name), ''],
            value: [],
            multiple: true,
          },
          { label: 'Birthday', type: 'date', value: '', multiple: false },
        ],
      });
    }
  }, [data, squareCoor]);

  const handleRepeatePerson = (resp) => {
    if (resp.message === 'error') {
      setErrorName(resp.name);
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(setAddNew(false));
      dispatch(setSquareCoor(''));
    }
  };

  const closeRepatedPerson = () => {
    setShowError(false);
  };

  const handleSave = () => {
    addNewRelative(formData, squareCoor, dispatch).then((resp) =>
      handleRepeatePerson(resp)
    );
    dispatch(setSquareCoor(''));
  };
  const handleCancel = () => {
    dispatch(setAddNew(false));
    setShowError(false);
    dispatch(setSquareCoor(''));
  };

  const handleFormChange = (e, index, multiple) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
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
  const renderFormFields = () => {
    return formData.fields.map((field, index) => {
      if (field.options && field.options.length === 0) {
        return null;
      }
      return (
        <Form.Group key={index} controlId={field.label}>
          <Form.Label>{field.label}</Form.Label>
          {field.options ? (
            field.multiple ? (
              <div className='checkbox-container'>
                {field.options.map((option, optionIndex) => (
                  <Form.Check
                    type='checkbox'
                    label={option}
                    name={field.label}
                    value={option}
                    checked={field.value.includes(option)}
                    onChange={(e) => handleFormChange(e, index, true)}
                    key={optionIndex}
                  />
                ))}
              </div>
            ) : (
              <Form.Control
                as='select'
                name={field.label}
                value={field.value}
                onChange={(e) => handleFormChange(e, index, false)}
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            )
          ) : (
            <Form.Control
              type={field.type}
              placeholder={`Enter ${field.label}`}
              name={field.label}
              value={field.value}
              onChange={(e) => handleFormChange(e, index, false)}
            />
          )}
        </Form.Group>
      );
    });
  };

  return (
    <Modal show={addNew}>
      {showError ? (
        <>
          <Modal.Header>
            <Modal.Title>Repeated Person</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorName} is already being used. Each Person must have a unique name.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeRepatedPerson}>Close</Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Add New Relative</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>{renderFormFields()}</Form>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <Button variant='success' onClick={handleSave}>
              Save
            </Button>
            <Button variant='warning' onClick={handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default AddNewModal;
