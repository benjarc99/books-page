import React, { useState, useEffect, useContext } from "react";
import BookCards from "../components/BookCards/BookCards";
import BookInput from "../components/BookSearch/BookSearch";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message";
import Grid from "@mui/material/Grid";
import BooksContext from "../context/BooksContext";

const Home = () => {
  const [search, setSearch] = useState(null);
  const { books, filteredBooks, setFilteredBooks, error, loading } =
    useContext(BooksContext);

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
      <BookInput handleSearch={handleSearch} />
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
