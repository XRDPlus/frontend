import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PlaceCard from "./PlaceCard";

export type UserType = {
  sex: "male" | "female" | "other";
  age: number;
};

interface PoiSuggestorProps {
  location: { lat: number; lng: number };
  userType: UserType;
  timeOfDay: Date;
  suggestedPlaces: (places: google.maps.places.PlaceResult[]) => void;
}

// const placeType = [
//   "bar",
//   "restaurant",
//   "library",
//   "park",
//   "book_store",
//   "meal_takeaway",
//   "shopping_mall",
//   "park",
// ];

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 46.478741,
  lng: 11.332587,
};

const PoiSuggestor: React.FC<PoiSuggestorProps> = ({
  location,
  userType,
  timeOfDay,
  suggestedPlaces,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.places.PlaceResult[]>([]);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  //   useEffect(() => {
  //     if (!map || markers.length > 0) {
  //       return;
  //     }
  //     if (!map) return;
  //     setMarkers([]);

  //     const service = new google.maps.places.PlacesService(map);

  //     // const promises = placeType.map(
  //     //   (type) =>
  //     //     new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
  //     //       console.log("searching for type " + type);
  //     //       service.nearbySearch(
  //     //         {
  //     //           location: center,
  //     //           radius: 1500,
  //     //           openNow: true,
  //     //           type: type,
  //     //           rankBy: google.maps.places.RankBy.PROMINENCE,
  //     //         },
  //     //         (results, status) => {
  //     //           if (status !== "OK") {
  //     //             console.log("no results for type " + type);
  //     //             resolve([]);
  //     //           } else {
  //     //             console.log("results for type " + type);
  //     //             resolve(results || []);
  //     //           }
  //     //         }
  //     //       );
  //     //     })
  //     // );

  //     // Promise.all(promises).then((allResults) => {
  //     //   const allMarkers = allResults.flat();
  //     //   setMarkers(allMarkers);
  //     // });
  //   }, [isLoaded]);

  useEffect(() => {
    if (!map || markers.length > 0 || !userLocation) {
      return;
    }

    setMarkers([]);

    const service = new google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: userLocation,
      radius: 500,
      type: "store",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setMarkers(results);
        suggestedPlaces(results);
        console.log(results);
      }
    });
  }, [map, markers, userLocation]);
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={{
          zoomControl: true,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
        zoom={14}
        onLoad={setMap}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: marker.geometry?.location?.lat() || 0,
              lng: marker.geometry?.location?.lng() || 0,
            }}
          />
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default memo(PoiSuggestor);
