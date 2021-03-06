import axios from "axios";
import { createContext, useState } from "react";
import Swal from "sweetalert2";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

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
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your book has been created successfully',
            showConfirmButton: false,
            timer: 2500
        })
      })
      .catch((err) => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            html: `${err.message}`,
            showConfirmButton: true,
        })
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
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your book has been updated',
            showConfirmButton: false,
            timer: 2500
        })
      })
      .catch((err) => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            html: `${err.message}`,
            showConfirmButton: true,
        })
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
                Swal.fire(
                    'Deleted!',
                    'Your book has been deleted.',
                    'success'
                )
            })
            .catch((err) => {
                Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                html: `${err.msg}`,
                showConfirmButton: true,
                })
            });
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
    setError,
    loading,
    setLoading
  };

  return <BooksContext.Provider value={data}>{children}</BooksContext.Provider>;
};

export { BooksProvider };
export default BooksContext;