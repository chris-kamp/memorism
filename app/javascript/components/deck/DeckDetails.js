import React from "react";

const DeckDetails = ({ deck, toggleEditable }) => {
  return (
    <>
      <h1>{deck.title}</h1>
      <p className="font-weight-bold">
        {deck.public ? "(Public)" : "(Private)"}
      </p>
      <p>{deck.description}</p>
      <button type="button" onClick={toggleEditable}>Edit</button>
    </>
  );
};

export default DeckDetails;
