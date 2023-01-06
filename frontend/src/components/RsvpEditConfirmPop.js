import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios'

export default function AlertDialog(id) {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openError1, setOpenError1] = React.useState(false);

  const handleClickOpen = () => {
    if ((id.children)[1] === "") {
        setOpenError(true);
    } else if (((id.children)[1] === "Will Attend" || (id.children)[1] === "Maybe") && (id.children)[3] >= 100) {
      setOpenError1(true)
    }else {
        setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    setOpenError1(false);
  };
  console.log((id.children)[0])
  console.log((id.children)[1])
  console.log((id.children)[2])
  console.log((id.children)[3])

  const updateRsvp = () => {
        Axios.post("http://localhost:3001/updatersvp", {
            rsvpid: (id.children)[0],
            status: (id.children)[1],
        })

        if ((id.children)[1] === "Will Attend" || (id.children)[1] === "Maybe") {
          Axios.post('http://localhost:3001/updatecount', {
              id: (id.children)[2],
              count: (id.children)[3] + 1,
          }).then(
              window.location.href = "http://localhost:3000/eventrsvp"
          );
        } else {
          Axios.post('http://localhost:3001/updatecount', {
              id: (id.children)[2],
              count: (id.children)[3] - 1,
          }).then(
              window.location.href = "http://localhost:3000/eventrsvp"
          );
  }
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
            Are you sure you want to RSVP for this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={updateRsvp} autoFocus>
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
            Select a status.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Capacity is full"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot change your RSVP status to Attend or Maybe.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}