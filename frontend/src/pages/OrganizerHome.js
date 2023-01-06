import HomeAppBar from "../components/OrganizerAppBar"
import React from "react";
import Axios from 'axios'
import './OrganizerHome.css';
import InfoPop from "../components/InfoPop"
import EditPop from "../components/EditPop"
import RsvpPop from "../components/RsvpPop"
import Button from '@mui/material/Button';
import InvitePop from "../components/InvitePop"
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HostPop from "../components/HostPop"
import LocationPop from "../components/LocationPop"
import InviteTypePop from "../components/InviteTypePop"

function OrganizerHome() {
    const [filter, setFilter] = React.useState('');
    const [eventList, setEventList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const pages = Math.ceil(eventList.length / 10);

    function handleFilterChange(event) {
        if(event.target.value === "Host") {
            localStorage.setItem("openHost", "true")
        }
        if(event.target.value === "Location") {
            localStorage.setItem("openLocation", "true")
        }
        if(event.target.value === "Invite") {
            localStorage.setItem("openInvite", "true")
        }
        if(event.target.value === "All") {
            localStorage.setItem("filter", "All")
            window.location.href = "http://localhost:3000/home"
        }
        setFilter(event.target.value);
        localStorage.setItem("page", "home")
      }

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

    const deleteEvent = (id) => {
        console.log(id)
        Axios.delete(`http://localhost:3001/deletersvpevent/${id}`);
        Axios.delete(`http://localhost:3001/delete/${id}`).then(window.location.href = "http://localhost:3000/home");
    };

    const attend = (id, count, host) => {
        localStorage.setItem("event", id)
        localStorage.setItem("count", count)
        localStorage.setItem("host", host)
        localStorage.setItem("status", "Will Attend")
        window.location.href = "http://localhost:3000/attend"
    };

    React.useEffect(() => {
        if(localStorage.getItem("filter") === "All") {
        Axios.get('http://localhost:3001/get').then((response) => {
           setEventList(response.data)
        });
        } else if (localStorage.getItem("filter") === "Host") {
            Axios.post('http://localhost:3001/checkhost', {
                host: localStorage.getItem("hostfilter")
            }).then((response) => {
                setEventList(response.data)
            });
        } else if (localStorage.getItem("filter") === "Location") {
            Axios.post('http://localhost:3001/checklocation', {
                location: localStorage.getItem("locationfilter")
            }).then((response) => {
                setEventList(response.data)
            });
        } else if (localStorage.getItem("filter") === "Invite") {
            Axios.post('http://localhost:3001/checkinvitetype', {
                invite: localStorage.getItem("invitefilter")
            }).then((response) => {
                setEventList(response.data)
            });
        }
    }, []);

    return (
        <div>
            <HomeAppBar></HomeAppBar>
            <Grid container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}>
            <h1>Events</h1>
            <h2>Filtered By: {localStorage.getItem("filter")}</h2>
            <item>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 230 }}>
            <InputLabel id="outlined-basic">Filter Events By</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filter}
                onChange={handleFilterChange}
            >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Host"}>Host</MenuItem>
                <MenuItem value={"Location"}>Location</MenuItem>
                <MenuItem value={"Invite"}>Invite Type</MenuItem>
            </Select>
            </FormControl>
            </item>
            {(localStorage.getItem("openHost") === "true") && <HostPop></HostPop>}
            {(localStorage.getItem("openLocation") === "true") && <LocationPop></LocationPop>}
            {(localStorage.getItem("openInvite") === "true") && <InviteTypePop></InviteTypePop>} 
            {currentEvents.map((val) => {
                return (
                    <div key={val.id} className="card2">
                    <div className="item">
                    <h3 className="text"> Title:<div className="subtext">{val.title}</div></h3>
                    {(val.invite === "Yes") && <h3 className="text">Status: <div className="subtext">Invite Only</div></h3>}
                    {(val.invite === "No") && <h3 className="text">Status: <div className="subtext">Open To Everyone</div></h3>}
                    <h3 className="text">Capacity: <div className="subtext">{val.count}/100</div></h3>
                    </div>
                    <div className="item">
                    <div className="button">
                    <InfoPop>
                        {val.id}
                    </InfoPop>
                    </div>
                    <div className="button">
                    {!(localStorage.getItem("login") === val.host) && <RsvpPop>
                        {val.id}
                        {val.count}
                        {val.invite}
                        {val.date}
                        {val.time}
                    </RsvpPop>}
                    </div>
                    <div className="button">
                    <Button variant="outlined" onClick={()=> {attend(val.id, val.count, val.host)}}>
                    Attendees
                    </Button>
                    </div>
                    <div className="button">
                    <InvitePop>
                        {val.id}
                        {val.host}
                        {val.invite}
                    </InvitePop>
                    </div>
                    <div className="button">
                    <EditPop>
                        {val.id}
                        {val.host}
                        {val.title}
                        {val.description}
                        {val.date}
                        {val.invite}
                        {val.timenum}
                        {val.datenum}
                        {val.location}
                        {val.lat}
                        {val.lng}
                    </EditPop>
                    </div>
                    <div className="button">
                    {((localStorage.getItem("login") === val.host) || (localStorage.getItem("user") === 30)) && <Button variant="outlined" onClick={()=> {deleteEvent(val.id)}}>
                    Delete
                    </Button>}
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
export default OrganizerHome