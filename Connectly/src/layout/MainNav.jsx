import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';


const NavStyle = styled.nav`
    color: var(--grey);
    background-color: var(--green);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
`;

const Logo = styled.img`
    cursor: pointer;
    height: 50px;
`;

const SearchWrapper = styled.div`
    position: relative;
    max-width: 100%;
    width: 100%;
        input {
            width: calc(100% - 3rem); // subtract the width of the button
            margin: 0 10px;
            padding: 0.5rem 0.5rem;
            border: 1px solid gray;
            border-radius: 5px;
            background-color: var(--basewhite);
            outline: none;
        }
    @media (max-width: 500px) {
        input {
            display: none;
        }
    
    }
`;

const Buttons = styled.div`
    display: flex;
    button {
        padding: 0.5rem 0.7rem;
        margin: 0 0.2rem;
        background-color: var(--basewhite);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        img {
            height: 1rem;
        }
    }
`;


export const MainNav = ({search, setSearch}) => {
const params = useParams();
const navigate = useNavigate();
let debounceTimer;
const inputRef = useRef();
const MainNav = () => {
    let button;
    if (window.location.pathname === "/home" || window.location.pathname === "/createthread" || window.location.pathname === "/accountPage") {
        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
            button = <button>Login first</button>;
        } else {
            button = <button onClick={() => {navigate("/createthread")}}>Create Thread</button>;
        }
    } else {
        button = null;
    }
return (
    <div>
        {button}
    </div>
);
}

function handleChange(event){
    const search = event.target.value;
    handleSearchPosts(search);
}

function handleSearchPosts(search){
    setSearch(search);
}

function userButton(){
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined){
        navigate("/login");
        console.log("Login first");
    } else {
        console.log("Account page");
        navigate("/accountPage");
        
    }
}

useEffect(() => {
    inputRef.current.focus();
}, [search]);


const SearchField = () => {
    let input;
    if(window.location.pathname === "/accountPage" || window.location.pathname === "/thread/"+params.id || window.location.pathname === "/user/"+params.id || window.location.pathname === "/createthread") {
        input = null;
    } else {
        input = <input type="search" placeholder="Search..." value={search} ref={inputRef} onChange={handleChange} />;
    }

    return (
        <div>
            {input}
        </div>
    );
};

return (    
        <NavStyle>
            <Logo src="/fulllogo.svg" alt="Logo" onClick={() => {navigate("/home")}} />
                <SearchWrapper >
                    <SearchField />
                </SearchWrapper>
                <Buttons>
                    <button onClick={() => {navigate(-1)}}>Go back</button>
                    <MainNav />
                    <button onClick={userButton}>
                        <img src="/user.svg" alt="user" />
                    </button>
                </Buttons>
        </NavStyle>
);
}