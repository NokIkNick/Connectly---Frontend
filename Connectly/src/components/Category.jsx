import React from "react";
import styled from "styled-components";

const FACButton = styled.button`
    margin: 10px 0;
    display: block;
    width: 100%;
    background-color: ${({ active }) => (active ? "var(--blue)" : "var(--offwhite)")};
    color: ${({ active }) => (active ? "white" : "var(--blue)")};
    border: 2px solid var(--blue);
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
`;

const Category = ({ name, active, onClick }) => (
    <FACButton active={active} onClick={() => onClick(name)}>
        {name}
    </FACButton>
);

export default Category;
