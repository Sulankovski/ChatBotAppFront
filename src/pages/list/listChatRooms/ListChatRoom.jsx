import React, {useEffect, useState} from 'react';
import ChatRepository from "../../../repository/ChatRepository";
import UserInfo from "../userInfo/UserInfo";
import ChatRoom from "../../chatRoom/ChatRoom";
import "./listChatRoom.css";
import Modal from "../../../models/Modal";
import MessageRepository from "../../../repository/MessageRepository";

const ListChatRoom = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChatRoomName, setNewChatRoomName] = useState("");

    const getChatRooms = () => {
        ChatRepository.getAllChatsForUser()
            .then((data) => {
                setChatRooms(data.data);
            })
            .catch((error) => {
                console.error("Error fetching chatRooms:", error);
            });
    };

    useEffect(() => {
        getChatRooms();
    }, []);

    const handleOpenChat = (id) => {
        setSelectedChatRoomId(id);
    };

    const addChatRoom = (chatRoom) => {
        setChatRooms((prevChatRooms) => [...prevChatRooms, chatRoom]);
    };

    const handleCreateChat = () => {
        if (newChatRoomName.trim()) {
            const newChatRoom = {
                title: newChatRoomName,
            };

            ChatRepository.createChatRoom(newChatRoom)
                .then((response) => {
                        setChatRooms((prevChatRooms) => [...prevChatRooms, response.data])
                        setNewChatRoomName("");
                    }
                ).catch((error) => {
                console.error("Error creating chat room: ", error)
            })

            setIsModalOpen(false);
            setNewChatRoomName(""); // Reset the input field
        }
    };

    return (
        <div>
            <div className="d-flex vh-100">
                <div className="d-flex flex-column sidebar px-2">
                    <UserInfo/>
                    <div id="cardsUser">
                        {chatRooms.length > 0 ? (
                            chatRooms.map((chatRoom) => (
                                <div className="card m-1" key={chatRoom.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{chatRoom.title}</h5>
                                        <div className="row">
                                            <p className="col-6 card-text">{new Date(chatRoom.dateCreated).toISOString().split('T')[0]}</p>
                                            <button
                                                className="btn buttonColor col-6"
                                                onClick={() => handleOpenChat(chatRoom.id)}
                                            >
                                                Open chat
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3 className="text-center my-5">
                                <i className="text-secondary no-notification-message">There are no chat rooms</i>
                            </h3>
                        )}
                    </div>
                    <div className="mb-3 mx-3 mt-2 py-2">
                        <button
                            className="btn buttonColor col-4 w-100"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create new chat
                        </button>
                    </div>
                </div>
                <ChatRoom selectedChatRoomId={selectedChatRoomId} addChatRoom={addChatRoom}/>
            </div>
            <Modal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                handleCreate={handleCreateChat}
                chatRoomName={newChatRoomName}
                setChatRoomName={setNewChatRoomName}
            />
        </div>
    );
};

export default ListChatRoom;
