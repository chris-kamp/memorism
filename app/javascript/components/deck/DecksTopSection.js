import React from "react";
import { GreenButton, RedButton } from "../styled/ButtonStyledComponents";
import { TopSection, TopHeading } from "../styled/DeckStyledComponents";
import DeckBlock from "./DeckBlock";

const DecksTopSection = ({ formAction, toggleForm, addingDeck }) => {
  return (
    <TopSection>
      <TopHeading>DECKS</TopHeading>
      {addingDeck ? (
        <RedButton onClick={toggleForm} style={{ marginBottom: "1rem" }}>
          CANCEL
        </RedButton>
      ) : (
        <GreenButton onClick={toggleForm}>NEW DECK</GreenButton>
      )}
      {addingDeck && (
        <DeckBlock
          formAction={formAction}
          toggleForm={toggleForm}
          editable={true}
          // Deck with empty cards array required to correctly display card count in new deck creation form
          deck={{cards: []}}
        />
      )}
    </TopSection>
  );
};

export default DecksTopSection;
