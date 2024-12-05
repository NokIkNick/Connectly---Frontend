import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { getAllProfiles } from "../../services/apiFacade";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "var(--blue)" : "var(--grey)")};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-hover);
  }
`;

const ContactList = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  margin-top: 10px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--white);
  cursor: pointer;
  margin-bottom: 5px;

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

const NewChatModal = ({ show, onClose, onAddToChat }) => {
  const [activeCategory, setActiveCategory] = useState("WORK");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const contacts = {
    WORK: [
      { id: 1, name: "emily" },
      { id: 2, name: "sumaia"},
    ],
    FRIEND: [
      { id: 3, name: "anders"},
      { id: 4, name: "ellie" },
    ],
    FAMILY: [
      { id: 5, name: "Sarah" },
      { id: 6, name: "Tommy" },
    ],
  };

  useEffect(() => {
    if (!show) return;
    getAllProfiles().then((data) => {
      setFilteredContacts(data[activeCategory]);
    }).catch((error) => {
      console.error("Failed to get profiles: ", error);
    });
  }, [show, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilteredContacts(contacts[category]);
    setSearchQuery(""); 
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredContacts(
      contacts[activeCategory].filter((contact) =>
        contact.name.toLowerCase().includes(query)
      )
    );
  };

  const handleAdd = (contact) => {
    onAddToChat(contact);
    onClose(); 
  };

  useEffect(() => {
    setFilteredContacts(contacts[activeCategory]);
  }, [activeCategory]);

  return (
    <Modal show={show} onClose={onClose}>
      <h2>Add to New Chat</h2>
      <ButtonGroup>
        {["WORK", "FRIEND", "FAMILY"].map((category) => (
          <CategoryButton
            key={category}
            active={activeCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </ButtonGroup>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      />
      <ContactList>
        {filteredContacts.map((contact) => (
          <ContactItem key={contact.id} onClick={() => handleAdd(contact)}>
            <ProfilePicture src={contact.profilePic} alt={contact.name} />
            {contact.name}
          </ContactItem>
        ))}
      </ContactList>
    </Modal>
  );
};

export default NewChatModal;
