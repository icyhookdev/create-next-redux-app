import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: sans-serif;
  }

  body {
    background: #f2f2f2;
    height: 100vh;
  }
`;

export default GlobalStyles;
