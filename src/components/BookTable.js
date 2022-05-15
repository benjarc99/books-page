import { useContext } from "react";
import BooksContext from "../context/BooksContext";
import BookTableRow from "./BookTableRow";
import "./BookTable.css";

const BookTable = () => {
  const { books } = useContext(BooksContext);

  return (
    <>
      <h3>Table of Books</h3>
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
