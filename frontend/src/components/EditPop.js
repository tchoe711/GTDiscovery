import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ConfirmPop from "../components/ConfirmPop"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Search from "../components/Location";
import { useLoadScript } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
import '../pages/Map.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function UpdateEvent(input) {
  const [title, setTitle] = React.useState((input.children)[2]);
  const [description, setDescription] = React.useState((input.children)[3]);
  const [location, setLocation] = React.useState((input.children)[8]);
  const [time, setTime] = React.useState((input.children)[6]);
  const [date, setDate] = React.useState((input.children)[7]);
  const [open, setOpen] = React.useState(false);
  const [lat, setLat] = React.useState((input.children)[9]);
  const [lng, setLng] = React.useState((input.children)[10]);
  const [invite, setInvite] = React.useState((input.children)[5]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries: ["places"],
});

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handleInviteChange(event) {
    setInvite(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setLoc = React.useCallback((address, { lat, lng }) => {
    setLocation(address);
    setLat(lat);
    setLng(lng);
  }, []);

  if (!isLoaded) return <div>Loading...</div>; 
  return (
    <div>
      {(localStorage.getItem("login") === (input.children)[1]) && <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Change the fields you would like to edit.
          </DialogContentText>
          <Grid container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
          <Grid item xs={6}>
          <div className='outline'>
            <div>
            <TextField
              id="outlined-basic"
              label="Title"
              value={title}
              variant="outlined"
              onChange={handleTitleChange}
              sx={{ m: 1, minWidth: 257 }}
            />
            </div>
            <div>
            <TextField
              id="outlined-basic"
              label="Description"
              value={description}
              variant="outlined"
              onChange={handleDescriptionChange}
              sx={{ m: 1, minWidth: 257 }}
            />
            </div>
            <div className="item">
              <Search setLoc={setLoc} input={(input.children)[8]}/>
            </div>
          </div>
          </Grid>
          <Grid item xs={6}>
          <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Date"
                value={date}
                className="event1"
                onChange={(newDate) => {
                setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </div>
          </Grid>
          <Grid item xs={6}>
          <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
            label="Time"
            value={time}
            onChange={setTime}
            className="event1"
            renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </div>
          </Grid>
          <Grid item xs={6}>
          <item>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 257 }}>
            <InputLabel id="outlined-basic">Invite Only</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={invite}
                onChange={handleInviteChange}
            >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
            </Select>
            </FormControl>
                </item>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <ConfirmPop>
            {(input.children)[0]}
            {title}
            {description}
            {location}
            {dayjs(time).format('hh:mm A')}
            {dayjs(date).format('MM/DD/YYYY')}
            {lat}
            {lng}
            {invite}
            {time}
            {date}
          </ConfirmPop>
        </DialogActions>
      </Dialog>
    </div>
  );
}