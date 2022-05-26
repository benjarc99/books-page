import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message";
import BooksContext from "../context/BooksContext";
import { ButtonStyled } from "./SeeMoreBook.styled";

const SeeMoreBook = () => {
  const { bookId } = useParams();
  const { books, error, loading } = useContext(BooksContext);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const currentBook = books.filter((book) => book.id === bookId);

  useEffect(() => {
    setBook(...currentBook);
  }, [currentBook]);

  return (
    <>
      {loading && <Loader marginTop="20px" />}
      {error && (
        <Message
          msg="Ocurrió un error, intentelo nuevamente"
          bgColor="#dc3545"
        />
      )}
      {book && (
        <div className="row">
            <div className="row">
              <div class="col">
                    <ButtonStyled className="btn btn-primary" onClick={() => navigate("/")}>&#8592; Back to Books</ButtonStyled>
              </div>
            </div>
            <div className="row my-3">
                <div className="col-3">
                    <img className="w-100" src={book.image} alt={book.name} />
                </div>
                <div className="col-9">
                    <h2 style={{color: '#3f63b5',textDecoration:'underline'}}>{book.name}</h2>
                    <p>{book.description}</p>
                    <p style={{textDecoration:'underline'}}>
                        Fecha de Publicación:
                        <span>{` ${book.publicationDate.slice(0, 10)}`}</span>
                    </p>
                    <p>
                        <span style={{color: '#8f8e8e', fontWeight: 'bold'}}>{`${book.pages} `}</span>pages
                    </p>
                </div>
            </div>
            <div className="row">
                <h2 style={{color: '#3f63b5',textDecoration:'underline'}}>Excerpt</h2>
                <p>{book.excerpt}</p>
            </div>
        </div>
      )}
    </>
  );
};

export default SeeMoreBook;

/* Sin Context API*/
/*
  // let url = `${process.env.REACT_APP_URL}/api/books/${bookId}`;
  let url = `https://mern-books-server.herokuapp.com/api/books/${bookId}`;
  let key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTdlY2I1YjczODdhMDAxNmY4MGVjMSIsIm5hbWUiOiJtYXRpYXNIZXJlZGlhIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNjUxMDEyMDA5LCJleHAiOjE2NTEwMTkyMDl9.0EROIgEld-HlXJx10cZXbtSnmke2yDoE6yiGoj_lylk";

  useEffect(() => {
    setLoading(true);
    const instance = axios.create();
    instance.defaults.baseURL = url;
    // instance.defaults.headers.common["x-token"] = process.env.REACT_APP_KEY;
    instance.defaults.headers.common["x-token"] = key;

    instance
      .get()
      .then((res) => {
        const bookData = res.data.book;

        setBook(bookData);
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
  }, [url]); 
*/
