import React from "react";
import {
  CornerButtonContainer,
  RedButton,
  YellowButton,
  GreenButton,
} from "../styled/ButtonStyledComponents";

const CardButtons = ({ editable, handleToggle, deleteCard, id, formId }) => {
  return (
    <CornerButtonContainer>
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
    </CornerButtonContainer>
  );
};

export default CardButtons;
