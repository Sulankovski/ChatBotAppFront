import axios from "../axios/axios";

const AutService = {
    logInUser: (userData) => {
        return axios.post("/auth/login", {
            email: userData.email,
            password: userData.password
        });
    },
    registerUser: (userData) => {
        return axios.post("/auth/register", {
            email: userData.email,
            password: userData.password,
            name: userData.name,
            lastName: userData.lastName,
            age: userData.age,
            userName: userData.userName
        });
    }
}

export default AutService;