import './SignUpPage.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import AutService from "../../services/AutService";

function SignUpPage({ toggleAuthMode }) {
    const [formData, setFormData] = useState({email: '', password: '', name: '', lastName: '', age: '', userName: ''});
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login', { replace: true });
    };

    const navigateToListChatRoom = () => {
        navigate('/list_chat_room', { replace: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { email, password, name, lastName, age, userName } = formData;
        console.log("Registering with", email, password);
        const user = { email, password, name, lastName, age, userName};
        AutService.registerUser(user)
            .then(response => {
                if (response.status === 200) {
                    console.log("OK");
                    const responseData = JSON.parse(response.request.responseText);
                    const token = responseData.token;
                    const userDTO = responseData.userDTO;
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
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Lastname</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="mt-3">
                Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={navigateToLogin}>Sign in</span>
            </p>
        </div>
    );
}

export default SignUpPage;
