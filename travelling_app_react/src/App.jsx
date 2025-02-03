import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/login.jsx';
import Signup from './pages/signUp/signUp.jsx';
import Search from './component/SearchComponent/Search.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
        </Routes>

      </Router>

    </>
  );
}

export default App;
