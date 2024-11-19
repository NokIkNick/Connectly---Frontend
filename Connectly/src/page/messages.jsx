import { useEffect, useState } from "react";
import react from "react";
import styled from "styled-components";


export const Messages = () => {
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

    const Column = styled.div`
        flex: 1;
        padding: 20px;
    `;

    const Messages = styled(Column)`
        flex: 0.3;
        border-right: 1px solid var(--grey);
        height: 80vh;
        overflow-y: auto;
    `;

    const ChatContainer = styled(Column)`
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

    const SendBotton = styled.button`
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
        border-bottom: 1px solid var(--grey);
        color: black;
        cursor: pointer;
        &:hover {
            background-color: var(--light-grey);
        }
    `;

    const ProfilePicture = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    `;

    const MessageContent = styled.div`
        display: flex;
        align-items: center;
        gap: 10px;
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
        outline: none;
        &:focus {
            outline: none;
        }
    `;

    const SearchField = styled.input`
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        margin-bottom: 20px;
    `;

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
padding: 20px;
border-radius: 10px;
width: 400px;
max-width: 90%;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
background: none;
border: none;
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
font-size: 20px;
&:focus {
    outline: none;
}
`;

    // standin data for messages
    const [pastMessagesProfiles, setPastMessagesProfiles] = useState([
        { id: 1, name: "Anders Jensen" },
        { id: 2, name: "Joackim Olsen" },
        { id: 3, name: "Noah Aalgaard" }
    ]);
    const [currentChat, setCurrentChat] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [input, setinput] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleMessageSelect = (chatId) => {
        setSelectedChatId(chatId);
        //logic to get messages. Currently example messages
        setCurrentChat([
            { id: 1, text: "Current chat message 1" },
            { id: 2, text: "Current chat message 2" },
            { id: 3, text: "Current chat message 3" }
        ]);
        //logic to select message
    }

    const chatInput = (event) => {
        setinput(event.target.value);
    }

    //logic to send message
    const handleSend = () => {
        setCurrentChat([...currentChat, { id: currentChat.length + 1, text: input }]);
        console.log(input);
        /*sendMessage({ text: input }).then(() => {
            console.log("Message sent");
        }).catch((error) => {
            console.error(error);
        }); */
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
        }
    };

    const searchThroughMessages = (event) => {

        //logic to search through messages
    }

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <Standinnavbar>
                <h1>this is a stand-in for a navbar</h1>
            </Standinnavbar>

            <Container>
                <Messages>
                    <NewChatButton onClick={openModal}>
                        <h3>New Chat</h3>
                    </NewChatButton>
                    <SearchField type="text" placeholder="Search for a chat..." onChange={()=>searchThroughMessages}/>
                    {/* Itteriate through past messages... */}
                    {pastMessagesProfiles.map((message) => (
                        <MessagesBox key={message.id} onClick={() => handleMessageSelect(message.id)}>
                            <MessageContent>
                                <ProfilePicture src="user-svgrepo-com.svg" alt="profile image"/>
                                <div>
                                    {message.name} <br />
                                    <p style={{ fontSize: "small", color: "grey" }}>*Should maybe be latest message?</p>
                                </div>
                            </MessageContent>
                        </MessagesBox>
                    ))}
                </Messages>
                <ChatContainer>
                    <Chat>
                        {/* Itteriate through current chat messages... */}
                    {currentChat.map((message) => (
                            <p key={message.id}>{message.text}</p>
                        ))}
                    </Chat>
                    <MessagingBox>
                        <ChatInput type="text" placeholder="Type a message..." onChange={()=>chatInput} onKeyDown={handleKeyDown}/>
                        <SendBotton onClick={handleSend}>Send</SendBotton>
                    </MessagingBox>
                </ChatContainer>
            </Container>

            {isModalVisible && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={closeModal}>X</CloseButton>
                        <h3>Who would you like to start a new chat with?</h3>

                        <SearchField type="text" placeholder="Search for a chat..." onChange={()=>searchThroughMessages}/>

                        {/* Add your form or content for starting a new chat here dropdown or list - the ones you already have one with. For example Anders Jensen
                            Should probably fetch people one has connections with here. But if chat allready exists, navigate to that chat.
                        */}
                        {pastMessagesProfiles.map((message) => (
                        <MessagesBox key={message.id} onClick={() => handleMessageSelect(message.id)}>
                            <MessageContent>
                                <ProfilePicture src="user-svgrepo-com.svg" alt="profile image"/>
                                <div>
                                    {message.name} <br />
                                </div>
                            </MessageContent>
                        </MessagesBox>
                    ))}

                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}