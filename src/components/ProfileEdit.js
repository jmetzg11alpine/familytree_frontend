import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditing } from '../store/reducers/profileReducer';
import { Button, Form } from 'react-bootstrap';
import {
  getDataToEdit,
  getProfileData,
  updatePerson,
  renderFormFields,
  RepeatedNameError,
} from './helpers';

const ProfileEdit = ({ id }) => {
  const dispatch = useDispatch();
  const nameRepeatError = useSelector((state) => state.profileReducer.nameRepeatError);
  const [updatedData, setUpdatedData] = useState({});
  const handleSave = () => {
    updatePerson(updatedData, id, dispatch);
    getProfileData(id, dispatch);
  };
  const handleCancel = () => {
    dispatch(setIsEditing(false));
  };

  useEffect(() => {
    getDataToEdit(id, setUpdatedData);
  }, [id]);
  return (
    <>
      {nameRepeatError.status ? (
        <RepeatedNameError name={nameRepeatError.name} />
      ) : (
        <div>
          <Form>
            {updatedData.fields && renderFormFields(updatedData, setUpdatedData)}
          </Form>
          <div>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
