import React, { useState } from "react";
import styled from "styled-components";
import NewChatModal from "../components/AddNewChat";
// Styled components
const Standinnavbar = styled.div`
  background-color: var(--blue);
  color: black;
  text-align: center;
  padding: 4vh;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15vh;
  padding: 1px;
  flex-wrap: wrap;
`;

const MessagesColumn = styled.div`
  flex: 0.3;
  border-right: 1px solid var(--grey);
  height: 80vh;
  overflow-y: auto;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  height: 85vh;
`;

const Chat = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const MessagingBox = styled.div`
  border-top: 1px solid var(--grey);
  padding: 10px;
  display: flex;
`;

const ChatInput = styled.input`
  flex: 1;
  outline: none;
  padding: 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--blue);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: var(--blue-hover);
  }
`;

const MessagesBox = styled.div`
  max-height: 80px;
  padding: 20px;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  background-color: var(--white);
  margin-bottom: 10px;
  &:hover {
    background-color: var(--light-grey);
  }
`;

const NewChatButton = styled.button`
  padding: 20px;
  border: none;
  background-color: var(--blue);
  color: white;
  cursor: pointer;
  width: 40%;
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    background-color: var(--blue-hover);
  }
`;

const SearchField = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
`;
export const Messages = () => {
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [pastMessagesProfiles, setPastMessagesProfiles] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); 
  
    const handleAddToChat = (contact) => {
      setPastMessagesProfiles((prev) => [...prev, contact]);
    };
  
    const handleMessageSelect = (chatId) => {
      setSelectedChatId(chatId);
      setCurrentChat([
        { id: 1, text: "Current chat message 1" },
        { id: 2, text: "Current chat message 2" },
        { id: 3, text: "Current chat message 3" },
      ]);
    };
  
    // Filter the messages based on the search query
    const filteredMessages = pastMessagesProfiles.filter((message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <>
        <Standinnavbar>
          <h1>this is a stand-in for a navbar</h1>
        </Standinnavbar>
  
        <Container>
          <MessagesColumn>
            <NewChatButton onClick={() => setShowNewChatModal(true)}>
              <h3>New Chat</h3>
            </NewChatButton>
            <SearchField
              type="search"
              placeholder="Search for a chat..."
              value={searchQuery} // Controlled component
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
            {filteredMessages.map((message) => (
              <MessagesBox
                key={message.id}
                onClick={() => handleMessageSelect(message.id)}
              >
                <div>
                  {message.name} <br />
                  <p style={{ fontSize: "small", color: "grey" }}>
                  </p>
                </div>
              </MessagesBox>
            ))}
          </MessagesColumn>
          <ChatContainer>
            <Chat>
              {currentChat.map((message) => (
                <p key={message.id}>{message.text}</p>
              ))}
            </Chat>
            <MessagingBox>
              <ChatInput type="text" placeholder="Type a message..." />
              <SendButton>Send</SendButton>
            </MessagingBox>
          </ChatContainer>
        </Container>
  
        <NewChatModal
          show={showNewChatModal}
          onClose={() => setShowNewChatModal(false)}
          onAddToChat={handleAddToChat}
        />
      </>
    );
  };