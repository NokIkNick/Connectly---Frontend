import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  padding: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => (props.isOwnMessage ? "var(--blue)" : "var(--grey)")};
  align-self: ${(props) => (props.isOwnMessage ? "flex-end" : "flex-start")};
`;

const MessageContent = styled.p`
  margin: 0;
`;

const DisplayChats = ({ loggedInUser, pressedUserId, chatMessages }) => {
  // Sort messages by timestamp
  const sortedMessages = [...chatMessages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <MessageContainer>
      {sortedMessages.map((message) => (
        <Message key={message.id} isOwnMessage={message.sender === loggedInUser.fullName}>
          <MessageContent>{message.content}</MessageContent>
        </Message>
      ))}
    </MessageContainer>
  );
};

export default DisplayChats;