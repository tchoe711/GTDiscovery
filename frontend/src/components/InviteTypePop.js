import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function Host() {
  const [open, setOpen] = React.useState(true);
  const [openError, setOpenError] = React.useState(false);
  const [invite, setInvite] = React.useState(null);

  function handleInviteChange(event) {
    setInvite(event.target.value);
  }

  const handleClose = () => {
    localStorage.setItem("filter", "All")
    localStorage.setItem("openInvite", "false")
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
        Axios.post('http://localhost:3001/checkinvitetype', {
                invite: invite
            }).then((response) => {
                if (response.data.length <= 0 || invite === null) {
                    setOpenError(true);
                } else {
                    localStorage.setItem("invitefilter", invite)
                    localStorage.setItem("openInvite", "false")
                    localStorage.setItem("filter", "Invite")
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
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="outlined-basic">Invite Only</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={invite}
                onChange={handleInviteChange}
            >
                <MenuItem value="">  
                </MenuItem>
                <MenuItem value={"No"}>Open to Everyone</MenuItem>
                <MenuItem value={"Yes"}>Invite Only</MenuItem>
            </Select>
            </FormControl>
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
          {"No events are this invite type."}
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