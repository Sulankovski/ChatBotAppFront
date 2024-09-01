import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import LogInPage from "./pages/logIn/LogInPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import ListChatRoom from "./pages/list/listChatRooms/ListChatRoom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/list_chat_room" element={<ListChatRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
