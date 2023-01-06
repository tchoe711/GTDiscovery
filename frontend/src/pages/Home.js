import React from "react"
import background from "../images/cock.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Button component={Link} to="/Registration" variant="contained" color="secondary" >
                Sign Out
            </Button>
                
            </div>
            )
    }
export default Home