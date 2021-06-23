import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import CardForm from "./CardForm";
import styled from 'styled-components'

const CardContainer = styled.div`
  border: 2px solid #66a8c4;
  margin-bottom: 0.5rem;
  display: flex;
  border-radius: 0.25em;
`



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

  // Attempt to edit card details
  const editCard = ({ front, back }) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .put(`/api/cards/${id}`, { front, back })
      .then((response) => {
        toggleEditable();
        setCardData(response.data.data);
      })
      .catch((error) => console.log(error));
  };



  return (
    <>
      {/* Render card details only when data has been returned by the axios request */}
      {loaded && (
        <CardContainer
        >
          {editable ? (
            <CardForm
              cardData={cardData}
              editCard={editCard}
              toggleEditable={toggleEditable}
            />
          ) : (
            <CardDetails
              id={id}
              cardData={cardData}
              deleteCard={deleteCard}
              toggleEditable={toggleEditable}
            />
          )}
        </CardContainer>
      )}
    </>
  );
};

export default Card;
