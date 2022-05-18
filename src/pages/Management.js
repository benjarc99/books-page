import { Button } from "@mui/material";
import { useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import BookTable from "../components/TableMangement/BookTable";
import Message from "../components/Message";
import BooksContext from "../context/BooksContext";
import "./Management.css";

const Management = () => {
  const { error } = useContext(BooksContext);
  return (
    <>
      {error ? (
        <Message
          msg="Ocurrió un error, intentelo nuevamente"
          bgColor="#dc3545"
          marginTop="20px"
        />
      ) : (
          <div className="col-12 d-flex-column p-0">
              <div className="col-12 d-flex justify-content-between mb-3 p-0">
                    <h3>Table of Books</h3>
                    <Button variant="contained" >
                    <AddIcon fontSize="inherit" /> Add book
                    </Button>
                </div>
                <div className="col-12 p-0"><BookTable /></div>
          </div>
        )}
    </>
  );
};

export default Management;
