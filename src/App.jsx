import React from "react";
import MainRoutes from "./components/MainRoutes";
import axios from "axios";
import { BooksProvider } from "./context/BooksContext";
import MenuBar from "./components/MenuBar/MenuBar";

let key = process.env.REACT_APP_KEY;
let urlApi = process.env.REACT_APP_URL;

axios.defaults.headers.common["x-token"] = key;
axios.defaults.baseURL = `${urlApi}/api/books`;

function App() {
  return (
    <>
        <MenuBar/>
        <main>
            <BooksProvider>
            <MainRoutes />
            </BooksProvider>
        </main>
        <footer>
            <p style={{ color: "#fff", fontSize: "12px" }}>
            Hecho por 💜 benjarc99
            </p>
        </footer>
    </>
  );
}

export default App;
