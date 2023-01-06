import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import RsvpConfirmPop from "../components/RsvpConfirmPop";
import Axios from 'axios';

export default function RsvpEvent(input) {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openError1, setOpenError1] = React.useState(false);
  const [openError2, setOpenError2] = React.useState(false);
  const [status, setStatus] = React.useState('');

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  const handleClickOpen = () => {
    if ((input.children)[2] === "Yes") {
      Axios.post('http://localhost:3001/checkinvite', {
        id: (input.children)[0],
        email: localStorage.getItem("login")
      }).then((response) => {
        console.log(response.data.length)
        if (response.data.length === 0) {
          setOpenError2(true)
        } else {
          if ((input.children)[1] >= 100) {
            setOpenError(true);
          } else {
            Axios.post('http://localhost:3001/check', {
                id: (input.children)[0],
                email: localStorage.getItem("login")
            }).then((response) => {
                      console.log(response.data.length)
              if (response.data.length > 0) {
                setOpenError1(true)
              } else {
              setOpen(true);
              }
            });
          }
        }
      })
    } else {
      if ((input.children)[1] >= 100) {
        setOpenError(true);
      } else {
        Axios.post('http://localhost:3001/check', {
            id: (input.children)[0],
            email: localStorage.getItem("login")
        }).then((response) => {
                  console.log(response.data.length)
          if (response.data.length > 0) {
            setOpenError1(true)
          } else {
          setOpen(true);
          }
        });
      }
    }
    }

  const handleClose = () => {
    setStatus("");
    setOpen(false);
    setOpenError(false);
    setOpenError1(false);
    setOpenError2(false);
  };
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        RSVP
      </Button>
      <Dialog open={open} onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}>
        <DialogTitle>Event RSVP</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Choose your RSVP status.
          </DialogContentText>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label" >Status</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={status}
                onChange={handleStatusChange}
            >
                <MenuItem value={"Will Attend"}>Will Attend</MenuItem>
                <MenuItem value={"Maybe"}>Maybe</MenuItem>
                <MenuItem value={"Won't Attend"}>Won't Attend</MenuItem>
                <MenuItem value={"I'm Your Nemesis"}>I'm Your Nemesis</MenuItem>
            </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <RsvpConfirmPop>
            {(input.children)[0]}
            {status}
            {(input.children)[1]}
            {(input.children)[3]}
            {(input.children)[4]}
          </RsvpConfirmPop>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Event Capacity is full!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot RSVP
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
          {"You already RSVPed!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot RSVP
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This event is invite only"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot RSVP
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}