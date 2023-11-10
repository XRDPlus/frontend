
import React, { useState, useEffect } from 'react';

interface SuggestionPageProps {
    location: string;
    
}

const SuggestionPage: React.FC<SuggestionPageProps> = ({ location }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch suggestions data from backend API based on location prop
    // Update suggestions state variable with fetched data
  }, [location]);

  return (
    <div>
      Suggerimenti
    </div>
  );
};

export default SuggestionPage;
