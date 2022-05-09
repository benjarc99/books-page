import { useContext } from "react";
import BooksContext from "../context/BooksContext";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

const BookTableRow = ({ book, id, name, pages, publication, description }) => {
  const { setBookToEdit, deleteBook } = useContext(BooksContext);
  let navigate = useNavigate();

  return (
    <tr>
      <td className="td1">{name}</td>
      <td className="td2">{pages}</td>
      <td className="td3">{publication.trim().slice(0, 10)}</td>
      <td className="td4">
        {description.length < 99
          ? description
          : `${description.trim().slice(0, 99)}...`}
      </td>
      <td className="td5">
        <IconButton onClick={() => setBookToEdit(book)}>
          <Edit sx={{ width: 18, color: "#29a645" }} />
        </IconButton>
        <IconButton onClick={() => deleteBook(id)}>
          <Delete sx={{ width: 18, color: "#dd3545" }} />
        </IconButton>
        <IconButton onClick={() => navigate(`/book/${id}`)}>
          <RemoveRedEyeIcon
            sx={{ width: 18, color: "#6d757d" }}
          ></RemoveRedEyeIcon>
        </IconButton>
      </td>
    </tr>
  );
};

export default BookTableRow;
