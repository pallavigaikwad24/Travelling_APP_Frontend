import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginLogout/login.jsx';
import Signup from './pages/signUp/signUp.jsx';
import Search from './pages/Search/Search.jsx';
import Home from './pages/Home/Home.jsx';
import SingleHotel from './pages/Hotel/SingleHotel.jsx';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute.jsx';
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((state) => state.protected.isAuthenticated);
  console.log("isAuth:", isAuth);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/hotelname/:id" element={<ProtectedRoute element={<SingleHotel />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;