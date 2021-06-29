import React from "react";
import { GreenButton, RedButton } from "../styled/ButtonStyledComponents";
import { TopSection } from "../styled/DeckStyledComponents";
import {TopHeading} from "../styled/SharedStyledComponents"
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
          // Deck with empty properties required to set default values in new deck form
          deck={{ cards: [], title: "", description: "", public: true }}
        />
      )}
    </TopSection>
  );
};

export default DecksTopSection;
