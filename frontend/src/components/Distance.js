import "../pages/Map.css"
export default function Distance({ leg }) {
    if (!leg.distance || !leg.duration) return null;
    console.log(leg.duration)
    const dist = Math.round((leg.distance.value / 1760) * 10) / 10;
    const time = Math.round(leg.duration.value / 60);
    
    return (
        <div className="info">
            <h3 className="center">Commute Information</h3>
            <div>This event is {dist} miles away from your current location. It would take {time} minutes to walk to this event.</div>
        </div>
    )
}