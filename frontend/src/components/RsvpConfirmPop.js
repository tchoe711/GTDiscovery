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
  const [addcount, setAddCount] = React.useState(0);

  const handleClickOpen = () => {
    if ((id.children)[1] === "") {
        setOpenError(true);
    } else {
        if ((id.children)[1] === "Will Attend" || (id.children)[1] === "Maybe") {
          setAddCount(1);
        }
        setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
  };

  const rsvpEvent = async () => {
    Axios.post('http://localhost:3001/rsvpevent', {
            eventid: (id.children)[0],
            email: localStorage.getItem("login"),
            status: (id.children)[1], 
            date: (id.children)[3],
            time: (id.children)[4],
            conflict: "false",
        }).then(
          Axios.post('http://localhost:3001/checkconflict', {
            date: (id.children)[3],
            time: (id.children)[4],
            email: localStorage.getItem("login"),
            }).then((response) => {
              console.log('data')
              console.log(response.data.length)
                if (response.data.length > 1) {
                  Axios.post('http://localhost:3001/updateconflict', {
                    conflict: "true",
                    date: (id.children)[3],
                    time: (id.children)[4],
                    email: localStorage.getItem("login"),
                  })
                }
            })
        );

    await Axios.post('http://localhost:3001/updatecount', {
        id: (id.children)[0],
        count: (id.children)[2] + addcount,
    })
    window.location.href = "http://localhost:3000/home"
};

  return (
    <div>
      <Button onClick={handleClickOpen}>
        RSVP
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
          <Button onClick={rsvpEvent} autoFocus>
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
    </div>
  );
}