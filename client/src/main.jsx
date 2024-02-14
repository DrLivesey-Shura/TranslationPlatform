import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import backgroundSvg from "./assets/background.svg";
import { mode } from "@chakra-ui/theme-tools";
import { FileProvider } from "./Context/FileContext.jsx";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("transparent", "darkColor")(props),
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: "cover",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <FileProvider>
        <App />
      </FileProvider>
    </ChakraProvider>
  </React.StrictMode>
);
