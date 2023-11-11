// PlaceCard.tsx
import React from "react";
import "./css/PlaceCard.css";

interface PlaceCardProps {
  place: google.maps.places.PlaceResult;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const photoUrl = place.photos?.[0].getUrl({ maxWidth: 400, maxHeight: 400 });

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{place.name}</h5>
        <p className="card-text">{place.vicinity}</p>
        <p className="card-text">{place.rating}</p>
        {photoUrl && <img src={photoUrl} alt={place.name} />}
      </div>
    </div>
  );
};

export default PlaceCard;
