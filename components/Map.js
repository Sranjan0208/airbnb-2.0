import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { getCenter } from "geolib";
import { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapSection({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  // Tranform the search results object into the
  // { latitude: 52.516272, longitude: 13.377722 }
  // object

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewPort] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <Map
      mapStyle="mapbox://styles/sranjan0208/cldly3i3i000b01lifdmbcbam"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      style={{ width: "100%", height: "100%" }}
      onMove={(evt) => setViewPort(evt.viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {/* The popup that should show if we click on a Marker */}
          {selectedLocation.long === result.long && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeButton={true}
              closeOnClick={false}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapSection;
