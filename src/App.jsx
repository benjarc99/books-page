import MainRoutes from "./components/MainRoutes";
import axios from "axios";
import { BooksProvider } from "./context/BooksContext";
import MenuBar from "./components/MenuBar/MenuBar"
import { createTheme, ThemeProvider } from '@mui/material'

let key = process.env.REACT_APP_KEY;
let urlApi = process.env.REACT_APP_URL;

axios.defaults.headers.common["x-token"] = key;
axios.defaults.baseURL = `${urlApi}/api/books`;

function App() {
    const muiTheme = createTheme({
        palette: {
            primary: {
                main: "#3f52b5",
            },
        }
    }) 

    return (
        <> 
            <ThemeProvider theme={muiTheme}>
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
            </ThemeProvider>
        </>
    );
}

export default App;
