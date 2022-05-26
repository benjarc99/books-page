import { useContext, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import BookTable from "../components/TableMangement/BookTable";
import Message from "../components/Message";
import BooksContext from "../context/BooksContext";
import { Button } from "@mui/material";
import BookTableModal from "../components/BookTableModal/BookTableModal";

const Management = () => {
  const { error } = useContext(BooksContext);
  const [openFormModal, setOpenFormModal] = useState(false)
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
                    <h3 style={{color:'#3f53b5', textDecoration: 'underline' }}>Table of Books</h3>
                    <Button color="primary" variant="contained" onClick={()=>setOpenFormModal(true)}>
                        <AddIcon style={{width: '16px'}} /> Add book
                    </Button>
                </div>
                <div className="col-12 p-0"><BookTable /></div>
          </div>
        )}
        <BookTableModal open={openFormModal} setOpen={setOpenFormModal}/>
    </>
  );
};

export default Management;
