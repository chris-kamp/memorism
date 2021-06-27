import React from "react";
import { GreenButton, RedButton } from "../styled/ButtonStyledComponents";
import { TopSection, TopHeading } from "../styled/DeckStyledComponents";
import NewDeckForm from "./NewDeckForm";

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
        <NewDeckForm
          createDeck={createDeck}
          toggleAddingDeck={toggleAddingDeck}
        />
      )}
    </TopSection>
  );
};

export default DecksTopSection;
