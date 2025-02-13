import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/features/protectedRoute/protectedRouteSlice';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userInfo = useSelector((state) => state.login.userInfo);
    const url = useSelector((state) => state.backendUrl.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        axios.get(`${url}/user/logout`).then(() => navigate("/login")).catch((err) => {
            console.log(err);
            if (err.status == 401) { navigate("/login"); localStorage.removeItem("user_login") };
        });
        dispatch(logout());
    }
    return (
        <header className="header">
            <div className="logo">TravelWorld</div>
            <nav>
                <div className="nav-links">
                    <div className="home-tab"><a href="/home"><i className="fa-solid fa-house"></i>Home</a></div>
                    {/* Profile Dropdown */}
                    <div className="profile-dropdown">
                        <button
                            onClick={toggleDropdown}
                            className="profile-button"
                        >
                            <div className="avatar-container">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <span className="profile-name">{`${userInfo?.first_name}`}</span>
                            <i className={`fa-solid fa-angle-up chevron-icon ${isDropdownOpen ? 'rotate' : ''}`}></i>

                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">
                                    <p className="user-name">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
                                    <p className="user-email">{userInfo?.email}</p>
                                </div>
                                <a href="#" className="dropdown-item">
                                    <i className="fa-solid fa-user"></i>
                                    Profile
                                </a>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item logout" onClick={handleLogout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    Sign out
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;