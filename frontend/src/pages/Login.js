import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Axios from 'axios'

function Login() {
        const [lemail, setlemail] = React.useState('');
        const [lpassword, setlpassword] = React.useState('');
        const [loginStatus, setLoginStatus] = React.useState('');
      
        function handleLemailChange(event) {
            setlemail(event.target.value);
          }
          function handleLpasswordChange(event) {
              setlpassword(event.target.value);
          }

          const login = () => {
            Axios.post('http://localhost:3001/Login', { 
                email: lemail, 
                password: lpassword, 

            }).then((response) => {
                if (response.data.message || lemail === '' || lemail.indexOf(' ') >= 0|| lpassword === '' || lpassword.indexOf(' ') >= 0) {
                    setLoginStatus(response.data.message)
                } else {
                    localStorage.setItem("login", lemail)
                    var type = response.data[0].user
                    localStorage.setItem("user", type)
                    localStorage.setItem("filter", "All")
                    window.location.href = "http://localhost:3000/home"
                }
            });
        };
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
                <h1>Login into your account</h1>

                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="filled-basic" label="Email" variant="filled" onChange={handleLemailChange} />
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <TextField id="filled-basic" label="Password" variant="filled" onChange={handleLpasswordChange} />
                </item>
            </Grid>
            <Grid item xs={6}>
                <item>
                <Button onClick={login} variant="contained" color="secondary" >
                    Login
                </Button> 
                </item>
            </Grid>
            <h1>{loginStatus}</h1>
        </Grid>
    
        </div>
        )
}

export default Login;