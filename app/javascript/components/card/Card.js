import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = ({ id, deleteCard }) => {
  const [cardData, setCardData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Get data for the card with the given id. Then, set value of cardData
  // and update "loaded" state
  useEffect(() => {
    let mounted = true;
    axios.get(`/api/cards/${id}`).then((response) => {
      // Update state only if component is mounted
      if (mounted) {
        setCardData(response.data.data);
        setLoaded(true);
      }
    });
    // Set mounted to false when component unmounted
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <>
      {/* Render card details only when data has been returned by the axios request */}
      {loaded && (
        <div style={{border: "solid 2px blue", marginBottom: "0.5rem"}}>
          <h5>Card {id}</h5>
          <ul>
            <li>Front: {cardData.attributes.front}</li>
            <li>Back: {cardData.attributes.back}</li>
          </ul>
          <button type="button" onClick={() => deleteCard(id)}>Delete</button>
        </div>
      )}
    </>
  );
};

export default Card;
