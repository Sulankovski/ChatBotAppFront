import axios from "../axios/axios";

const token = localStorage.getItem('authToken');
const MessageRepository = {
    getAllMessagesForRoom: (roomId) => {
        return axios.get(`/messages/all-for-room/${roomId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    createMessage: (messageData) => {
        return axios.post("/messages/create-message", {
            sender: messageData.sender,
            receiver: messageData.receiver,
            chatRoom: messageData.chatRoom,
            content: messageData.content,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getResponseForMessage: (messageData) => {
        return axios.post("/messages/get-response-for-message", {
            sender: messageData.sender,
            receiver: messageData.receiver,
            chatRoom: messageData.chatRoom,
            content: messageData.content
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default MessageRepository;