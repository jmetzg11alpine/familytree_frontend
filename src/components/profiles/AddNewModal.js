import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAddNew,
  setSquareCoor,
  setNameRepeatError,
} from '../../store/reducers/profileReducer';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  addNewRelative,
  getPotentialRelatives,
  renderFormFields,
  RepeatedNameError,
} from './helpers';
import '../../styles/addnew.css';

const AddNewModal = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profileReducer.potentialRelatives);
  const addNew = useSelector((state) => state.profileReducer.addNew);
  const squareCoor = useSelector((state) => state.profileReducer.squareCoor);
  const nameRepeatError = useSelector((state) => state.profileReducer.nameRepeatError);
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const [formData, setFormData] = useState({ fields: [] });
  const [changesMade, setChangesMade] = useState(false);
  const country = useSelector((state) => state.profileReducer.country);

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
          { label: 'Latitude', type: 'text', value: '', multiple: false },
          { label: 'Longitude', type: 'text', value: '', multiple: false },
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
            options: data.spouses.map((d) => d.name),
            value: [],
            multiple: true,
          },
          { label: 'Birthday', type: 'date', value: '', multiple: false },
        ],
      });
    }
  }, [data, squareCoor]);

  const handleSave = () => {
    addNewRelative(formData, squareCoor, currentUser, dispatch);
  };
  const handleCancel = () => {
    dispatch(setAddNew(false));
    dispatch(setNameRepeatError({ status: false, name: '' }));
    dispatch(setSquareCoor(''));
  };

  return (
    <Modal show={addNew}>
      {nameRepeatError.status ? (
        <RepeatedNameError name={nameRepeatError.name} />
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Add New Relative</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {renderFormFields(formData, setFormData, setChangesMade, country)}
            </Form>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            {changesMade && (
              <Button variant='success' onClick={handleSave}>
                Save
              </Button>
            )}
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
