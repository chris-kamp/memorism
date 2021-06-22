import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import CardForm from "./CardForm";

const Card = ({ id, deleteCard }) => {
  const [cardData, setCardData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [editable, setEditable] = useState(false);

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

  // Toggle whether card is being edited
  const toggleEditable = () => {
    setEditable(!editable);
  };

  const editCard = (card) => console.log(card)

  return (
    <>
      {/* Render card details only when data has been returned by the axios request */}
      {loaded && (
        <div style={{ border: "solid 2px blue", marginBottom: "0.5rem", padding: "0.25rem" }}>
          <h5>Card {id}</h5>
          {editable ? (<CardForm cardData={cardData} editCard={editCard} toggleEditable={toggleEditable} />) : (<CardDetails id={id} cardData={cardData} deleteCard={deleteCard} toggleEditable={toggleEditable} />)}
        </div>
      )}
    </>
  );
};

export default Card;
