import React, { useState } from "react";
import "./BookInput.css";
import imgClose from "../imgs/icon-close.png";

const BookInput = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(search);
  };

  const handleClick = (e) => {
    setSearch("");
    handleSearch("");
  };

  return (
    <div className="container-input-search">
      <input
        type="text"
        id="input-search-book"
        placeholder="Name or Description"
        onChange={handleChange}
        value={search}
      />
      <figure onClick={handleClick}>
        <img src={imgClose} alt="close" />
      </figure>
    </div>
  );
};

export default BookInput;
