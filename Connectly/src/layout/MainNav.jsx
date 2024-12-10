import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaEnvelope, FaUser } from 'react-icons/fa';

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #4267B2; /* Facebook blue */
    padding: 0.5rem 1rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
`;

const Logo = styled.img`
    width: 60px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    flex: -70%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
`;

const SearchInput = styled.input`
    width: 300px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    background-color: #f0f0f0;
    font-size: 1rem;
    &:focus {
        outline: none;
        background-color: #e4e6eb;
    }
`;

const SearchButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 10px;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const IconWrapper = styled.div`
    position: relative;
    margin-left: 1rem;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.14);
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 1000;
    width: 300px;
`;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #e3e6eb;
    }
`;

const FriendRequestItem = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
    padding: 5px 10px;
    border: black;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ action }) => (action === 'add' ? '#4267B2' : '#e4e6eb')};
    color: ${({ action }) => (action === 'add' ? 'white' : '#333')};
    margin-left: 5px;

    &:hover {
        background-color: ${({ action }) => (action === 'add' ? '#365899' : '#d0d0d0')};
    }
`;

const MainNav = ({ search, setSearch, triggerSearch }) => {
    const navigate = useNavigate();
    const searchRef = useRef();
    const [searchResults, setSearchResults] = useState([]);
    const [data] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Emily']); // Mock data
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const notificationRef = useRef();
    const profileRef = useRef();

    const handleSearch = (query) => {
        const filteredResults = data.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && document.activeElement === searchRef.current) {
            handleSearch(search);
            triggerSearch(search); // Trigger external search action
        }
    };

    const handleOutsideClick = (e) => {
        if (
            notificationRef.current && !notificationRef.current.contains(e.target) &&
            profileRef.current && !profileRef.current.contains(e.target)
        ) {
            setNotificationOpen(false);
            setProfileOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <NavContainer>
            <Logo onClick={() => navigate('/home')} src="/logo_transparent.png" />
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleSearch(e.target.value); // Update search in real-time
                    }}
                    onKeyDown={handleKeyDown}
                    ref={searchRef}
                    placeholder="Search Connectly"
                />
            </SearchContainer>
            <IconsContainer>
                <IconWrapper ref={notificationRef} onClick={() => setNotificationOpen(!isNotificationOpen)}>
                    <FaBell />
                    <DropdownMenu isOpen={isNotificationOpen}>
                        {/* Example friend requests */}
                        {searchResults.map((request, index) => (
                            <FriendRequestItem key={index}>
                                <span>{request}</span>
                                <div>
                                    <ActionButton action="add">Add</ActionButton>
                                    <ActionButton action="remove">Remove</ActionButton>
                                </div>
                            </FriendRequestItem>
                        ))}
                        {searchResults.length === 0 && (
                            <DropdownItem>No results found</DropdownItem>
                        )}
                    </DropdownMenu>
                </IconWrapper>
                <IconWrapper onClick={() => navigate('/messages')}>
                    <FaEnvelope />
                </IconWrapper>
                <IconWrapper ref={profileRef} onClick={() => setProfileOpen(!isProfileOpen)}>
                    <FaUser />
                </IconWrapper>
            </IconsContainer>
            {searchResults.length > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '60px',
                        left: '10%',
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        zIndex: 1000,
                    }}
                >
                    {searchResults.map((result, index) => (
                        <div key={index}>{result}</div>
                    ))}
                </div>
            )}
        </NavContainer>
    );
};

export default MainNav;
