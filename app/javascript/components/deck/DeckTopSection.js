import React from "react";
import DeckBlock from "./DeckBlock";
import { TopSection, TopHeading } from "../styled/DeckStyledComponents";

const DeckTopSection = ({ toggleForm, editable, deck, editDeck }) => {
  return (
    <TopSection>
      <TopHeading>VIEW DECK</TopHeading>
      <DeckBlock
        formAction={editDeck}
        toggleForm={toggleForm}
        editable={editable}
        deck={deck}
      />
    </TopSection>
  );
};

export default DeckTopSection;
