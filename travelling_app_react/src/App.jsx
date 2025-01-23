import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login.jsx';
// import Signup from './pages/signup/signup';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Register />} />
        </Routes>

      </Router>

    </>
  );
}

export default App;
