import React, { useContext, useEffect, useRef, useState } from 'react'
import BooksContext from '../../context/BooksContext'
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { MaterialTableStyled } from './BookTable.styled'
import { createTheme, ThemeProvider } from '@mui/material'
import BookTableModal from '../BookTableModal/BookTableModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const columns = [
    {field: 'name', title: 'Name'},
    {
        field: 'description',
        title: 'Description',
        render: (rowData) => rowData.description.length < 180
            ? rowData.description
            : `${rowData.description.trim().slice(0, 180)}...`
    },
    {field: 'pages', title: 'Pages'},
    {
        field: 'publicationDate',
        title: 'Publication Date',
        render: (rowData) => rowData.publicationDate.trim().slice(0, 10)
    },
]

const BookTable = () => {
    const {books, setBooks, setFilteredBooks, loading, setError, setLoading, deleteBook} = useContext(BooksContext)
    const [tableLoading, setTableLoading] = useState(false)
    const [openFormModal, setOpenFormModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const tableRef = useRef();
    let navigate = useNavigate();

    useEffect(() => {
      setTableLoading(loading)
    }, [loading])

    useEffect(() => {
        if (books.length === 0) {
            setLoading(true);
            axios
                .get()
                .then((res) => {
                    const booksData = res.data.books;
        
                    setBooks(booksData);
                    setFilteredBooks(booksData);
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
        } else {
            return
        }
    }, []);

    const formModalOpen = (rowData) => {
        setOpenFormModal(true)
        setSelectedRow(rowData)
    }
    
    const themeTable = createTheme({
        root : { 
            border: 0,
        },  
        palette: {
            primary: {
                main: '#3f53b5',
            },
            secondary: {
                main: '#3f53b5',
            }
        },
    })
    
    const options = {
        paging: false,
        isLoading: true,
        search: true,
        loadingType: 'overlay',
        searchFieldAlignment: 'left',
        actionsColumnIndex: -1,
        thirdSortClick: false,
        headerStyle : {
            backgroundColor: themeTable.palette.primary.main,
            color: '#fff',
            padding: 16,
        },
        rowStyle: (data, idx) => idx%2 !== 0 ? {
            backgroundColor: '#fafafa',
            padding: '2px',
            borderBottomWidth: '0px',
            fontSize: '0.8em'
        } : {
            backgroundColor: '#fff',
            borderBottomWidth: '0px',
            padding: '2px',
            fontSize: '0.8em'
        },
    }

    return (
        <>
            <ThemeProvider theme={themeTable}>
                <MaterialTableStyled
                title={''}
                data={books}
                columns={columns}
                isLoading={tableLoading}
                tableRef={tableRef}
                actions={[
                    {
                        icon: () => <Edit style={{width: '20px', color: '#29a645'}}/>,
                        tooltip: 'Edit Book',
                        onClick: (_, rowData) => formModalOpen(rowData)
                    },
                    {
                        icon: () => <Delete style={{width: '20px', color: '#dd3545'}}/>,
                        tooltip: 'Delete Book',
                        onClick: (_, rowData) => deleteBook(rowData.id)
                    },
                    {
                        icon: () => <RemoveRedEye style={{width: '20px', color: '#6d757d'}}/>,
                        tooltip: 'See Book',
                        onClick: (_, rowData) => navigate(`/book/${rowData.id}`)
                    },
                ]}
                options={options}
                >
                </MaterialTableStyled>
            </ThemeProvider>
            <BookTableModal open={openFormModal} setOpen={setOpenFormModal} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
        </>
    )
}

export default BookTable