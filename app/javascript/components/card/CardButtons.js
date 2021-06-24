import React from "react";
import {
  ButtonContainer,
  RedButton,
  YellowButton,
  GreenButton,
} from "../styled/ButtonStyledComponents";

const CardButtons = ({ editable, handleToggle, deleteCard, id, formId }) => {
  return (
    <ButtonContainer>
      {editable ? (
        <>
          <GreenButton as="input" type="submit" value="Confirm" form={formId} />
          <RedButton type="button" onClick={handleToggle}>
            Cancel
          </RedButton>
        </>
      ) : (
        <>
          <YellowButton type="button" onClick={handleToggle}>
            Edit
          </YellowButton>
          <RedButton type="button" onClick={() => deleteCard(id)}>
            Delete
          </RedButton>
        </>
      )}
    </ButtonContainer>
  );
};

export default CardButtons;
