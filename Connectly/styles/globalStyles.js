import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        
        --grey: #c3c3c3;
        --light-grey: #D9D9D9;
        --grey-hover: #f2f2f2;

        --white: #ffffff;
        --offwhite: #d8d8d8;

        --blue: #2271D2;
        --blue-hover: #1b5aa8;

        --background: #f2f2f2
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
    
    h1, h2, h3, h4, h5, h6, button {
    font-family: 'StabilGrotesk-bold', sans-serif;
}

    body{
        background-color: var(--background);
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