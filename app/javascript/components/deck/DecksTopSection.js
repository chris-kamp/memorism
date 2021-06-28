import React from "react";
import { GreenButton, RedButton } from "../styled/ButtonStyledComponents";
import { TopSection, TopHeading } from "../styled/DeckStyledComponents";
import DeckBlock from "./DeckBlock";

const DecksTopSection = ({ createDeck, toggleAddingDeck, addingDeck }) => {
  return (
    <TopSection>
      <TopHeading>DECKS</TopHeading>
      {addingDeck ? (
        <RedButton onClick={toggleAddingDeck} style={{ marginBottom: "1rem" }}>
          CANCEL
        </RedButton>
      ) : (
        <GreenButton onClick={toggleAddingDeck}>NEW DECK</GreenButton>
      )}
      {addingDeck && (
        <DeckBlock
          createDeck={createDeck}
          toggleAddingDeck={toggleAddingDeck}
        />
      )}
    </TopSection>
  );
};

export default DecksTopSection;
