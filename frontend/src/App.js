import "./app.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import {Room} from '@material-ui/icons';

function App() {
   const [pins, setPins] = useState([]);
   const [currentPlaceId, setCurrentPlaceId] = useState(null);
   const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    //London coordinates
    latitude: 51.507351,
    longitude: -0.127758,
    zoom: 12
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("https://vehicles-location-app.herokuapp.com/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

 const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
     <ReactMapGL
     {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/alexmor/ckvr8ylmo59cy14mmjuam657h"
      transitionDuration="200"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {pins.map((pin) => (
  <>
    <Marker 
      latitude={pin.location.lat} 
      longitude={pin.location.lng} 
      offsetLeft={-20} 
      offsetTop={-10}>
      <Room style={{frontSize:viewport.zoom*7,color:'slateblue',cursor: "pointer",}}
       onClick={() => handleMarkerClick(pin.id, pin.location.lat, pin.location.lng)}
      />
      </Marker>
       {pin.id === currentPlaceId && (
     <Popup
          key={pin.id}
          latitude={pin.location.lat}
          longitude={pin.location.lng}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrentPlaceId(null)}
          anchor="left" >
          <div className="card">
            <h4>Vehicle Details</h4>
            <label className="VehicleId">VehicleId:</label>
            {pin.id}
            <label className="State">State:</label>
            {pin.state}
            <label className="Seats">Seats:</label>
            {pin.seats}
            <label className="Class">Class:</label>
            {pin.class.name}
            <label className="Distance">Distance:</label>
            {pin.distance}
            </div>
        </Popup>
      )}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
