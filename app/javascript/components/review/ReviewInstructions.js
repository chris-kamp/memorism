import React from "react";
import {
  ReviewInstructionsContainer,
  ReviewInstructionsPara,
  CloseInstructionsButton,
} from "../styled/ReviewStyledComponents";

const ReviewInstructions = ({ closeInstructions }) => {
  return (
    <ReviewInstructionsContainer>
      <CloseInstructionsButton onClick={closeInstructions}>
        X
      </CloseInstructionsButton>
      <ReviewInstructionsPara>
        Use the onscreen arrows or the left and right arrow keys on your
        keyboard to navigate through the deck. Click the card or press space, up
        or down on your keyboard to flip the card over.
      </ReviewInstructionsPara>
    </ReviewInstructionsContainer>
  );
};

export default ReviewInstructions;
