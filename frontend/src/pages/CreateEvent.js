import React, { useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import OrganizerAppBar from "../components/OrganizerAppBar";
import Axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLoadScript } from "@react-google-maps/api";
import Search from "../components/Location";
import dayjs from 'dayjs';

function CreateEvent() {
        const [title, setTitle] = React.useState(null);
        const [description, setDescription] = React.useState(null);
        const [location, setLocation] = React.useState(null);
        const [date, setDate] = React.useState(null);
        const [invite, setInvite] = React.useState(null);
        const [errorMessage, setErrorMessage] = React.useState("");
        const [eventList, setEventList] = React.useState([]);
        const [time, setTime] = React.useState(null);
        const [latitude, setLatitude] = React.useState(null);
        const [longitude, setLongitude] = React.useState(null);

        const { isLoaded } = useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_KEY,
            libraries: ["places"],
        });

        const setLoc = React.useCallback((address, { lat, lng }) => {
            Axios.post('http://localhost:3001/checklocation', {
                location: address
            }).then((response) => {
                console.log(lat)
                console.log(response.data.length * 0.00002)
                if (response.data.length > 0) {
                    lat += (response.data.length * 0.00003);
                    lng += (response.data.length * 0.00003);
                }
                console.log(lat)
                setLatitude(lat)
                setLongitude(lng)
            });
            setLocation(address)
          }, []);

        useEffect(() => {
            Axios.get('http://localhost:3001/get').then((response) => {
               setEventList(response.data)
            });
        }, []);

        const makeEvent = () => {
            Axios.post('http://localhost:3001/eventmaker', {
                title: title, 
                host: localStorage.getItem("login"), 
                description: description,
                location: location,
                time: dayjs(time).format('hh:mm A'),
                date: dayjs(date).format('MM/DD/YYYY'),
                invite: invite,
                latitude: latitude,
                longitude: longitude,
                timenum: time,
                datenum: date,
            }).then((response) => {
                console.log(response.data)
                if (response.data.sqlMessage || title === '' || description === '' || location === '' ||
                  time === '' || date === '') {
                    setErrorMessage("Invalid Inputs!")
                } else {
                    window.location.href = "http://localhost:3000/home"
                }
            });
            setEventList([...eventList, {title: title}])
        };

        function handleTitleChange(event) {
            setTitle(event.target.value);
        }
        function handleDescriptionChange(event) {
            setDescription(event.target.value);
        }
        function handleInviteChange(event) {
            setInvite(event.target.value);
        }
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <div>
            <OrganizerAppBar/>
            <Grid container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs={6}>
                <item>
                <h1>Create a new Event!!</h1>
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="outlined-basic" label="Title" variant="outlined" onChange={handleTitleChange} sx={{ m: 1, minWidth: 257 }}/>
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={handleDescriptionChange} sx={{ m: 1, minWidth: 257 }}/>
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <Search setLoc={setLoc} />
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
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
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                    label="Time"
                    value={time}
                    onChange={setTime}
                    className="event1"
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                </item>
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
            <Grid item xs={6}>
                <item> 
                <Button onClick={makeEvent} variant="contained" color="secondary" >
                    Create Event
                </Button>
                </item>
            </Grid>
            <h1>{errorMessage}</h1>
        </Grid>
    
        </div>
        )
}
export default CreateEvent;