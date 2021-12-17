import { createGlobalStyle } from "styled-components";
import media from "styled-media-query";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  /* HTML elements */
  
  *,
  :after,
  :before {
    margin: 0;
    box-sizing: border-box;
    line-height: var(---lineHeight-normal);
  }

  html {
    font-size: var(--fontSize-root--big);
    font-family: var(--fontFamily);
    color: var(--color-black);
    background-color: var(--color-white);
    
    ${media.lessThan("medium")`
      font-size: var(--fontSize-root--small);
    `}

    * {
      /* 스크롤 바 제거 */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
      }
    }
  }

  button, input, textarea {
    padding: 0;
    border: none;
    outline: none;
    background-color: inherit;
  }

  input, textarea {
    font-family: var(--fontFamily);
    color: var(--color-black);
    font-size: unset;
  }

  button {
    cursor: pointer;
    :active,
    :hover,
    :focus {
      outline: none;
    }
    :disabled {
      cursor: not-allowed;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  th {
    font-weight: normal;
    text-align: unset;
  }

  /* CSS Custom Properties Definitions */

  @font-face {
    font-family: Interop-Light;
    src: url('../fonts/Interop-Light.woff') format('woff'), url('../fonts/Interop-Light.woff2') format('woff2'), url('../fonts/Interop-ExtraLight.otf') format('opentype');
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-Regular;
    src: url('../fonts/Interop-Regular.woff') format('woff'), url('../fonts/Interop-Regular.woff2') format('woff2'), url('../fonts/Interop-Light.otf') format('opentype');
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-Medium;
    src: url('../fonts/Interop-Medium.woff') format('woff'), url('../fonts/Interop-Medium.woff2') format('woff2'), url('../fonts/Interop-Regular.otf') format('opentype');
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-SemiBold;
    src: url('../fonts/Interop-SemiBold.woff') format('woff'), url('../fonts/Interop-SemiBold.woff2') format('woff2'), url('../fonts/Interop-Medium.otf') format('opentype');
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-Bold;
    src: url('../fonts/Interop-Bold.woff') format('woff'), url('../fonts/Interop-Bold.woff2') format('woff2'), url('../fonts/Interop-SemiBold.otf') format('opentype');
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-ExtraBold;
    src: url('../fonts/Interop-ExtraBold.woff') format('woff'), url('../fonts/Interop-ExtraBold.woff2') format('woff2'), url('../fonts/Interop-ExtraBold.otf') format('opentype');
    unicode-range: U+0000-U+FFFF;
  }

  :root {
    --fontFamily: Interop-Medium, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --fontSize-root--big: 16px;
    --fontSize-root--small: 14px;
    --lineHeight-normal: 1;
    --lineHeight-loose: 1.25;
    --lineHeight-relaxed: 1.5;
    --color-red: #F07884;
    --color-palered: #FAE6EB;
    --color-lightred: #F8D0D7;
    --color-green: #40DAAC;
    --color-palegreen: #E0F7F3;
    --color-lightgreen: #C4F2E6;
    --color-blue: #3E7DF6;
    --color-paleblue: #E0E9FE;
    --color-lightblue: #C3D6FC;
    --color-black: #3A3A42;
    --color-darkgray: #62626A;
    --color-gray: #919196;
    --color-lightgray: #DCDCE0;
    --color-palegray: #EEF2F6;
    --color-darkwhite: #F6F6FA;
    --color-white: #FCFCFF;
    --color-shadow: #1D1D2133;
    --color-modalbg: #1D1D21E5;
  }
`;

export default GlobalStyle;
