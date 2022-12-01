import React, { useState, useEffect, useContext } from "react";
import BookCards from "../../components/BookCards/BookCards";
import BookSearch from "../../components/BookSearch/BookSearch";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import Grid from "@mui/material/Grid";
import BooksContext from "../../context/BooksContext";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState(null);
  const { books, setBooks, filteredBooks, setFilteredBooks, error, setError, loading, setLoading } =
    useContext(BooksContext);

    useEffect(() => {
        if (books.length === 0) {
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
        } else return
    }, []);

    const handleSearch = (inputSearch) => {
        setSearch(inputSearch);
    };

    useEffect(() => {
        if (search === null) return;
        if (search === "") return setFilteredBooks(books);
        if (search !== "" && books) {
        const filterBooks = (book) => {
            if (book.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
            }
            if (book.description.toLowerCase().includes(search.toLowerCase())) {
            return true;
            }
        };

        const searchBooks = books.filter((book) => filterBooks(book));
        setFilteredBooks(searchBooks);
        }
    }, [search]);

  return (
    <>
        <BookSearch search={search} handleSearch={handleSearch} />
        {loading && <Loader marginTop="3rem" marginLeft="-3rem" />}
        {error && (
            <Message
            msg="Ocurrió un error, intentelo nuevamente"
            bgColor="#dc3545"
            marginTop="3rem"
            />
        )}
        <Grid sx={{ flexGrow: 1, marginTop: 0 }} container spacing={6}>
            {filteredBooks && <BookCards books={filteredBooks} />}
        </Grid>
    </>
  );
};

export default Home;
