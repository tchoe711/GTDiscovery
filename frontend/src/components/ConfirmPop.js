import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios'

export default function AlertDialog(inputs) {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  console.log((inputs.children)[1])
  console.log((inputs.children)[2])
  console.log((inputs.children)[3])
  console.log((inputs.children)[4])
  console.log((inputs.children)[5])

  const handleClickOpen = () => {
    if ((inputs.children)[1] === '' || (inputs.children)[2] === '' || (inputs.children)[3] === '' ||
        (inputs.children)[4] === '' || (inputs.children)[5] === '') {
        setOpenError(true);
    } else {
        setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
  };

  const updateEvent = () => {
    Axios.post("http://localhost:3001/update", {
        id: (inputs.children)[0],
        title: (inputs.children)[1],
        description: (inputs.children)[2],
        location: (inputs.children)[3],
        time: (inputs.children)[4],
        date: (inputs.children)[5],
        lat: (inputs.children)[6],
        lng: (inputs.children)[7],
        invite: (inputs.children)[8],
        timenum: (inputs.children)[9],
        datenum: (inputs.children)[10],
    }).then(
        window.location.href = "http://localhost:3000/home"
    );
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update youre event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={updateEvent} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Invalid Inputs!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}