import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const NavContainer = styled.div`
     color: var(--grey);
    background-color: var(--blue);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    padding: 1rem 1.5rem;
    top: 0;
    width: 100%;
    z-index: 1000;
    
`;

const Logo = styled.img`
    margin: 0 auto;
    width: 50px;
    cursor: pointer;
`;

const Search = styled.input`
    position: relative;
    max-width: 100%;
    width: 100%;
    width: calc(100% - 3rem); // subtract the width of the button
    margin: 0 10px;
    padding: 1rem 0.5rem;
    border: 1px solid gray;
    border-radius: 50px;
    background-color: var(--background);
    outline: none;
    padding-left: 1rem;
    font-size: 1rem;
`;

const BackButton = styled.button`
    display: flex;
    padding: 15px 30px;
    margin: 0 0.2rem;
    background-color: var(--background);
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;


export const MainNav = ({search, setSearch, triggerSearch}) => {
    const navigate = useNavigate();
    const searchRef = useRef();
    const location = useLocation();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && document.activeElement === searchRef.current) {
            console.log('Search triggered:', search);
            if (location.pathname === '/search') {
                navigate('/search');
                triggerSearch(search);
            } else {
                navigate('/search');
            }
        }
    };

    useEffect(() => {
        const searchInput = searchRef.current;
        searchInput.addEventListener('keydown', handleKeyDown);

        return () => {
            searchInput.removeEventListener('keydown', handleKeyDown);
        };
    }, [search]);

    return (
       <NavContainer>
            <Logo onClick={() => navigate("/home")} src="/logo_transparent.png"/>
            <Search 
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={searchRef}
                placeholder="Search for profiles..."/>
            <BackButton onClick={() => navigate(-1)}>back</BackButton>
        </NavContainer>
    )
}