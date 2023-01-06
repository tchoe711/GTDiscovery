import React from "react"
import background from "../images/cock.jpg";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

function Start() {
    return (
    <div style={{ 
        backgroundImage: `url(${background})`,
        height:'100vh',
        fontSize:'50px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        objectFit: 'fit',
        }}>

        <Box textAlign='center'>
            <Stack spacing = {2}>
                <Button component={Link} to="/registration" variant="contained" color="secondary" >
                    Start
                </Button>
                <Button component={Link} to="/close" variant="contained" color="secondary">
                    Close
                </Button>
            </Stack>
        </Box>
    </div>
    )
}

export default Start;