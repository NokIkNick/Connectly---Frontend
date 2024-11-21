import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: var();
    padding: 20px;
    border-radius: 10px;
    width: 30%;
    min-width: 390px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 45px;
    right: 25px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
`;

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <img src="/close-svgrepo-com.svg" alt="Close" width="24" height="24" />
                </CloseButton>
                {children}
            </ModalContent>
        </ModalBackground>
    );
};

export default Modal;