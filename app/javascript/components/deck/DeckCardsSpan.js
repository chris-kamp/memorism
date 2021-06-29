import React from "react";
import { TileSpan } from "../styled/DeckStyledComponents";
const DeckCardsSpan = ({ deck }) => {
  return (
    <TileSpan>
      {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
    </TileSpan>
  );
};

export default DeckCardsSpan;
