import React from "react";
import DeckBlock from "./DeckBlock";
import { TopSection, TopHeading } from "../styled/DeckStyledComponents";

const DeckTopSection = ({ toggleForm, editable }) => {
  return (
    <TopSection>
      <TopHeading>VIEW DECK</TopHeading>
      <DeckBlock
        formAction={() => false}
        toggleForm={toggleForm}
        editable={editable}
      />
    </TopSection>
  );
};

export default DeckTopSection;
