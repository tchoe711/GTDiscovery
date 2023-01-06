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
import RsvpEditConfirmPop from "../components/RsvpEditConfirmPop";
import '../pages/OrganizerHome.css';

export default function EditRsvpEvent(input) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setStatus("");
    setOpen(false);
  };
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="button">
        Edit RSVP
      </Button>
      <Dialog open={open} onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}>
        <DialogTitle>Edit RSVP</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Use the dropdown menu to udate your RSVP status.
          </DialogContentText>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label" >Status</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={status}
                onChange={handleStatusChange}
            >
                {!((input.children)[3] === "Will Attend") && <MenuItem value={"Will Attend"}>Will Attend</MenuItem>}
                {!((input.children)[3] === "Maybe") && <MenuItem value={"Maybe"}>Maybe</MenuItem>}
                {!((input.children)[3] === "Won't Attend") && <MenuItem value={"Won't Attend"}>Won't Attend</MenuItem>}
                {!((input.children)[3] === "I'm Your Nemesis") && <MenuItem value={"I'm Your Nemesis"}>I'm Your Nemesis</MenuItem>}
            </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <RsvpEditConfirmPop>
            {input.children[0]}
            {status}
            {input.children[1]}
            {input.children[2]}
          </RsvpEditConfirmPop>
        </DialogActions>
      </Dialog>
    </div>
  );
}