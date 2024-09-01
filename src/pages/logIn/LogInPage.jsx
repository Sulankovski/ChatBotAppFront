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
        <div className="w-25 p-3 border border-primary rounded">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
            <p className="mt-3">
                New to the app? <span className="text-primary" style={{ cursor: "pointer" }} onClick={navigateToRegister}>Create an account</span>
            </p>
        </div>
    );
}

export default LogInPage;
