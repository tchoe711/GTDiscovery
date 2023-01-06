import HomeAppBar from "../components/OrganizerAppBar"
import React, { useEffect } from "react";
import Axios from 'axios'
import './OrganizerHome.css';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";

function AttendeeHome() {
    const [eventList, setEventList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const pages = Math.ceil(eventList.length / 10);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }
    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const startIndex = currentPage * 10 - 10;
    const endIndex = startIndex + 10;
    const currentEvents = eventList.slice(startIndex, endIndex);
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pages) * pages;
        return new Array(pages).fill().map((_, idx) => start + idx + 1);
    };

    const deleteuser = (id, status) => {
        console.log(id)
        Axios.delete(`http://localhost:3001/deletersvp/${id}`);

        if (status === "Will Attend" || status === "Maybe") {
            Axios.post('http://localhost:3001/updatecount', {
                id: localStorage.getItem("event"),
                count: localStorage.getItem("count") - 1,
            }).then(
                window.location.href = "http://localhost:3000/attend"
            );
        } else {
            Axios.post('http://localhost:3001/updatecount', {
                id: localStorage.getItem("event"),
                count: localStorage.getItem("count") - 0,
            }).then(
                window.location.href = "http://localhost:3000/attend"
            );
        }
    };

    const will = () => {
        localStorage.setItem("status", "Will Attend")
        window.location.href = "http://localhost:3000/attend"
    }

    const maybe = () => {
        localStorage.setItem("status", "Maybe")
        window.location.href = "http://localhost:3000/attend"
    }

    const wont = () => {
        localStorage.setItem("status", "Won't Attend")
        window.location.href = "http://localhost:3000/attend"
    }

    const nemesis = () => {
        localStorage.setItem("status", "I'm Your Nemesis")
        window.location.href = "http://localhost:3000/attend"
    }

    useEffect(() => {
        Axios.post('http://localhost:3001/getattendee', {
            event: localStorage.getItem("event"),
            status: localStorage.getItem("status"),
        }).then((response) => {
           setEventList(response.data)
        });
    }, []);

    return (
        <div>
            <HomeAppBar></HomeAppBar>
            <Grid container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}>
            <h1>Attendees</h1> 
            <div className="button">
                <Button variant="outlined" onClick={will} >
                        Will Attend
                </Button>
                <Button variant="outlined" onClick={maybe} >
                        Maybe
                </Button>
                <Button variant="outlined" onClick={wont} >
                        Won't Attend
                </Button>
                <Button variant="outlined" onClick={nemesis} >
                        I'm Your Nemesis
                </Button>    
            </div>
            {currentEvents.map((val) => {
                return (
                    <div key={val.rsvpid} className="card1">
                        <h2>{val.email}</h2>
                        <h3>Status: {val.status}</h3>
                        <div className="button">
                            {(localStorage.getItem("host") === localStorage.getItem("login")) && <Button variant="outlined" onClick={()=> {deleteuser(val.rsvpid, val.status)}}>
                            Remove Attendee
                            </Button>}
                        </div>
                    </div>   
                );
            })}
            </Grid>
            <div className="pagination">
            {/* previous button */}
            <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
                prev
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
                <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
                >
                <span>{item}</span>
                </button>
            ))}

            {/* next button */}
            <button
                onClick={goToNextPage}
                className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
                next
            </button>
            </div>
        </div>
    );
    }
export default AttendeeHome