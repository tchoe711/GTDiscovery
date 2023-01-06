import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLoadScript } from "@react-google-maps/api";
import Search from "../components/Location";
import Axios from 'axios';

export default function Location() {
  const [location, setLocation] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [openError, setOpenError] = React.useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries: ["places"],
    });

  const handleClose = () => {
    localStorage.setItem("filter", "All")
    localStorage.setItem("openLocation", "false")
    setOpen(false);
    setOpenError(false);
    if (localStorage.getItem("page") === "map") {
        window.location.href = "http://localhost:3000/map"
    } else if (localStorage.getItem("page") === "home") {
        window.location.href = "http://localhost:3000/home"
    }
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const setLoc = React.useCallback((address) => {
    setLocation(address);
    localStorage.setItem("locationfilter", address)
  }, []);

    const filter = () => {
        Axios.post('http://localhost:3001/checklocation', {
                location: location
            }).then((response) => {
                if (response.data.length <= 0 || location === '') {
                    setOpenError(true);
                } else {
                    localStorage.setItem("openLocation", "false")
                    localStorage.setItem("filter", "Location")
                    if (localStorage.getItem("page") === "map") {
                        window.location.href = "http://localhost:3000/map"
                    } else if (localStorage.getItem("page") === "home") {
                        window.location.href = "http://localhost:3000/home"
                    }
                }
            });
    };

    if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}>
        <DialogTitle>Filter Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Type in the location you would like to filer by.
          </DialogContentText>
          <Search setLoc={setLoc} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={filter} autoFocus>
            Filter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"There are no events at this location."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cannot Filter
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}