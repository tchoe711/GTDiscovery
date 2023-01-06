import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Axios from 'axios';

export default function Host() {
  const [open, setOpen] = React.useState(true);
  const [openError, setOpenError] = React.useState(false);
  const [host, setHost] = React.useState('');

  function handleHostChange(event) {
    setHost(event.target.value);
  }

  const handleClose = () => {
    localStorage.setItem("filter", "All")
    localStorage.setItem("openHost", "false")
    setOpen(false);
    setOpenError(false);
    if (localStorage.getItem("page") === "map") {
      window.location.href = "http://localhost:3000/map"
  } else if (localStorage.getItem("page") === "home") {
      window.location.href = "http://localhost:3000/home"
  }
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

    const filter = () => {
        Axios.post('http://localhost:3001/checkhost', {
                host: host
            }).then((response) => {
                if (response.data.length <= 0 || host === '' || host.indexOf(' ') >= 0) {
                    setOpenError(true);
                } else {
                    localStorage.setItem("hostfilter", host)
                    localStorage.setItem("openHost", "false")
                    localStorage.setItem("filter", "Host")
                    if (localStorage.getItem("page") === "map") {
                        window.location.href = "http://localhost:3000/map"
                    } else if (localStorage.getItem("page") === "home") {
                        window.location.href = "http://localhost:3000/home"
                    }
                }
            });
    };

  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}>
        <DialogTitle>Filter Host</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Type in the email of the host you would like to filer by.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            variant="standard"
            onChange={handleHostChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={filter} autoFocus>
            Filter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This user does not have any events."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot Filter
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}