import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const url = "new";

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
    const url = `${id}`;

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            const url = `${id}`;
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
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
        })
    };

  const data = {
    books,
    setBooks,
    filteredBooks,
    setFilteredBooks,
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