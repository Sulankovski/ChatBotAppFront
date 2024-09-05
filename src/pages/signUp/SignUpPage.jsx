import './SignUpPage.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AutService from '../../services/AutService';

function SignUpPage({ toggleAuthMode }) {
    const [formData, setFormData] = useState({ email: '', password: '', name: '', lastName: '', age: '', userName: '' });
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login', { replace: true });
    };

    const navigateToListChatRoom = () => {
        navigate('/list_chat_room', { replace: true });
        window.location.reload();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { email, password, name, lastName, age, userName } = formData;
        const user = { email, password, name, lastName, age, userName };
        AutService.registerUser(user)
            .then(response => {
                if (response.status === 200) {
                    const responseData = JSON.parse(response.request.responseText);
                    const token = responseData.token;
                    const userDTO = responseData.userDTO;
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userDTO', JSON.stringify(userDTO));
                    navigateToListChatRoom();
                }
            })
            .catch(error => {
                console.error('Login failed', error);
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className={"textColor"}>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Email</label>
                        <label>Password</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control textColor"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            className="form-control textColor"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <label>Lastname</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control textColor"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            className="form-control textColor"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <label>Username</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control textColor"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            className="form-control textColor"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn buttonColor">Register</button>
                </form>
                <div className="signup-footer">
                    <p>
                        Already have an account? <span className="textColor fw-bold" onClick={navigateToLogin}>Sign in</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
