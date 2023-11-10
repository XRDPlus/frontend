import React, { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PlaceCard from "./PlaceCard";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 46.478741,
  lng: 11.332587,
};

const PoiSuggestor: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.places.PlaceResult[]>([]);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: center,
        radius: 1500,
        openNow: true,
        type: "restaurant",
        rankBy: google.maps.places.RankBy.PROMINENCE,
      },
      (results, status) => {
        if (status !== "OK") return;
        if (!results) return;
        setMarkers(results);
      }
    );
  }, [map]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={setMap}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <>
            <Marker
              key={index}
              position={{
                lat: marker.geometry?.location?.lat() || 0,
                lng: marker.geometry?.location?.lng() || 0,
              }}
            />
          </>
        ))}
      </GoogleMap>
      {/* <div>
        {markers.map((marker, index) => (
          <PlaceCard key={index} place={marker} />
        ))}
      </div> */}
    </>
  ) : (
    <></>
  );
};

export default PoiSuggestor;
