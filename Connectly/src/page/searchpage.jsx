import React, { useState } from "react";
import styled from "styled-components";

export const Searchsite = ({ items }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const Standinnavbar = styled.div`
        background-color: var(--blue);
        color: black;
        text-align: center;
        padding: 20px;
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
        border: 1px solid black;
        margin: 0 5px;
    `;

    const FeedAndCategories = styled(Column)`
    flex: 0.5;
    height: 80vh;
    overflow-y: auto;
    scrollbar-width: none;
        @media (max-width: 768px) {
            display: none;
        }
    `;

    const SearchResults = styled(Column)`
        flex: 2.5;
        height: 80vh;
        overflow-y: auto;
        scrollbar-width: none;
        @media (max-width: 768px) {
            flex: 2;
        }
        @media (max-width: 1500px) {
            flex: 1.5;
        }
    `;

    const Ads = styled(Column)`
        height: 80vh;
        @media (max-width: 768px) {
            flex: 1;
        }
    `;

    const FACButton = styled.button`
        margin: 20px 0;
        display: block;
        width: 100%;
        border: 2px var(--blue) solid;
        color: var(--blue);
        border-radius: 10px;
        padding: 20px 20px;
        cursor: pointer;
    `;

    const CButton = styled.button`
        margin: 20px 0;
        display: block;
        width: 100%;
        border: 2px var(--blue) solid;
        color: var(--blue);
        border-radius: 10px;
        padding: 20px 20px;
        cursor: pointer;
    `;

    const AD = styled.div`
        width: 100%;
        height: 40%;
        background-color: var(--light-grey);
        padding: 20px 20px;
        border-radius: 10px;
        margin: 20px 0;
    `;

    const Profiles = styled.div`
        background-color: var(--light-grey);
        display: inline-block;
        padding: 20px 60px;
        margin: 5px 5px;
        border-radius: 10px;
    `;

    const Avatar = styled.img`
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border-color: var(--offwhite);
        border-width: 4px;
        border-style: solid;
    `;

    const AddButton = styled.button`
        width: 100%;
        height: 50px;
        margin: 0 auto;
        font-family: 'StabilGrotesk-regular';
        background-color: var(--blue);
        color: white;
        border-radius: 10px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;

    const Popup = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 2px solid var(--blue);
        border-radius: 10px;
        z-index: 2;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    `;

    const Overlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
    `;

    const CloseButton = styled.button`
        background: none;
        border: none;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        padding: 0;
        img {
            width: 100%;
            height: 100%;
        }
    `;

    const FriendButton = styled.button`
        background-color: var(--blue);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
        ${({ active }) =>
            active &&
            `
            background-color: transparent;
            color: var(--blue);
            border: 2px solid var(--blue);
        `}
    `;

    const FamilyButton = styled(FriendButton)`
        background-color: var(--dark-blue);
        ${({ active }) =>
            active &&
            `
            background-color: transparent;
            color: var(--dark-blue);
            border: 2px solid var(--dark-blue);
        `}
    `;

    const BusinessButton = styled(FriendButton)`
        background-color: var(--grey);
        ${({ active }) =>
            active &&
            `
            background-color: transparent;
            color: var(--grey);
            border: 2px solid var(--grey);
        `}
    `;

    const AddConnectionButton = styled(FriendButton)``;

    const handleConnectClick = (profile) => {
        setSelectedProfile(profile);
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedProfile(null);
    };

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };


    // Stand-in data. Replace with actual data.
    const samplePeople = [
        {
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com"
        },
        {
            firstname: "Jane",
            lastname: "Smith",
            email: "jane.smith@example.com"
        },
        {
            firstname: "Alice",
            lastname: "Johnson",
            email: "alice.johnson@example.com"
        },
        {
            firstname: "Bob",
            lastname: "Brown",
            email: "bob.brown@example.com"
        },
        {
            firstname: "Charlie",
            lastname: "Davis",
            email: "charlie.davis@example.com"
        }
    ];    //items = samplePeople; uncomment this line to see the sample data

    return (
        <>
            <Standinnavbar>
                <h1>this is a stand-in for a navbar</h1>
            </Standinnavbar>

            <Container>
                <FeedAndCategories>
                    <h2>FEED </h2>
                    <FACButton>Family</FACButton>
                    <FACButton>Family</FACButton>
                    <FACButton>Family</FACButton>

                    <h2>CATEGORIES</h2>
                    <CButton>Category 1</CButton>
                    <CButton>Category 2</CButton>
                    <CButton>Category 3</CButton>

                    <h2>EXAMPLE3</h2>
                    <CButton>This</CButton>
                    <CButton>example</CButton>
                    <CButton>for</CButton>
                    <CButton>scrolling on mobile devices</CButton>
                </FeedAndCategories>

                <SearchResults>
                    {items &&
                        items.map((item) => (
                            <Profiles key={item.email}>
                                {/* Stand-in. Replace with actual image */}
                                <Avatar src="user-svgrepo-com.svg" alt="profile image" />
                                <h3>
                                    {item.firstname} {item.lastname}
                                </h3>
                                <AddButton onClick={() => handleConnectClick(item)}>Connect</AddButton>
                            </Profiles>
                        ))}
                </SearchResults>

                <Ads>
                    <AD>
                        <h2>AD</h2>
                    </AD>
                    <AD>
                        <h2>AD2</h2>
                    </AD>
                </Ads>
            </Container>

            {isPopupVisible && (
                <>
                    <Overlay onClick={handleClosePopup} />
                    <Popup>
                        <CloseButton onClick={handleClosePopup}>
                            <img src="close-svgrepo-com.svg" alt="close" />
                        </CloseButton>
                        <h2>Connect</h2>
                        {selectedProfile && (
                            <>
                                <Avatar src="user-svgrepo-com.svg" alt="profile image" />
                                <h3>
                                    {selectedProfile.firstname} {selectedProfile.lastname}
                                </h3>
                            </>
                        )}
                        <h2>Choose one or more</h2>
                        <FriendButton
                            onClick={() => handleButtonClick("friend")}
                            active={activeButton === "friend"}
                        >
                            Friend
                        </FriendButton>
                        <FamilyButton
                            onClick={() => handleButtonClick("family")}
                            active={activeButton === "family"}
                        >
                            Family
                        </FamilyButton>
                        <BusinessButton
                            onClick={() => handleButtonClick("business")}
                            active={activeButton === "business"}
                        >
                            Business
                        </BusinessButton>
                        <br />
                        <AddConnectionButton>Add to your connections</AddConnectionButton>
                    </Popup>
                </>
            )}
        </>
    );
};

export default Searchsite;