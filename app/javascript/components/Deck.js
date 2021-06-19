import React from "react";
import { useParams } from "react-router-dom";

const Deck = () => {
  const { id } = useParams();

  return (
  <div>This is the deck show view for deck {id}</div>
  );
};

export default Deck;
