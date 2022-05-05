import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useContext } from "react";
import BooksContext from "../context/BooksContext";

const BookTableRow = ({ book, id, name, pages, publication, description }) => {
  const { setBookToEdit, deleteBook } = useContext(BooksContext);
  const CustomizedButton = styled(Button)`
    height: 28px;
    width: 84px;
    background-color: #3f53b5;
    padding: 5px;
    color: #fff;

    :hover {
      background-color: #cad3ff;
      color: #3f53b5;
    }
  `;
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
        <button onClick={() => setBookToEdit(book)}>Edit</button>
        <button onClick={() => deleteBook(id)}>Delete</button>
      </td>
      <td className="td6">
        <CardActions sx={{ padding: 0 }}>
          <Link to={`/book/${id}`} style={{ textDecoration: "none" }}>
            <CustomizedButton size="small">See More</CustomizedButton>
          </Link>
        </CardActions>
      </td>
    </tr>
  );
};

export default BookTableRow;
