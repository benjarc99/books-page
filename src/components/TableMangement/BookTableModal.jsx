import { Backdrop, Fade, Modal } from '@mui/material'
import BookForm from '../BookForm';
import {makeStyles} from "@mui/styles";


 const useStyles  = makeStyles({
     modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        maxWidth: 1000,
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        zIndex: 1060,
    },
    backdrop: {
        zIndex: 1111,
        color: '#fff',
    },
}) 
const BookTableModal = ({open, setOpen, selectedRow, setSelectedRow}) => {
    const classes = useStyles();

  const handleCloseModal = ()  => setOpen(false);

  return (
    <div>
        <Modal
          open={open}
          className={classes.modal}
          onClose={handleCloseModal}
          aria-labelledby="parent-modal-title"
          aria-describedby='parent-modal-description'
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={classes.paper}>
                <BookForm/>
            </div>
        </Fade>
        </Modal>
    </div>
  )
}

export default BookTableModal