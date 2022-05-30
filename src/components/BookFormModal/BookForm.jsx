import { CircularProgress, IconButton, TextareaAutosize, TextField } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import BooksContext from "../../context/BooksContext";
import { FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonCleanStyled, ButtonSendStyled } from './BookForm.styled';

const initialForm = {
  name: "",
  description: "",
  pages: "",
  publicationDate: "",
  excerpt: "",
  image: "",
  id: null,
};

const BookForm = ({setOpen, selectedRow, setSelectedRow}) => {
  const {createBook, updateBook, loading } = useContext(BooksContext);
  const bookToEdit = {
    name: selectedRow?.name,
    description: selectedRow?.description,
    pages: selectedRow?.pages,
    publicationDate: selectedRow?.publicationDate,
    excerpt: selectedRow?.excerpt,
    image: selectedRow?.image,
    id: selectedRow?.id
  }

  const [form, setForm] = useState(initialForm);
  const [emptyForm, setEmptyForm] = useState(false);

  useEffect(() => {
    if (selectedRow) {
        setForm(bookToEdit);
    } else {
        setForm(initialForm);
    }     
  }, [selectedRow])
  

  const handleSubmit = () => {
    if(Object.values(form).some(value => value === '')){
        setEmptyForm(true);
        setTimeout(() => {
            setEmptyForm(false)
        }, 2500);
    } else {
        if (form.id === null) {
            createBook(form);
            setEmptyForm(false);
            handleReset();
        } else {
            updateBook(form);
            setEmptyForm(false);;
        }
    }

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm(initialForm)
  };

  const handleCloseForm = () => {
    setOpen(false)
    if (selectedRow) {
        setSelectedRow('')
    }
    setEmptyForm(false)
  }

  return (
    <> 
        <div className="row">
            <div className="col-5 col-md-3">
            <h4 style={{textDecoration:'underline', color:'#3f53b5'}}>{selectedRow ? 'Edit Book' : 'Add Book'}</h4>
            </div>
            <div className="col col-md-9 d-flex justify-content-end pr-0">
                <IconButton onClick={() => handleCloseForm ()}>
                    <CloseIcon/>
                </IconButton>
            </div>
        </div>
        <div className="row">
            <div className="col-12 d-grid my-2">
                    <FormControl>
                        <TextField name="name" label="Name" color="primary" variant="outlined" onChange={handleChange}
                        value={form.name} autoComplete="off"/>
                    </FormControl>
            </div>
            <div className="col-12 d-grid my-2">
                <FormControl>
                    <TextField name="publicationDate" label="Publication Date" color="primary" variant="outlined" onChange={handleChange}
                    value={form?.publicationDate?.trim().slice(0,10)} autoComplete="off"/>
                </FormControl>
            </div>
            <div className="col-12 d-grid my-2">
                <FormControl>
                    <TextField  name="pages" label="Pages" color="primary" variant="outlined" onChange={handleChange}
                    value={form.pages} autoComplete="off"/>
                </FormControl>
            </div>
            <div className="col-12 d-grid my-2">
                <FormControl>
                    <TextField  name="image" label="Url Image" color="primary" variant="outlined" onChange={handleChange}
                    value={form.image} autoComplete="off"/>
                </FormControl>
            </div>
            <div className="col-12 d-grid my-2">
            <FormControl>
                <TextareaAutosize
                    className="w-100 rounded"
                    style={{resize: 'none', padding: 15}}
                    name="description"
                    maxRows={4}
                    minRows={4}
                    variant="outlined"
                    placeholder="Description"
                    onChange={handleChange}
                    value={form.description}
                    autoComplete="off"
                />
            </FormControl>
            </div>
            <div className="col-12 d-grid my-2">
                <FormControl>
                    <TextareaAutosize
                        className="w-100"
                        style={{resize: 'none', padding: 15}}
                        name="excerpt"
                        maxRows={4}
                        minRows={4}
                        placeholder="Excerpt"
                        onChange={handleChange}
                        value={form.excerpt}
                        autoComplete="off"
                    />
                </FormControl>
            </div>
        </div>
        <div className="row d-flex flex-column align-items-center">    
            {!selectedRow && <div className="col-4 d-flex justify-content-center mb-1">
                <ButtonCleanStyled className="mb-1" onClick={() => handleReset()}>Clean</ButtonCleanStyled>
            </div>}
            <div className="col-4 text-center">
                <ButtonSendStyled className="w-100 py-2" onClick={() => handleSubmit()} >
                    Send {loading && <CircularProgress size={20} style={{color: 'white', marginLeft: '10px'}}/>}
                </ButtonSendStyled>
                { emptyForm && <span style={{color: '#d53', fontSize: '14px'}}>
                    All the fields are required    
                </span> }
            </div>
        </div>
    </>
  );
};

export default BookForm;


/*
    // formik
    const validationSchema = yup.object({
    name: yup 
        .string('Enter a name')
        .required('Name is required'),
    description: yup
        .string('Enter a description')
        .required('Description is required'),
    pages: yup
        .string('Enter the pages')
        .string().matches(/^[0-9]*$/)('Number was expected')
        .required('Pages is required'),
    publicationDate: yup
        .string('Enter a publication date')
        .string().matches(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/)('The format required is yyyy-mm-dd')
        .required('Publication Date is required'),
    excerpt: yup
        .string('Enter a excerpt')
        .required('Excerpt is required'),
    image: yup 
        .string('Enter a url image')
        .url('Url image was expected')
        .required('Url image is required'),
    });
*/