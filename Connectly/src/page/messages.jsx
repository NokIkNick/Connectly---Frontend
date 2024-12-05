import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewChatModal from "../components/AddNewChat";
import DisplayChats from "../components/DisplayChats";
import { getChats, getChatMessages, sendMessage } from "../../services/apiFacade";
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
  margin-top: 100px;
  padding: 1px;
  flex-wrap: wrap;
  height: calc(100vh - 100px);
`;

const MessagesColumn = styled.div`
  flex: 0.3;
  border-right: 1px solid var(--grey);
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
`;

const Chat = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column-reverse;
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
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    background-color: var(--light-grey);
  }
`;

const NewChatButton = styled.button`
  padding: 20px;
  margin-left: 10px;
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
  width: -webkit-fill-available;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const Messages = ({loggedInUser}) => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [pastMessagesProfiles, setPastMessagesProfiles] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setChatMessages([
      { id: 1, sender: "emily", content: "Hello!", timestamp: "2023-10-01T10:00:00Z" },
      { id: 2, sender: "Anders Jensen", content: "Hi Alice, how are you?", timestamp: "2023-10-01T10:01:00Z" },
      { id: 3, sender: "emily", content: "I'm good, thanks! How about you?", timestamp: "2023-10-01T10:02:00Z" },
    ]);
  }, []);

  useEffect(() => {
    // fetch past messages from the server
      getChats(loggedInUser)
      .then((data) => {
        {data.map((person) => {
          
        })}
        setPastMessagesProfiles(data);
      })
      .catch((error) => {
        console.error("Failed to get past messages: ", error);
      });
  }, [loggedInUser]);

  useEffect(() => {
    // fetch the chat messages for the selected chat
    getChatMessages(selectedChatId, loggedInUser)
      .then((data) => {
        if (data.length > 0) {
          // Assuming the newest message is the last one in the array
          const newestMessage = data[data.length - 1];
          setChatMessages(data);
          console.log(newestMessage);
        } else {
          console.log("No chat messages found");
        }
      })
      .catch((error) => {
        console.error("Failed to get chat messages: ", error);
      });
  }, [selectedChatId]);

  const handleSendMessage = (message) => {
    if (!selectedChatId || !message.trim()) return;
  
    sendMessage(loggedInUser, selectedChatId, message)
      .then(() => {
        // Move the person to the top of the list
        setPastMessagesProfiles((prev) => {
          const existingIndex = prev.findIndex((profile) => profile.id === selectedChatId);
          if (existingIndex !== -1) {
            const updatedProfiles = [...prev];
            const [existingContact] = updatedProfiles.splice(existingIndex, 1);
            return [existingContact, ...updatedProfiles];
          }
          return prev;
        });
      })
      .catch((error) => {
        console.error("Failed to send message: ", error);
      });
  };


  const startNewChat = (contact) => {
    // Create a new chat with the contact
    sendMessage(loggedInUser, contact.email, "Hello there!")
      .then(() => {
        console.log("New chat started with: ", contact.id);
      })
      .catch((error) => {
        console.error("Failed to start a new chat: ", error);
      });
  };

  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      handleSendMessage(e.target.value);
      e.target.value = ''; // Clear the input field
    }
  };

  const handleAddToMessages = (contact) => {
      setPastMessagesProfiles((prev) => {
          const existingIndex = prev.findIndex((profile) => profile.id === contact.id);
          setSelectedChatId(contact.id);
          if (existingIndex !== -1) {
              // Move the existing contact to the top and picks chatId
              const updatedProfiles = [...prev];
              const [existingContact] = updatedProfiles.splice(existingIndex, 1);
              return [existingContact, ...updatedProfiles];
          } else {
              // Add new contact to the top
              startNewChat(contact);
              return [contact, ...prev];
          }
      });
  };

  const handleMessageSelect = (chatId) => {
      setSelectedChatId(chatId);
  };

  // Filter the messages based on the search query
  const filteredMessages = pastMessagesProfiles.filter((message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
                <p style={{ fontSize: "small", fontStyle:"italic",  color: "grey" }}>
                  This could be the lastest message...
                </p>
              </div>
            </MessagesBox>
          ))}
        </MessagesColumn>
        <ChatContainer>
          <Chat>
          {selectedChatId && (
            <DisplayChats loggedInUser={loggedInUser} pressedUserId={selectedChatId} chatMessages={chatMessages} />
          )}
          </Chat>
          <MessagingBox>
          <ChatInput
            type="text"
            placeholder="Type a message..."
            onKeyDown={handleKeyPress}
          />
          <SendButton onClick={() => {
            const input = document.querySelector('input[type="text"]');
            handleSendMessage(input.value);
            input.value = ''; // Clear the input field
          }}>
            Send
          </SendButton>
          </MessagingBox>
        </ChatContainer>
      </Container>

      <NewChatModal
        show={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onAddToChat={handleAddToMessages}
      />
    </>
  );
};