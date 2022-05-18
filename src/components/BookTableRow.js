import { useContext, useState } from "react";
import BooksContext from "../context/BooksContext";
import { Backdrop, Fade, IconButton, Modal } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import { BoxModalFormStyled } from "./Main.styled";
import { height } from "@mui/system";

const BookTableRow = ({ book, id, name, pages, publication, description }) => {
  const { setBookToEdit, deleteBook } = useContext(BooksContext);
  const [openAddBook, setOpenAddBook] = useState(false);
  let navigate = useNavigate();

  const handleCloseModal = ()  => setOpenAddBook(false);

  const handleClick = () => {
      setBookToEdit(book)
      setOpenAddBook(true)
  }

  return (
    <>
        <tr>
        <td className="td1">{name}</td>
        <td className="td2">{pages}</td>
        <td className="td3">{publication.trim().slice(0, 10)}</td>
        <td className="td4">
            {description.length < 180
            ? description
            : `${description.trim().slice(0, 180)}...`}
        </td>
        <td className="td5">
            <IconButton fontSize='small' onClick={handleClick}>
            <Edit sx={{ color: "#29a645" }} />
            </IconButton>
            <IconButton fontSize='small' onClick={() => deleteBook(id)}>
            <Delete size='inherit' sx={{ color: "#dd3545" }} />
            </IconButton>
            <IconButton fontSize='small' onClick={() => navigate(`/book/${id}`)}>
            <RemoveRedEyeIcon sx={{ color: "#6d757d" }} />
            </IconButton>
        </td>
        </tr>
        <Modal
            open={openAddBook}
            onClose={handleCloseModal}
            aria-labelledby="parent-modal-title"
            aria-describedby='parent-modal-description'
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={openAddBook}>
                <BoxModalFormStyled>
                    <BookForm/>
            </BoxModalFormStyled>
            </Fade>
            </Modal>
    </>
  );
};

export default BookTableRow;
