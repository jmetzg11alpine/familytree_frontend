import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profileReducer',
  initialState: {
    nameKey: {},
    coorKey: {},
    coorRange: { minY: -10, maxY: 30, minX: -40, maxX: 10 },
    profileNumber: 1,
    isDragging: false,
    showProfile: false,
    profileData: {},
    scale: 1,
    dimensions: { old: { width: 2, height: 2 }, new: { width: 2, height: 2 } },
    potentialRelatives: {},
    squareCoor: '',
    squareSelected: false,
    addNew: false,
    isEditing: false,
    nameRepeatError: { status: false, name: '' },
  },
  reducers: {
    setNameKey: (state, action) => {
      state.nameKey = action.payload;
    },
    setCoorKey: (state, action) => {
      state.coorKey = action.payload;
    },
    setCoorRange: (state, action) => {
      state.coorRange = action.payload;
    },
    setShowProfile: (state, action) => {
      state.showProfile = action.payload;
    },
    setProfileNumber: (state, action) => {
      state.profileNumber = action.payload;
    },
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setScale: (state, action) => {
      state.scale = action.payload;
    },
    setDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
    setPotentialRelatives: (state, action) => {
      state.potentialRelatives = action.payload;
    },
    setSquareCoor: (state, action) => {
      state.squareCoor = action.payload;
    },
    setSquareSelected: (state, action) => {
      state.squareSelected = action.payload;
    },
    setAddNew: (state, action) => {
      state.addNew = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setNameRepeatError: (state, action) => {
      state.nameRepeatError = action.payload;
    },
  },
});

export const {
  setNameKey,
  setCoorKey,
  setCoorRange,
  setProfileNumber,
  setIsDragging,
  setShowProfile,
  setProfileData,
  setScale,
  setDimensions,
  setPotentialRelatives,
  setSquareCoor,
  setSquareSelected,
  setAddNew,
  setIsEditing,
  setNameRepeatError,
} = profileSlice.actions;

export default profileSlice.reducer;
