import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {

        /*Blues*/
        /*Background*/
        --blue: #2271D2;
        /*Accent Background*/
        --dark-blue: #1E453C;

        /*Whites*/
        /*Text*/
        --offwhite: #F2F2F2;
        /*Accents*/
        --eggshell: #F3F3E4;
        

        /*Blacks*/
        /*Text*/
        --grey: #404A4F;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Roboto', 'sans-serif';
        background-color: var(--offwhite);
    }
`;

export default GlobalStyles