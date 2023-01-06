import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Axios from 'axios';

export default function RsvpEvent(input) {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openError1, setOpenError1] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    setOpenError1(false);
    setOpenSuccess(false);
  };

    const invite = () => {
        Axios.post('http://localhost:3001/checkuser', { 
                email: email, 
            }).then((response) => {
                if (response.data.message || email === '' || email.indexOf(' ') >= 0) {
                    setOpenError(true);
                } else {
                    Axios.post('http://localhost:3001/checkinvite', {
                        id: (input.children)[0],
                        email: email
                    }).then((response) => {
                        console.log(response.data.length)
                        if (response.data.length > 0) {
                        setOpenError1(true)
                        } else {
                            Axios.post('http://localhost:3001/invite', {
                                eventid: (input.children)[0],
                                email: email,
                            });
                            setOpenSuccess(true);
                        }
                    });
                }
        });
    };

  
  return (
    <div>
      {((localStorage.getItem("login") === (input.children)[1]) && ((input.children)[2] === "Yes")) && <Button variant="outlined" onClick={handleClickOpen}>
        Invite
      </Button>}
      <Dialog open={open} onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}>
        <DialogTitle>Invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Type in the email of the user you would like to invite.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            variant="standard"
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={invite} autoFocus>
            Invite
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
          {"This account does not exist."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot Invite
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSuccess}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This user can now RSVP for your event."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User Invited
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
          {"This user has already been invited."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot Invite
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}