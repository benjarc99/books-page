import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BookSearch = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(search);
  };

  const handleClick = () => {
    setSearch("");
    handleSearch("");
  };

  return (
    <div className="row">
        <div className="col-8 col-md-3">
            <TextField className="w-100" clid="standard-basic" placeholder="Name or Description" label="Search" variant="standard" onChange={handleChange} value={search}
            InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton onClick={()=> handleClick()}><CloseIcon style={{cursor:'pointer'}}/></IconButton></InputAdornment>,
            }}/>
        </div>
    </div>
  );
};

export default BookSearch;