import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, handleClose, children }) => {
    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" style={{transform: "rotate(45deg)"}}>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </span>
                    {children}
                </div>
            </div>
        )
    );
};

export default Modal;