import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Background from './components/profiles/Background';
import FamilyMap from './components/map/FamilyMap';
import './styles/app.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Background />} />
        <Route path='/map' element={<FamilyMap />} />
      </Routes>
    </Router>
  );
}

export default App;
