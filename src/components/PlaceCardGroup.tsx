// PlaceCardGroup.tsx
import React from "react";
import PlaceCard from "./PlaceCard";

interface PlaceCardGroupProps {
  places: google.maps.places.PlaceResult[];
}

const PlaceCardGroup: React.FC<PlaceCardGroupProps> = ({ places }) => {
  return (
    <div className="place-cards-container">
      {places.map((place, index) => (
        <PlaceCard key={index} place={place} />
      ))}
    </div>
  );
};

export default PlaceCardGroup;
