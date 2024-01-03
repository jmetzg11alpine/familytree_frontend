import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditing } from '../../store/reducers/profileReducer';
import { Button, Form, Modal } from 'react-bootstrap';
import {
  getDataToEdit,
  getProfileData,
  updatePerson,
  renderFormFields,
  RepeatedNameError,
} from './helpers';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const nameRepeatError = useSelector((state) => state.profileReducer.nameRepeatError);
  const isEditing = useSelector((state) => state.profileReducer.isEditing);
  const profileData = useSelector((state) => state.profileReducer.profileData);
  const [updatedData, setUpdatedData] = useState({});
  const handleSave = () => {
    updatePerson(updatedData, profileData.id, dispatch);
    getProfileData(profileData.id, dispatch);
  };
  const handleCancel = () => {
    dispatch(setIsEditing(false));
  };

  useEffect(() => {
    getDataToEdit(profileData.id, setUpdatedData);
  }, [profileData.id]);
  return (
    <Modal show={isEditing}>
      {nameRepeatError.status ? (
        <RepeatedNameError name={nameRepeatError.name} />
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Edit {profileData.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {updatedData.fields && renderFormFields(updatedData, setUpdatedData)}
            </Form>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <Button variant='success' onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ProfileEdit;
