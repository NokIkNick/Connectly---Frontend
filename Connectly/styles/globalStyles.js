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
        --light-grey: #D9D9D9;
        ;

        --grey: #404A4F;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button{
        border-radius: 5px;
        cursor: pointer;
    }



    body{
        background-color: var(--offwhite);
        font-family: 'StabilGrotesk-regular', sans-serif;
    
    @font-face {
        font-family: 'StabilGrotesk-regular';
        src: url(./fonts/StabilGrotesk-Regular.woff) format('woff'), url(./website\src\fonts\StabilGrotesk-Regular.woff/StabilGrotesk-Regular.woff2) format('woff2');
    }

    @font-face {
        font-family: 'StabilGrotesk-bold';
        src: url(./fonts/StabilGrotesk-Bold.woff) format('woff'), url(./website\src\fonts\StabilGrotesk-Bold.woff/StabilGrotesk-Bold.woff2) format('woff2');
    }
    }
`;

export default GlobalStyles