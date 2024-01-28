import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { setIsTouchDevice } from './store/reducers/profileReducer';
import './styles/app.css';

const Background = lazy(() => import('./components/profiles/Background'));
const FamilyMap = lazy(() => import('./components/map/FamilyMap'));
const Info = lazy(() => import('./components/info/Info'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
      )
    );
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Background />} />
          <Route path='/map' element={<FamilyMap />} />
          <Route path='/info' element={<Info />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
