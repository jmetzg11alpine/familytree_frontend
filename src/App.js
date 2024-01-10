import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import './styles/app.css';

const Background = lazy(() => import('./components/profiles/Background'));
const FamilyMap = lazy(() => import('./components/map/FamilyMap'));
const Info = lazy(() => import('./components/info/Info'));

function App() {
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
