import React from "react";
import HomeAppBar from "../components/OrganizerAppBar"
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, DirectionsRenderer } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
import './Map.css';
import Places from "../components/Places"
import Axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HostPop from "../components/HostPop"
import LocationPop from "../components/LocationPop"
import InviteTypePop from "../components/InviteTypePop"
import Distance from "../components/Distance"
import Button from '@mui/material/Button';

function EventMap() {
    const[value, setValue] = React.useState('');
    const [directions, setDirections] = React.useState(null);
    const [filter, setFilter] = React.useState('');
    const [selected, setSelected] = React.useState(null);
    const [eventList, setEventList] = React.useState([]);
    const [location, setLocation] = React.useState(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_KEY,
        libraries: ["places"],
    });

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
      }, []);

    const mapRef = React.useRef();
    const center = React.useMemo(() => ({lat: 33.775614, lng: -84.397312}), []);
    const options = React.useMemo(
        () => ({
            mapId: "94917b77da0bb998",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );

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
            window.location.href = "http://localhost:3000/map"
        }
        setFilter(event.target.value);
        localStorage.setItem("page", "map")
      }

    const panTo = React.useCallback((address, { lat, lng }) => {
        setValue(address);
        setDirections(null);
        setLocation({ lat, lng });
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(17);
      }, []);

    const clear = () => {
        if (location != null) {
            setDirections(null);
            setLocation(null);
            setValue('');
        }
    }

    const fetchDirections = (position) => {
        console.log(position)
        if (!location) return;
        // eslint-disable-next-line no-undef
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: location,
                destination: position,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);
                    console.log("here")
                    console.log(result);
                }
            }
        )
    }

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

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <div>
            <HomeAppBar/>
            <div className="container">
            <div className="sidebar">
            <Grid container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}>
            <h1> Events Map </h1>
            <div className="item">
            <Places panTo={panTo} input={value}/>
            </div>
            <div className="item">
            <Button variant="outlined" onClick={clear} >Clear Location</Button>
            </div>
            {directions && <Distance leg={directions.routes[0].legs[0]}/>}
            <h2 className="item">Filtered By: {localStorage.getItem("filter")}</h2>
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
            </Grid>
            </div>
                <GoogleMap
                    id="map"
                    zoom={16} 
                    center= {center} 
                    mapContainerClassName="map-container" 
                    options={options}
                    onLoad={onMapLoad}
                    >
                    {location && 
                    <MarkerF 
                        position={location} 
                        icon={{
                            url: "https://www.clipartmax.com/png/small/165-1655742_google-street-view-vector-logo-google-earth-street-view-icon.png",
                            scaledSize: new window.google.maps.Size(24,40),
                        }}
                    />}
                    {eventList.map((val) => (
                        <MarkerF
                            key={val.id} 
                            position={{
                                lat: parseFloat(val.lat),
                                lng: parseFloat(val.lng)
                            }}
                            onClick={() => {  
                                setSelected(val);
                                const lat = parseFloat(val.lat);
                                const lng = parseFloat(val.lng);
                                fetchDirections( {lat, lng} );
                            }}
                        />
                    ))}
                    {selected && (
                        <InfoWindowF
                        position={{
                            lat: parseFloat(selected.lat),
                            lng: parseFloat(selected.lng)
                        }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                        >
                            <div>
                                <h2>Event Details</h2>
                                <p>Title: {selected.title}</p>
                                <p>Capacity: {selected.count}/100</p>
                                {(selected.invite === "Yes") && <p> Invite Type: Invite Only</p>}
                                {(selected.invite === "No") && <p>Invite Type: Open To Everyone</p>}
                                <p>Description: {selected.description}</p>
                                <p>Location: {selected.location}</p>
                                <p>Time: {selected.time}</p>
                                <p>Date: {selected.date}</p>
                                <p>Host: {selected.host}</p>
                            </div>
                            
                        </InfoWindowF>
                    )}
                    {directions && <DirectionsRenderer directions={directions} options={{
                        preserveViewport: true,
                    }}/>}
                </GoogleMap>
            </div>
        </div>
        )
}

export default EventMap;