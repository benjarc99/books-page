import React from "react";
import BookCard from "./BookCard";

const BookCards = ({ books }) => {
  return (
    <>
      {books.map((book) => (
        <BookCard
          name={book.name}
          id={book.id}
          img={book.image}
          description={book.description}
          pages={book.pages}
          btn="See more"
          excerpt={book.excerpt}
          publicationDate={book.publicationDate}
          key={book.id}
          />
          ))}
    </>
  );
};

export default BookCards;
