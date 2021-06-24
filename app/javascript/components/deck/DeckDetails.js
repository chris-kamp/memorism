import React from "react";
import {YellowButton} from "../styled/ButtonStyledComponents"

const DeckDetails = ({ deck, toggleEditable }) => {
  return (
    <>
      <h1>{deck.title}</h1>
      <p className="font-weight-bold">
        {deck.public ? "(Public)" : "(Private)"}
      </p>
      <p>{deck.description}</p>
      <YellowButton type="button" onClick={toggleEditable} style={{marginBottom: "1rem"}}>Edit Deck</YellowButton>
    </>
  );
};

export default DeckDetails;
