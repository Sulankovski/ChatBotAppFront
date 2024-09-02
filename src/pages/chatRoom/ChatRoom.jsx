import "./chatRoom.css";
import "../list/listChatRooms/listChatRoom.css";
import React, {useEffect, useState, useRef} from "react";
import MessageRepository from "../../repository/MessageRepository";
import Modal from "../../models/Modal";
import ChatRepository from "../../repository/ChatRepository";

const ChatRoom = (props) => {
    const [messagesForRoom, setMessagesForRoom] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChatRoomName, setNewChatRoomName] = useState("");
    const userDTO = JSON.parse(localStorage.getItem('userDTO'));
    const userId = userDTO.id;

    const bottomRef = useRef(null); // Reference for the last message

    const getAllMessagesForRoom = () => {
        MessageRepository.getAllMessagesForRoom(props.selectedChatRoomId)
            .then((data) => {
                setMessagesForRoom(data.data);
            })
            .catch((error) => {
                console.error("Error fetching messages: ", error);
            });
    };

    const handleCreateChat = () => {
        if (newChatRoomName.trim()) {
            const newChatRoom = {
                title: newChatRoomName,
            };

            ChatRepository.createChatRoom(newChatRoom)
                .then((response) => {
                        props.addChatRoom(response.data);
                        setNewChatRoomName("");
                    }
                ).catch((error) => {
                console.error("Error creating chat room: ", error)
            });

            setIsModalOpen(false);
            setNewChatRoomName(""); // Reset the input field
        }
    };

    const createNewMessage = (newMessageObj) => {
        MessageRepository.createMessage(newMessageObj)
            .then((response) => {
                setMessagesForRoom((prevMessages) => [...prevMessages, response.data]);
                setNewMessage("");
            })
            .catch((error) => {
                console.error("Error sending message: ", error);
            });
    };

    const createResponseForMessage = (newMessageObj) => {
        MessageRepository.getResponseForMessage(newMessageObj)
            .then((response) => {
                setMessagesForRoom((prevMessages) => [...prevMessages, response.data]);
            })
            .catch((error) => {
                console.error("Error creating response: ", error);
            });
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const newMessageObj = {
            sender: userId,
            receiver: -1,
            chatRoom: props.selectedChatRoomId,
            content: newMessage,
        };

        createNewMessage(newMessageObj);
        setTimeout(() => {
            createResponseForMessage(newMessageObj);
        }, 500);
    };

    useEffect(() => {
        if (!props.selectedChatRoomId) {
            console.log("No chat room selected");
            return;
        }

        getAllMessagesForRoom();
    }, [props.selectedChatRoomId]);

    useEffect(() => {
        // Scroll to the bottom whenever messagesForRoom changes
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messagesForRoom]);

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <div className="message-list flex-grow-1 overflow-auto">
                {messagesForRoom.length > 0 ? (
                    <>
                        {messagesForRoom.map((message) => (
                            <div
                                className={`card m-1 ${message.sender.id === userId ? 'text-end' : 'text-start'}`}
                                key={message.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <p className="card-text">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} /> {/* Empty div to scroll into view */}
                    </>
                ) : (
                    props.selectedChatRoomId == null ?
                        <div
                            className="no-rooms-container d-flex justify-content-center align-items-center flex-column">
                            <h3 className="text-center noRoomsStyle">
                                <p className=" no-notification-message ">Choose existing chat room or</p>
                                <div className="mb-3 mx-3 mt-2 py-2">
                                    <button
                                        className="btn buttonColor col-4 w-100"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Create new chat
                                    </button>
                                </div>
                            </h3>
                        </div> :
                        <div
                            className="no-rooms-container d-flex justify-content-center align-items-center flex-column">
                            <h3 className="text-center noRoomsStyle">
                                <p className=" no-notification-message ">No messages for chat room</p>
                                <p className=" no-notification-message ">What are you interested in?</p>
                            </h3>
                        </div>
                )}
            </div>
            {props.selectedChatRoomId && (
                <>
                    <div className="message-input d-flex px-4 pb-4">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button className="btn buttonColor" onClick={handleSendMessage}>
                            Send
                        </button>
                    </div>
                </>
            )}
            <Modal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                handleCreate={handleCreateChat}
                chatRoomName={newChatRoomName}
                setChatRoomName={setNewChatRoomName}
            />
        </div>
    );
}

export default ChatRoom;
