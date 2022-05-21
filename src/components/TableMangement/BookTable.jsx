import React, { useContext, useEffect, useState } from 'react'
import BooksContext from '../../context/BooksContext'
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { MaterialTableStyled } from './BookTable.styled'
import { createTheme, ThemeProvider } from '@mui/material'
import BookTableModal from './BookTableModal'

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
    const {books , loading} = useContext(BooksContext)
    const [tableLoading, setTableLoading] = useState(false)
    const [openFormModal, setOpenFormModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({})

    useEffect(() => {
      setTableLoading(loading)
    }, [loading])
    
    
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
                actions={[
                    {
                        icon: () => <Edit style={{width: '20px', color: '#29a645'}}/>,
                        tooltip: 'Edit Book',
                        onClick: (_, rowData) => {
                            formModalOpen(rowData)
                        }
                    },
                    {
                        icon: () => <Delete style={{width: '20px', color: '#dd3545'}}/>,
                        tooltip: 'Delete Book',
                        onClick: (_, rowData) => {
                            /* formModalOpen(rowData) */
                        }
                    },
                    {
                        icon: () => <RemoveRedEye style={{width: '20px', color: '#6d757d'}}/>,
                        tooltip: 'See Book',
                        onClick: (_, rowData) => {
                            /* formModalOpen(rowData) */
                        }
                    },
                ]}
                options={options}
                >
                </MaterialTableStyled>
            </ThemeProvider>
            <BookTableModal open={openFormModal} setOpen={setOpenFormModal} selectedRow={selectedRow} setSelectedRow={setSelectedRow}/>
        </>
    )
}

export default BookTable