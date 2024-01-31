import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profileReducer',
  initialState: {
    nameBirthKey: {},
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
    photos: false,
    currentUser: '',
    nameWasEdited: 0,
    isTouchDevice: false,
    country: 'US',
  },
  reducers: {
    setNameBirthKey: (state, action) => {
      state.nameBirthKey = action.payload;
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
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setNameWasEdited: (state, action) => {
      state.nameWasEdited = action.payload;
    },
    setIsTouchDevice: (state, action) => {
      state.isTouchDevice = action.payload;
    },
    selectCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const {
  setNameBirthKey,
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
  setPhotos,
  setCurrentUser,
  setNameWasEdited,
  setIsTouchDevice,
  selectCountry,
} = profileSlice.actions;

export default profileSlice.reducer;
