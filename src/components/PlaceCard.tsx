import React from "react";
import "./css/PlaceCard.css";

interface PlaceCardProps {
  place: google.maps.places.PlaceResult;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{place.name}</h5>
        <p className="card-text">{place.formatted_address}</p>
        <p className="card-text">{place.rating}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
