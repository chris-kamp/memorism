import React from "react";
import {
  GreenButton,
  RedButton,
  CenteredButtonContainer,
} from "../../styled/ButtonStyledComponents";


const DeckButtons = ({formId, handleCancel }) => {
  return (
    <CenteredButtonContainer>
      <GreenButton
        as="input"
        type="submit"
        value="CONFIRM"
        form={formId}
      />
      <RedButton onClick={handleCancel} style={{ marginBottom: "1rem" }}>
        CANCEL
      </RedButton>
    </CenteredButtonContainer>
  );
};

export default DeckButtons;
