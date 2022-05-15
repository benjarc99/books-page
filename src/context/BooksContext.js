import axios from "axios";
import { createContext, useState, useEffect } from "react";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get()
      .then((res) => {
        const booksData = res.data.books;

        setBooks(booksData);
        setFilteredBooks(booksData);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        const objError = {
          error: true,
          status: err.status,
          statusText: err.statusText,
        };

        setError(true);
        setLoading(false);
        console.log(objError);
      });
  }, []);

  const createBook = (data) => {
    setLoading(true);
    const url = "/api/books/new";

    axios({
      method: "post",
      url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((res) => {
        const newBookData = res.data.book;

        setBooks([...books, newBookData]);
        setFilteredBooks([...books, newBookData]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateBook = (data) => {
    setLoading(true);
    let id = data.id;
    const url = `/api/books/${id}`;

    axios({
      method: "put",
      url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((res) => {
        let newBooks = books.map((book) => (book.id === data.id ? data : book));

        setBooks(newBooks);
        setFilteredBooks(newBooks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteBook = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registros con el id ${id}?`
    );

    if (isDelete) {
      const url = `/api/books/${id}`;
      axios({
        method: "delete",
        url,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          let newBooks = books.filter((book) => book.id !== id);

          setBooks(newBooks);
          setFilteredBooks(newBooks);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const data = {
    books,
    setBooks,
    filteredBooks,
    setFilteredBooks,
    bookToEdit,
    setBookToEdit,
    createBook,
    updateBook,
    deleteBook,
    error,
    loading,
  };

  return <BooksContext.Provider value={data}>{children}</BooksContext.Provider>;
};

export { BooksProvider };
export default BooksContext;
