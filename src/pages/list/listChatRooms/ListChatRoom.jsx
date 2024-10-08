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
                // Reverse the order of chatRooms
                const reversedChatRooms = data.data.reverse();
                setChatRooms(reversedChatRooms);
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
        <div className="backgroundColor container-fluid">
            <div className="row vh-100 vw-100 listHeight">
                <div className="col-2 sidebar ">
                    <UserInfo/>
                    <div id="cardsUser">
                        {chatRooms.length > 0 ? (
                            chatRooms.map((chatRoom) => (
                                <div className="card m-1" key={chatRoom.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{chatRoom.title}</h5>
                                        <div className="row">
                                            <p className="col-7 card-text">
                                                {new Date(chatRoom.dateCreated).toISOString().split('T')[0]}
                                            </p>
                                            <button
                                                className="btn buttonColor col-5"
                                                onClick={() => handleOpenChat(chatRoom.id)}
                                            >
                                                Open
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3 className="text-center my-5">
                                <i className="textColor no-notification-message">There are no <br/> chat rooms</i>
                            </h3>
                        )}
                    </div>
                    <div className="mb-1 mx-3 mt-2 py-3">
                        <button
                            className="btn buttonColor col-4 w-100"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create new
                        </button>
                    </div>
                </div>
                <div className={"col-10"}>
                    <ChatRoom selectedChatRoomId={selectedChatRoomId} addChatRoom={addChatRoom}/>
                </div>
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
