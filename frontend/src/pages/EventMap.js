import React from "react";
import HomeAppBar from "../components/OrganizerAppBar"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
import './EventMap.css';
import Places from "../components/Places"

function EventMap() {
    const [markers, setMarkers] = React.useState([]);
    const [location, setLocation] = React.useState();
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

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(18);
        //setLocation({ lat, lng });
      }, []);

    function Map() {
        return <GoogleMap
                    zoom={17} 
                    center= {center} 
                    mapContainerClassName="map-container" 
                    options={options}
                    onLoad={onMapLoad}
                    >
                    {markers.map((marker) => ( 
                    <Marker 

                    />
                    ))}
                </GoogleMap>;
    }

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
            <h1> Search Events</h1>
            <Places setLocation={(position) => {
                mapRef.current.panTo(position);
                mapRef.current.setZoom(18);
                //setLocation(position);
          }} />
            </Grid>
            </div>
                <Map />
            </div>
        </div>
        )
}

export default EventMap;