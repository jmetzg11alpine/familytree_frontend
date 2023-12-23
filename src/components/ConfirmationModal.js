import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import {
  setSquareSelected,
  setAddNew,
  setSquareCoor,
} from '../store/reducers/profileReducer';

const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const squareSelected = useSelector((state) => state.profileReducer.squareSelected);

  const handleAddNew = () => {
    dispatch(setSquareSelected(false));
    dispatch(setAddNew(true));
  };
  const handleCloseModal = () => {
    dispatch(setSquareSelected(false));
    dispatch(setSquareCoor(''));
  };
  return (
    <Modal show={squareSelected}>
      <Modal.Header>
        <Modal.Title>Add a Realitive?</Modal.Title>
      </Modal.Header>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='success' onClick={handleAddNew}>
          Yes
        </Button>
        <Button variant='warning' onClick={handleCloseModal}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
