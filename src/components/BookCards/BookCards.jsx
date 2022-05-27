<<<<<<< HEAD:src/components/BookCards/BookCards.jsx
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
=======
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
>>>>>>> 7aafd6d2c242b638cfb804f0aaf63af76e2006cf:src/components/BookCards.js
