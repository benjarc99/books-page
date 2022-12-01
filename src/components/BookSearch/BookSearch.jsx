import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BookSearch = ({ search, handleSearch }) => {

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleClick = () => {
    handleSearch("");
  };

  return (
    <div className="row">
        <div className="col-8 col-md-3">
            <TextField className="w-100" clid="standard-basic" placeholder="Name or Description" label="Search" variant="standard" onChange={handleChange} value={search || ''}
            InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton onClick={()=> handleClick()}><CloseIcon style={{cursor:'pointer'}}/></IconButton></InputAdornment>,
            }}/>
        </div>
    </div>
  );
};

export default BookSearch;