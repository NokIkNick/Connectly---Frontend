import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import NewPostForm from "../components/NewPostForm";

export const Mainpage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };



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

    //out-comment border below to better see layout.
    const Column = styled.div`
        flex: 1;
        padding: 20px;
        //border: 1px solid black;
        margin: 0 5px;
    `;

    const FeedAndCategories = styled(Column)`
    flex: 0.5;
    height: 80vh;
    overflow-y: auto;
    scrollbar-width: none;
        @media (max-width: 1000px) {
            display: none;
        }
    `;

    const Feed = styled(Column)`
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
        flex: 0.5;
        @media (max-width: 520px) {
            display: none;
        }
    `;

    const FACButton = styled.button`
        font-weight: bold;
        margin: 20px 0;
        background-color: var(--background);
        display: block;
        width: 100%;
        border: 2px var(--blue) solid;
        color: var(--);
        font-size: 1.4rem;
        border-radius: 10px;
        padding: 20px 20px;
        cursor: pointer;
        &:hover {
            background-color: var(--blue);
        }
    `;

    const AD = styled.div`
        width: 100%;
        height: 40%;
        background-color: var(--light-grey);
        padding: 20px 20px;
        border-radius: 10px;
        margin: 20px 0;
    `;

    const InputBox = styled.div`
        display: flex;
        flex-direction: row; /* Changed from column to row */
        align-items: center; /* Align items vertically in the center */
        background-color: var(--white);
        border-radius: 10px;
        padding: 10px; /* Added padding for better spacing */
    `;

    const ProfilePicture = styled.div`
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 20px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    `;

    const TextArea = styled.input `
        width: 100%;
        padding: 20px;
        margin: 20px 0;
        border-radius: 50px;
        font-size: 1.2rem;
        background-color: var(--background);
        border: none;
    `;

    


    //comments from anders
    // default FACButton should be 'active' when page is loaded and loaded with that 'feed'
    const userName = "John Doe"; // Replace with dynamic user name if available

    return (
        <>
            <Standinnavbar>
                <h1>this is a stand-in for a navbar</h1>
            </Standinnavbar>
            <Container>
                <FeedAndCategories>
                    <h2>Refine feed </h2>
                    <FACButton>Family</FACButton>
                    <FACButton>Friends</FACButton>
                    <FACButton>Work</FACButton>
                    <FACButton>'Default'</FACButton>

                    <h2>CATEGORIES</h2>
                    <FACButton>Category 1</FACButton>
                    <FACButton>Category 2</FACButton>
                    <FACButton>Category 3</FACButton>
                </FeedAndCategories>

                <Feed>
                    <InputBox>
                        <ProfilePicture><img src="/user-svgrepo-com.svg" alt="" /> </ProfilePicture>
                        <TextArea
                            type="text"
                            placeholder={`What's on your mind, ${userName}?`}
                            onFocus={handleOpenModal}
                        />
                    </InputBox>

                    <h2>Feed here </h2>
                </Feed>

                <Ads>
                    <AD>
                        <h2>AD</h2>
                    </AD>
                    <AD>
                        <h2>AD2</h2>
                    </AD>
                </Ads>
            </Container>

            <Modal show={showModal} onClose={handleCloseModal}>
                <NewPostForm />
            </Modal>
        </>
    );
};

export default Mainpage;