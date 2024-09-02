import axios from "../axios/axios";

const token = localStorage.getItem("authToken");
const userDTO = JSON.parse(localStorage.getItem("userDTO"));
const userId = userDTO != undefined ? userDTO.id : 0;
console.log(userId);
const ChatRepository = {
  getAllChats: () => {
    return axios.get(`/chat-room/all`);
  },
  getAllChatsForUser: () => {
    return axios.get(`/chat-room/all-for-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createChatRoom: (chatRoomData) => {
    return axios.post(
      "/chat-room/create-chat-room",
      {
        userId: userId,
        title: chatRoomData.title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default ChatRepository;
