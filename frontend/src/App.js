import { Route, Routes } from 'react-router-dom';
import Registration from "./pages/Registration"
import Start from "./pages/Start"
import Close from "./pages/Close"
import OHome from "./pages/OrganizerHome"
import Login from "./pages/Login"
import CEvent from "./pages/CreateEvent"
import RSVPEvent from "./pages/RSVPEvents"
import Attend from "./pages/Attendees"
import Map from "./pages/Map"


function App() {
  return <Routes>
    <Route path="/" element={<Start/>} />
    <Route path="/Registration" element={<Registration/>} />
    <Route path="/close" element={<Close/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/home" element={<OHome/>} />
    <Route path="/eventmaker" element={<CEvent/>} />
    <Route path="/eventrsvp" element={<RSVPEvent/>} />
    <Route path="/attend" element={<Attend/>} />
    <Route path="/map" element={<Map/>} />
  </Routes>
}

export default App;
