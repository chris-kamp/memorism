import React from "react";
import DeckBlock from "./DeckBlock";
import { TopSection } from "../styled/DeckStyledComponents";
import {TopHeading} from "../styled/SharedStyledComponents"

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
