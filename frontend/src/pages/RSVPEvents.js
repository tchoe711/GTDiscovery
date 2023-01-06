import HomeAppBar from "../components/OrganizerAppBar"
import React, { useEffect } from "react";
import Axios from 'axios'
import './OrganizerHome.css';
import InfoPop from "../components/InfoPop"
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import EditRvspPop from "../components/EditRsvpPop";

function RsvpHome() {
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

    const deleteEvent = (id, eventid, count, status, date, time) => {
        console.log(id)
        Axios.delete(`http://localhost:3001/deletersvp/${id}`).then(
            Axios.post('http://localhost:3001/checkconflict', {
            date: date,
            time: time,
            email: localStorage.getItem("login"),
        }).then((response) => {
            console.log(response.data.length)
            if (response.data.length <= 2) {
                Axios.post('http://localhost:3001/updateconflict', {
                conflict: "false",
                date: date,
                time: time,
                email: localStorage.getItem("login"),
                }).then(
                    window.location.href = "http://localhost:3000/eventrsvp"
                )
            } else {
                window.location.href = "http://localhost:3000/eventrsvp"
            }
        })
        );

        if (status === "Will Attend" || status === "Maybe") {
            Axios.post('http://localhost:3001/updatecount', {
                id: eventid,
                count: count - 1,
            })
        } else {
            Axios.post('http://localhost:3001/updatecount', {
                id: eventid,
                count: count - 0,
            })
        }
    };

    useEffect(() => {
        Axios.get(`http://localhost:3001/getrsvp/${localStorage.getItem("login")}`,).then((response) => {
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
            <h1>RSVPed Events</h1> 
            {currentEvents.map((val) => {
                return (
                    <div key={val.rsvpid} className="card2">
                        <div className="item">
                            <h3 className="text"> Title: <div className="subtext">{val.title}</div></h3>
                            {(val.conflict === "true") && <h3 className="conflict">Error: <div className="subtext">Time Conflict!</div></h3>}
                            <h3 className="text">Status: <div className="subtext">{val.status}</div></h3>
                        </div>
                        <div className="item">
                            <div className="button">
                                <InfoPop>
                                    {val.id}
                                </InfoPop>
                            </div>
                            <div className="button">
                                <Button variant="outlined" onClick={()=> {deleteEvent(val.rsvpid, val.id, val.count, val.status, val.date, val.time)}} className="button">
                                Delete RSVP
                                </Button>
                            </div>
                            <div className="button">
                                <EditRvspPop>
                                    {val.rsvpid}
                                    {val.id}
                                    {val.count}
                                    {val.status}
                                </EditRvspPop>
                            </div>
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
export default RsvpHome