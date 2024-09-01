import './LogInPage.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutService from "../../services/AutService";
import { useNavigate } from 'react-router-dom';

function LogInPage({ toggleAuthMode }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const navigateToListChatRoom = () => {
        navigate('/list_chat_room', { replace: true });
    };

    const navigateToRegister = () => {
        navigate('/register', { replace: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        console.log("Logging in with", email, password);
        const user = { email, password };
        AutService.logInUser(user)
            .then(response => {
                if (response.status === 200) {
                    console.log("OK");
                    const responseData = JSON.parse(response.request.responseText);
                    const token = responseData.token;
                    const userDTO = responseData.userDTO;
                    console.log(token)
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userDTO', JSON.stringify(userDTO));
                    navigateToListChatRoom();
                }
            })
            .catch(error => {
                console.error("Login failed", error);
            });
    };

    return (
        <div className="centered-container">
            <div className="form-container">
                <h2 className="text-center textColor">Sign In</h2>
                <form onSubmit={handleLogin} className="form-content">
                    <div className="input-group">
                        <div className="input-field">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control textColor"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-field">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control textColor"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="button-container mt-3">
                        <button type="submit" className="btn buttonColor w-50">Sign In</button>
                    </div>
                </form>
                <p className="mt-3 text-center">
                    New to the app? <span className="textColor" style={{ cursor: "pointer" }} onClick={navigateToRegister}>Create an account</span>
                </p>
            </div>
        </div>

    );
}

export default LogInPage;
