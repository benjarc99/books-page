import { CircularProgress, IconButton, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import BooksContext from "../../context/BooksContext";
import { useFormik } from 'formik';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonCleanStyled, ButtonSendStyled } from './BookForm.styled';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";


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
    const {createBook, updateBook, loading, setLoading } = useContext(BooksContext);
    const [bookToEdit] = useState({
        name: selectedRow?.name,
        description: selectedRow?.description,
        pages: selectedRow?.pages,
        publicationDate: new Date(selectedRow?.publicationDate?.slice(0,10)+' 09:00:00'),
        excerpt: selectedRow?.excerpt,
        image: selectedRow?.image,
        id: selectedRow?.id
    })

    // use without formik 
    /* const [form, setForm] = useState(initialForm);
    const [emptyForm, setEmptyForm] = useState(false); */

    const validationSchema = yup.object({
        name: yup 
            .string('Enter a name')
            .required('Name is required')
            .matches(/^[aA-zZ\d\sñÑ.,:-]+$/, "Only letters, numbers and (. , : -) are allowed for this field"),
        description: yup
            .string('Enter a description')
            .required('Description is required')
            .matches(/^[aA-zZ\d\sñÑ.,:-]+$/, "Only letters, numbers and (. , : -) are allowed for this field"),
        pages: yup
            .number('Enter the pages')
            .required('Pages is required')
            .test('len', 'Maximum of 5 characters', val => !val || (val && val.toString().length <= 5)),
        publicationDate: yup
            .date('').required('Publication Date is required'),
        excerpt: yup
            .string('Enter a excerpt')
            .required('Excerpt is required')
            .matches(/^[aA-zZ\d\sñÑ.,:-]+$/, "Only letters, numbers and (. , : -) are allowed for this field"),
        image: yup 
            .string('Enter a url image')
            .url('Url image was expected')
            .required('Url image is required'),
    }); 

    const formik = useFormik({
        initialValues: bookToEdit?.name ? bookToEdit : initialForm,
        validationSchema: validationSchema,
        onSubmit: (values) => {
             if(values?.id){
                updateBook({...values, publicationDate: format(values?.publicationDate, 'yyyy-MM-dd')})
            } else {
                createBook(values)
                formik.handleReset();
                formik.setFieldValue('publicationDate', '')
            }
        },
    });

    const handleCloseForm = () => {
        setOpen(false)
        if(selectedRow) setSelectedRow({})
        setLoading(false)
        //setEmptyForm(false)
    }

    // use without formik 
    /* useEffect(() => {
        if (bookToEdit.name) {
            setForm(bookToEdit);
        } else {
            setForm(initialForm);
        }     
    }, [bookToEdit]) */
  
    /* const handleSubmit = (e) => {
        e.preventDefault()
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
    }; */

    /*  const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }; */

    /* const handleReset = () => {
        //setForm(initialForm)
    }; */

    return (
        <> 
            <div className="row">
                <div className="col-5 col-md-3">
                    <h4 style={{textDecoration:'underline', color:'#3f53b5'}}>
                        {selectedRow ? 'Edit Book' : 'Add Book'}
                    </h4>
                </div>
                <div className="col col-md-9 d-flex justify-content-end pr-0">
                    <IconButton onClick={() => handleCloseForm ()}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-12 d-grid mt-2">
                        <TextField 
                        name="name"
                        label="Name"
                        color="primary"
                        type="text"
                        variant="outlined" 
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name} 
                        autoComplete="off"/>
                    </div>
                    <div className="col-12 d-grid mt-2">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            name="publicationDate"
                            label="Publication Date"
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} error={formik.touched.publicationDate && Boolean(formik.errors.publicationDate)}/>}
                            value={formik.values.publicationDate || ''} 
                            onChange={(value) => formik.setFieldValue('publicationDate', value)}
                            />
                            {formik.touched.publicationDate && formik.errors.publicationDate && <small className="text-danger" style={{marginLeft: '14px', fontSize: '75%'}} >
                                {(formik.errors.publicationDate === 'publicationDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `NaN`).' && 'Invalid Date') || 
                                (formik.errors.publicationDate === 'Publication Date is required' && 'Publication Date is required')}
                            </small>}
                        </LocalizationProvider>
                        {/* <TextField name="publicationDate" label="Publication Date" color="primary" type="date" InputLabelProps={{shrink: true}} inputProps={{max: format(new Date(), 'yyyy-MM-dd')}} 
                        onChange={formik.handleChange} value={formik.values.publicationDate} 
                        error={formik.touched.publicationDate && Boolean(formik.errors.publicationDate)}
                        helperText={formik.touched.publicationDate && formik.errors.publicationDate} autoComplete="off"/> */}
                    </div>
                    <div className="col-12 d-grid mt-2">
                        <TextField 
                        name="pages"
                        label="Pages"
                        color="primary"
                        variant="outlined"
                        type="number"
                        onChange={formik.handleChange} 
                        value={formik.values.pages} 
                        /*inputProps={{max: 99999}}*/ 
                        error={formik.touched.pages && Boolean(formik.errors.pages)}
                        helperText={formik.touched.pages && formik.errors.pages} 
                        autoComplete="off"/>
                    </div>
                    <div className="col-12 d-grid mt-2">
                        <TextField 
                        name="image"
                        label="Url Image"
                        color="primary"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        error={formik.touched.image && Boolean(formik.errors.image)}
                        helperText={formik.touched.image && formik.errors.image} autoComplete="off"/>
                    </div>
                    <div className="col-12 d-grid mt-2">
                        <TextField 
                            className="w-100"
                            name="description"
                            label="Description"
                            color="primary"
                            variant="outlined"
                            multiline={true} maxRows={4} minRows={4}
                            onChange={formik.handleChange} 
                            value={formik.values.description} 
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description} autoComplete="off"
                        />
                    </div>
                    <div className="col-12 d-grid mt-2">
                        <TextField
                            className="w-100"
                            name="excerpt"
                            label="Excerpt"
                            onChange={formik.handleChange}
                            multiline={true} maxRows={4} minRows={4}
                            value={formik.values.excerpt}
                            error={formik.touched.excerpt && Boolean(formik.errors.excerpt)}
                            helperText={formik.touched.excerpt && formik.errors.excerpt} autoComplete="off"
                        />
                    </div>
                </div>
                <div className="row d-flex flex-column align-items-center mt-1">
                    {!selectedRow && <div className="col-4 d-flex justify-content-center mb-1">
                        <ButtonCleanStyled className="mb-1" onClick={() => formik.handleReset}>Clean</ButtonCleanStyled>
                    </div>}
                    <div className="col-4 text-center">
                        <ButtonSendStyled className="w-100 py-2" type="submit" >
                            Send {loading && <CircularProgress size={20} style={{color: 'white', marginLeft: '10px'}}/>}
                        </ButtonSendStyled>
                        {/* { emptyForm && <span style={{color: '#d53', fontSize: '14px'}}>
                            All the fields are required
                        </span> } */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default BookForm;


/*
    // formik (old code)
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