import React from "react";
import DeckBlock from "./DeckBlock";
import { TopSection } from "../styled/DeckStyledComponents";
import { TopHeading } from "../styled/SharedStyledComponents";
import {
  CenteredButtonContainer,
  BlueButton,
} from "../styled/ButtonStyledComponents";
import { useHistory } from "react-router-dom";

const DeckTopSection = ({ toggleForm, editable, deck, editDeck }) => {
  const history = useHistory()

  return (
    <TopSection>
      <TopHeading>VIEW DECK</TopHeading>
      <DeckBlock
        formAction={editDeck}
        toggleForm={toggleForm}
        editable={editable}
        deck={deck}
      />
      <CenteredButtonContainer style={{ marginTop: "2rem" }}>
        <BlueButton onClick={() => history.push(`/decks/${deck.id}/review`)} >
          REVIEW NOW
        </BlueButton>
      </CenteredButtonContainer>
    </TopSection>
  );
};

export default DeckTopSection;
