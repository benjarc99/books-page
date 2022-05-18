import React, { useState, useContext, useEffect } from "react";
import BooksContext from "../context/BooksContext";
import "./BookForm.css";
import Loader from "./Loader";
// import Loader from "./Loader";

const initialForm = {
  name: "",
  description: "",
  pages: "",
  publicationDate: "",
  excerpt: "",
  image: "",
  id: null,
};

const BookForm = () => {
  const { bookToEdit, setBookToEdit, createBook, updateBook, loading } =
    useContext(BooksContext);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (bookToEdit) {
      setForm(bookToEdit);
    } else {
      setForm(initialForm);
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === null) {
      createBook(form);
    } else {
      updateBook(form);
    }

    handleReset();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm(initialForm);
    setBookToEdit(null);
  };

  return (
    <>
      <h3>{bookToEdit ? 'Edit Book' : 'Add Book'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          placeholder="Publication Date"
          name="publicationDate"
          required
          onChange={handleChange}
          value={form.publicationDate}
        />
        <input
          type="text"
          placeholder="Pages"
          name="pages"
          required
          onChange={handleChange}
          value={form.pages}
        />
        <input
          type="url"
          placeholder="Url Image"
          name="image"
          required
          onChange={handleChange}
          value={form.image}
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          required
          onChange={handleChange}
          value={form.description}
        />
        <textarea
          type="text"
          placeholder="Excerpt"
          name="excerpt"
          required
          onChange={handleChange}
          value={form.excerpt}
        />
        <input type="reset" value="Clean" onClick={handleReset} />
        <input type="submit" value="Send" />
      </form>
      <div>
        {loading && <Loader marginLeft="-2.5rem" />}
        {/* {error && (
          <p style={{ color: "#dc3545", textAlign: "center" }}>
            Ocurrió un error, intente nuevamente.
          </p>
        )} */}
      </div>
    </>
  );
};

export default BookForm;
