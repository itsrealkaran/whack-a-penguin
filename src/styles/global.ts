import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html, body, #root {
    height: 100%;
    font-size: 16px;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${colors["green-100"]} ;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default GlobalStyle;
