import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import BooksContext from "../../context/BooksContext";
import { ButtonStyled } from "./SeeMoreBook.styled";

const SeeMoreBook = () => {
  const { bookId } = useParams();
  const { books, error, setError, loading, setLoading } = useContext(BooksContext);
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
        if(books.length !== 0) {
            const currentBook = books.filter((book) => book.id === bookId);
            setBook(currentBook[0]);
        }
        else {
            setLoading(true)
            let url = `${bookId}`;
            axios
                .get(url)
                .then(({data}) => {
                    setBook(data.book);
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
                })
        } 
  }, []);

  return (
    <>
      {loading && <Loader marginTop="30px" />}
      {error && (
        <Message
          msg="Ocurrió un error, intentelo nuevamente"
          bgColor="#dc3545"
        />
      )}
      {book.length !== 0 && (
        <div className="row">
            <div className="row">
              <div className="col">
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
                        <span>{` ${book?.publicationDate?.slice(0, 10)}`}</span>
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