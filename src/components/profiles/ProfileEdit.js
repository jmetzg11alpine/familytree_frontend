import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditing, setNameWasEdited } from '../../store/reducers/profileReducer';
import { Button, Form, Modal } from 'react-bootstrap';
import {
  getDataToEdit,
  getProfileData,
  updatePerson,
  renderFormFields,
  RepeatedNameError,
} from './helpers';
import '../../styles/profileedit.css';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profileReducer.currentUser);
  const nameRepeatError = useSelector((state) => state.profileReducer.nameRepeatError);
  const isEditing = useSelector((state) => state.profileReducer.isEditing);
  const profileData = useSelector((state) => state.profileReducer.profileData);
  const nameWasEdited = useSelector((state) => state.profileReducer.nameWasEdited);
  const [updatedData, setUpdatedData] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [originalName, setOriginalName] = useState('');

  const handleSave = async () => {
    const results = await updatePerson(
      updatedData,
      profileData.id,
      currentUser,
      dispatch
    );
    if (results === 'success') {
      getProfileData(profileData.id, dispatch);
    }
    if (originalName !== updatedData.fields[0].value) {
      dispatch(setNameWasEdited(nameWasEdited + 1));
    }
  };
  const handleCancel = () => {
    dispatch(setIsEditing(false));
  };

  useEffect(() => {
    getDataToEdit(profileData.id, setUpdatedData, setOriginalName);
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
          <Modal.Body className='px-2 py-1'>
            <Form>
              {updatedData.fields &&
                renderFormFields(updatedData, setUpdatedData, setChangesMade)}
            </Form>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            {changesMade && (
              <Button variant='success' onClick={handleSave}>
                Save
              </Button>
            )}
            <Button onClick={handleCancel}>Cancel</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ProfileEdit;
