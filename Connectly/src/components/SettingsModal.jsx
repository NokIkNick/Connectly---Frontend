import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Settings } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  padding: 20px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const BlockedUserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const UnblockButton = styled.button`
  background-color: var(--blue);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmationModalContent = styled(ModalContent)`
  text-align: center;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: var(--light-grey);
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmButton = styled.button`
  background-color: var(--blue);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, username: 'John Doe', blockedAt: '2024-01-15' },
    { id: 2, username: 'Jane Smith', blockedAt: '2024-02-20' },
    { id: 3, username: 'Mounir Salem', blockedAt: '2024-03-10' }
  ]);
  const [userToUnblock, setUserToUnblock] = useState(null);

  const initiateUnblock = (user) => {
    setUserToUnblock(user);
  };

  const handleUnblock = () => {
    if (userToUnblock) {
      // When backend is ready this would call an API to unblock
      setBlockedUsers(blockedUsers.filter(user => user.id !== userToUnblock.id));
      setUserToUnblock(null);
    }
  };

  const cancelUnblock = () => {
    setUserToUnblock(null);
  };

  return (
    <>
      <SettingsButton onClick={() => setIsOpen(true)}>
        <Settings size={24} />
      </SettingsButton>

      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Settings</h2>
              <CloseButton onClick={() => setIsOpen(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>

            <h3>Blocked Users</h3>
            {blockedUsers.length === 0 ? (
              <p>No blocked users</p>
            ) : (
              blockedUsers.map(user => (
                <BlockedUserItem key={user.id}>
                  <div>
                    <strong>{user.username}</strong>
                    <p>Blocked on: {user.blockedAt}</p>
                  </div>
                  <UnblockButton onClick={() => initiateUnblock(user)}>
                    Unblock
                  </UnblockButton>
                </BlockedUserItem>
              ))
            )}
          </ModalContent>
        </ModalOverlay>
      )}

      {userToUnblock && (
        <ModalOverlay>
          <ConfirmationModalContent>
            <h2>Unblock User</h2>
            <p>Are you sure you want to unblock {userToUnblock.username}?</p>
            <ButtonGroup>
              <CancelButton onClick={cancelUnblock}>Cancel</CancelButton>
              <ConfirmButton onClick={handleUnblock}>Confirm</ConfirmButton>
            </ButtonGroup>
          </ConfirmationModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default SettingsModal;