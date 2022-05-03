import React, { useState, useEffect, useContext } from "react";
import BookCards from "../components/BookCards";
import BookInput from "../components/BookInput";
import Loader from "../components/Loader";
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
        />
      )}
      <Grid sx={{ flexGrow: 1, marginTop: 0 }} container spacing={6}>
        {filteredBooks && <BookCards books={filteredBooks} />}
      </Grid>
    </>
  );
};

export default Home;

/* Solicitud a API mediante helper con fetch */

/*
// const getBooks = async () => {
//   const options = {
//     headers: {
//       "x-token":
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTdlY2I1YjczODdhMDAxNmY4MGVjMSIsIm5hbWUiOiJtYXRpYXNIZXJlZGlhIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNjQ5ODY3NTU1LCJleHAiOjE2NDk4NzQ3NTV9.Z9IrZibcoBcJ6b3TF8t1JLTYfGwh73Z5HgchngT7bkM",
//     },
//   };
//   const booksRes = await helpHttp().get(url, options);

//   if (booksRes.err) {
//     setError(booksRes);
//     setLoading(false);
//   } else {
//     const booksData = booksRes.books;

//     setBooks(booksData);
//     setFilteredBooks(booksData);
//     setError(false);
//     setLoading(false);
//   }
// };
*/
