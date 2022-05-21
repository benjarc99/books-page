import { useContext, useState } from "react";
import BooksContext from "../context/BooksContext";
import BookTableRow from "./BookTableRow";
import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./BookTable.css";
import BookForm from "./BookForm";
import { BoxModalFormStyled } from "./Main.styled";

const BookTable = () => {
  const { books } = useContext(BooksContext);
  

  return (
    <>
      <div className="container-title-button-table">
        <h3>Table of Books</h3>
        <Button onClick={() => setOpenAddBook(true)} variant="contained" >
          <AddIcon fontSize="inherit" /> Add book
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="th1">Name</th>
            <th className="th2">Pages</th>
            <th className="th3">Publication Date</th>
            <th className="th4">Description</th>
            <th className="th5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={5}>Tabla sin datos</td>
            </tr>
          ) : (
            books.map((book, index) => (
              <BookTableRow
                key={index}
                book={book}
                id={book.id}
                name={book.name}
                pages={book.pages}
                publication={book.publicationDate}
                description={book.description}
              />
            ))
          )}
        </tbody>
      </table>
      
    </>
  );
};



export default BookTable;


            /*<Fade in={openAddBook}>
                <div className={classes.paper}>
                    <div className='row' >
                        <div className='modal-header headerModal d-flex align-items-center'>
                            <div className='col-9'>
                                <h5 className='modal-title w-100'>Total Breakdown</h5>
                            </div>
                            <div className='col-1 d-flex justify-content-end'>
                                <Button tabIndex={-1} className='btn-close p-0' style={{ minWidth: '30px', maxWidth: '30px' }} color='default' onClick={() => handleCoseModal()}>
                                    <CloseIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                    {loading
                        ? <div className='d-flex justify-content-center'>
                            <CircularProgress />
                        </div>
                        : <>
                            <div className='row mt-2'>
                                <div className='col-12 px-2 text-center'>
                                    <p>BOL# {selectedRow.BOLNumber} </p>
                                    <h5>{title}</h5>
                                    <h5 class='font-bold'>{subTitle}</h5>
                                </div>
                            </div>
                            <div className='row'>
                                {
                                    <MaterialTable
                                        title=''
                                        isLoading={loading}
                                        columns={columns}
                                        options={options}
                                        data={data}
                                    />
                                }
                            </div>
                        </>
                    }
                    <div className='row mt-2'>
                        <div className='col-12 d-flex justify-content-end'>
                            <Button variant='contained' onClick={() => handleCoseModal()}>Close</Button>
                        </div>
                    </div>
                </div>
            </Fade> */
