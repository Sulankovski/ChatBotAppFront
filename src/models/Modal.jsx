import React from 'react';
import './modal.css';

const Modal = ({ show, handleClose, handleCreate, chatRoomName, setChatRoomName }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create New Chat Room</h4>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        placeholder="Enter chat room name"
                        value={chatRoomName}
                        onChange={(e) => setChatRoomName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="modal-footer">
                    <button className="btn buttonColor" onClick={handleCreate}>
                        Create
                    </button>
                    <button className="btn buttonColor" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
