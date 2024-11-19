import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Mainpage = () => {
    
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
        @media (max-width: 768px) {
            flex: 1;
        }
    `;

    const FACButton = styled.button`
        margin: 20px 0;
        background-color: var(--offwhite);
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
        background-color: var(--offwhite);
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


    return (
        <>
            <Standinnavbar>
                <h1>this is a stand-in for a navbar</h1>
            </Standinnavbar>
            <Container>
                <FeedAndCategories>
                    <h2>FEED </h2>
                    <FACButton>Family</FACButton>
                    <FACButton>Friends</FACButton>
                    <FACButton>Work</FACButton>

                    <h2>CATEGORIES</h2>
                    <CButton>Category 1</CButton>
                    <CButton>Category 2</CButton>
                    <CButton>Category 3</CButton>
                </FeedAndCategories>

                <Feed>
                    <h2>Search results</h2>
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
        </>
    );
};

export default Mainpage;