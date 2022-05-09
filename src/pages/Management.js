import { useContext } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
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
        <article className="main-container-books-edit">
          <div className="books-edit-form" id="book-form">
            <BookForm />
          </div>
          <div className="books-edit-list">
            <BookTable />
          </div>
        </article>
      )}
    </>
  );
};

export default Management;
