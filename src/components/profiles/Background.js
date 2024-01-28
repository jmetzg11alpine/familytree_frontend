import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleSetCenter, getData, scrollScreenWithResize, renderGrid } from './helpers';
import { setIsDragging } from '../../store/reducers/profileReducer';
import ProfileFocused from './ProfileFocused';
import ConfirmationModal from './ConfirmationModal';
import AddNewModal from './AddNewModal';
import ProfileEdit from './ProfileEdit';
import Photo from './Photo';
import '../../styles/background.css';

const Background = () => {
  const dispatch = useDispatch();
  const coorRange = useSelector((state) => state.profileReducer.coorRange);
  const coorKey = useSelector((state) => state.profileReducer.coorKey);
  const nameKey = useSelector((state) => state.profileReducer.nameKey);
  const showProfile = useSelector((state) => state.profileReducer.showProfile);
  const isEditing = useSelector((state) => state.profileReducer.isEditing);
  const isDragging = useSelector((state) => state.profileReducer.isDragging);
  const dimensions = useSelector((state) => state.profileReducer.dimensions);
  const squareSelected = useSelector((state) => state.profileReducer.squareSelected);
  const addNew = useSelector((state) => state.profileReducer.addNew);
  const photos = useSelector((state) => state.profileReducer.photos);
  const modalOpened = squareSelected || addNew || showProfile || isEditing || photos;
  const containerRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const nameWasEdited = useSelector((state) => state.profileReducer.nameWasEdited);
  const scale = useSelector((state) => state.profileReducer.scale);

  useEffect(() => {
    handleSetCenter(scale, coorRange, containerRef);
  }, [coorRange]);

  useEffect(() => {
    scrollScreenWithResize(dimensions, containerRef);
  }, [dimensions]);

  useEffect(() => {
    getData(dispatch);
  }, [dispatch, nameWasEdited]);

  useEffect(() => {
    setGrid(renderGrid(coorRange, coorKey));
  }, [coorRange, coorKey, nameKey]);

  const handleMouseDown = (e) => {
    if (!modalOpened) {
      dispatch(setIsDragging(true));
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (!modalOpened) {
      if (!isDragging) return;
      const deltaX = e.clientX - mousePosition.x;
      const deltaY = e.clientY - mousePosition.y;
      containerRef.current.scrollLeft -= deltaX;
      containerRef.current.scrollTop -= deltaY;
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (!modalOpened) {
      dispatch(setIsDragging(false));
    }
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const onMouseDown = (e) => handleMouseDown(e);
    const onMouseMove = (e) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();
    const onTouchStart = (e) => handleMouseDown(e.touches[0]);
    const onTouchMove = (e) => handleMouseMove(e.touches[0]);
    const onTouchEnd = () => handleMouseUp();
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);
    return () => {
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseup', onMouseUp);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  });

  return (
    <div className='background-container' ref={containerRef}>
      {grid}
      {showProfile && <ProfileFocused />}
      {photos && <Photo />}
      <ConfirmationModal />
      <AddNewModal />
      <ProfileEdit />
    </div>
  );
};

export default Background;
