import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import { getProfile,blockUser } from "../services/apiFacade";

// Styled components
const Container = styled.div`
display: flex;
justify-content: space-between;
margin-top: 15vh;
padding: 1px;
flex-wrap: wrap;
`;

//out-comment border below to better see layout.
const Column = styled.div`
flex: 1;
padding: 20px;
//border: 1px solid black;
margin: 0 5px;
`;

const SearchResults = styled(Column)`
flex: 2.5;
height: 80vh;
overflow-y: auto;
scrollbar-width: none;
`;

const Ads = styled(Column)`
flex: 0.5;

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
display: block;
margin: 0 auto;
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
background-color: var(--blue);
color: white;
border-radius: 10px;
border: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
&:hover {
    background-color: var(--blue-hover);
}
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
&:hover {
    background-color: var(--blue-hover);
}
${({ active }) =>
    active &&
    `
    background-color: transparent;
    color: var(--blue);
    border: 2px solid var(--blue);
`}
`;

const FamilyButton = styled(FriendButton)`
background-color: green;
&:hover {
    background-color: darkgreen;
}
${({ active }) =>
    active &&
    `
    background-color: transparent;
    color: var(--dark-blue);
    border: 2px solid darkgreen;
`}
`;

const BusinessButton = styled(FriendButton)`
background-color: var(--light-grey);
&:hover {
    background-color: var(--grey);
}
${({ active }) =>
    active &&
    `
    background-color: transparent;
    color: var(--grey);
    border: 2px solid var(--grey);
`}
`;

const PaginateContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 20px 0;
button {
    background-color: var(--blue);
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
}
`;

const PrevNext = styled.button`
&:hover {
    background-color: var(--blue-hover);
}
`;

const AddConnectionButton = styled(FriendButton)``;
//uncomment the line above to see the sample data
export const Searchsite = ({loggedInUser, search, setSearch, triggerSearch}) => {
    const [showModal, setShowModal] = useState(false);
    const [profilesPerPage, setProfilesPerPage] = useState(5);
    const [people, setPeople] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [activeButton, setActiveButton] = useState([]);
    const [connectedIds, setConnectedIds] = useState([]);
    const [blockedIds,setBlocedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [finalizedSearch, setFinalizedSearch] = useState(search);
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = people.slice(indexOfFirstProfile, indexOfLastProfile);
    const totalPages = Math.ceil(people.length / profilesPerPage);
    
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 700) {
                setProfilesPerPage(3);
            } else if (width < 1000) {
                setProfilesPerPage(6);
            } else {
                setProfilesPerPage(10);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the correct profiles per page

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    //to fetch already connected profiles
    useEffect(() => {
        console.log("Fetching connected profiles for user: ", search);
        // Fetch search results based on the search query
        const fetchData = async () => {
            const data = await getProfile(search);
            setPeople(data);
        };
        fetchData();
        // Example: fetchPeople(search).then(setPeople);
    }, [triggerSearch]);

    const handleConnectClick = (profile) => {
        setSelectedProfile(profile);
        handleOpenModal();
    };

    const handleBlockClick = async (profile) => {
        try{
            setSelectedProfile(profile);
        const response = await blockUser(profile.email);
        if(response.success){
            setBlocedIds(profile.email);
        }else {
            console.error('failed to block')
        }
        }catch(error){
            console.error('error cant block user',error.message);
        }
        
    };

    const handleButtonClick = (buttonType, event) => {
        event.preventDefault();
        setActiveButton((prevActiveButtons) =>
            prevActiveButtons.includes(buttonType)
                ? prevActiveButtons.filter((type) => type !== buttonType)
                : [...prevActiveButtons, buttonType]
        );
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Container>
                <SearchResults>
                <h2>Search Results for: {finalizedSearch} </h2>
                {people.length === 0 && <h2>Loading...</h2>}
                    {currentProfiles &&
                        currentProfiles.map((item) => (
                            <Profiles key={item.email}>
                                {/* Stand-in. Replace with actual image */}
                                <Avatar src="user-svgrepo-com.svg" alt="profile image" />
                                <h3>
                                    {item.fullName}
                                </h3>
                                <AddButton onClick={() => handleConnectClick(item)}>
                                    {connectedIds.includes(item.email) ? "Connected" : "Connect"}
                                </AddButton>
                                <br></br>
                                <AddButton onClick={()=> handleBlockClick(item)}>
                                    {blockedIds.includes(item.email) ?"Blocked":"block"}
                                </AddButton> 
                            </Profiles>
                        )) } 
                
                <PaginateContainer>
                    <PrevNext onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </PrevNext>
                    <span>Page {currentPage} of {totalPages}</span>
                    <PrevNext onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </PrevNext>
                </PaginateContainer>
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
            
            {/* Modal popup */}
            <Modal show={showModal} onClose={handleCloseModal}>
            
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
                            onClick={(event) => handleButtonClick("friend", event)}
                            active={activeButton.includes("friend")}
                        >
                            Friend
                        </FriendButton>
                        <FamilyButton
                            onClick={(event) => handleButtonClick("family", event)}
                            active={activeButton.includes("family")}
                        >
                            Family
                        </FamilyButton>
                        <BusinessButton
                            onClick={(event) => handleButtonClick("business", event)}
                            active={activeButton.includes("business")}
                        >
                            Business
                        </BusinessButton>
                        <br />
                        <AddConnectionButton>Add to your connections</AddConnectionButton>
            </Modal>
            
        </>
    );
};

export default Searchsite;