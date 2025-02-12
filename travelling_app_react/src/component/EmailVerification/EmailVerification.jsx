import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/emailVerfiy.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
    const url = useSelector((state) => state.backendUrl.url);
    const { token } = useParams();
    console.log("Token:", token);

    useEffect(() => {
        axios.post(`${url}/user/email-verification/${token}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }, [url, token])
    return (
        <div className="verification-container">
            <div className="verification-card">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" className="checkmark">
                        <circle className="circle" cx="12" cy="12" r="11" />
                        <path className="check" d="M7 13l3 3 7-7" />
                    </svg>
                </div>

                <h1 className="title">Email Verified!</h1>
                <p className="message">
                    Your email has been successfully verified. You can now access all features of your account.
                </p>

                <div className="action-buttons">
                    <button className="primary-button">Go to Dashboard</button>
                    <button className="secondary-button">Visit Homepage</button>
                </div>

                <div className="help-section">
                    <p className="help-text">
                        Need help? <a href="#" className="help-link">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;