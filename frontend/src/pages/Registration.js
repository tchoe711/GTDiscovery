import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Axios from 'axios'

function Registration() {
        const [user, setUser] = React.useState('');
        const [username, setUserName] = React.useState(null);
        const [email, setEmail] = React.useState(null);
        const [password, setPassword] = React.useState(null);

        const [errorMessage, setErrorMessage] = React.useState("");

        const register = () => {
            Axios.post('http://localhost:3001/registration', {
                username: username, 
                email: email, 
                password: password, 
                user: user,
            }).then((response) => {
                if (response.data.sqlMessage || username === '' || username.indexOf(' ') >= 0 || email === '' || email.indexOf(' ') >= 0|| password === '' || password.indexOf(' ') >= 0) {
                    setErrorMessage("Invalid Inputs!")
                } else {
                    window.location.href = "http://localhost:3000/Login"
                }
                console.log(response)
            });
        };
      
        function handleUserChange(event) {
          setUser(event.target.value);
        }
        function handleUserNameChange(event) {
            setUserName(event.target.value);
        }
        function handleEmailChange(event) {
            setEmail(event.target.value);
        }
        function handlePasswordChange(event) {
            setPassword(event.target.value);
        }

    return (
        <div>
            <ButtonAppBar/>
            <Grid container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs={6}>
                <item>
                <h1>Register For An Account</h1>
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="filled-basic" label="Name" variant="filled" onChange={handleUserNameChange} />
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="filled-basic" label="Email" variant="filled" onChange={handleEmailChange} />
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="filled-basic" label="Password" variant="filled" onChange={handlePasswordChange} />
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label" >User Type</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={user}
                onChange={handleUserChange}
            >
                <MenuItem value="">  
                </MenuItem>
                <MenuItem value={10}>Student</MenuItem>
                <MenuItem value={20}>Teacher</MenuItem>
                <MenuItem value={30}>Organizer</MenuItem>
            </Select>
            </FormControl>
                </item>
            </Grid>
            <Grid item xs={6}>
                <item> 
                <Button onClick={register} variant="contained" color="secondary" >
                    Create Account
                </Button>
                </item>
            </Grid>
            <h1>{errorMessage}</h1>
        </Grid>
    
        </div>
        )
}

export default Registration;