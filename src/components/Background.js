import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/background.css';
import { getData, scrollScreen, renderGrid } from './helpers';
import { setIsDragging } from '../store/reducers/profileReducer';
import ProfileFocused from './ProfileFocused';
import ConfirmationModal from './ConfirmationModal';
import AddNewModal from './AddNewModal';

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
  const modalOpened = squareSelected || addNew || showProfile || isEditing;
  const containerRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    scrollScreen(dimensions, containerRef);
  }, [dimensions]);

  useEffect(() => {
    getData(dispatch);
  }, [dispatch]);

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

  return (
    <div
      className='background-container'
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {grid}
      {showProfile && <ProfileFocused />}
      <ConfirmationModal />
      <AddNewModal />
    </div>
  );
};

export default Background;
