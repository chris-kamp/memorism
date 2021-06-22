import React from "react";

const CardDetails = ({id, cardData, deleteCard, toggleEditable}) => {
  return (
    <>
      <div>
        <p>Front: {cardData.attributes.front}</p>
        <p>Back: {cardData.attributes.back}</p>
      </div>
      <button
        type="button"
        onClick={() => deleteCard(id)}
        style={{ marginRight: "0.5rem" }}
      >
        Delete
      </button>
      <button type="button" onClick={toggleEditable}>
        Edit
      </button>
    </>
  );
};

export default CardDetails;
