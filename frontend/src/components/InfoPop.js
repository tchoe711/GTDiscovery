import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios'

export default function GetInfo(id) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocatino] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");
  const [host, setHost] = React.useState("");

  const openInfo = () => {
    Axios.post('http://localhost:3001/getd', {
        identity: id.children,
    }).then((response) => {
        setTitle(response.data[0].title)
        setDescription(response.data[0].description)
        setLocatino(response.data[0].location)
        setTime(response.data[0].time)
        setDate(response.data[0].date)
        setHost(response.data[0].host)
        setOpen(true);
    });
}

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={openInfo}>
       Information
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Title: {title}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
              Description: {description}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
              Location: {location}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
              Time: {time}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
              Date: {date}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
              Host: {host}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}