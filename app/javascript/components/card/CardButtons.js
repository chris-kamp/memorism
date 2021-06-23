import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`;

const Button = styled.button`
  border: none;
  text-align: center;
  border-radius: 0.25rem;
  font-weight: bold;
  color: #fdfdff;
  height: 1.7rem;
`;

const LeftButton = styled(Button)`
  margin-right: 0.25rem;
`

const RedButton = styled(Button)`
  background-color: #d43b3b;
`;

const YellowButton = styled(LeftButton)`
  background-color: #dcb532;
`;

const GreenButton = styled(LeftButton)`
  background-color: green;
`;

const CardButtons = ({ editable, toggleEditable, deleteCard, id }) => {
  return (
    <ButtonContainer>
      {editable ? (
        <>
          <GreenButton
            as="input"
            type="submit"
            value="Confirm"
            form="editCardForm"
          />
          <RedButton type="button" onClick={toggleEditable}>
            Cancel
          </RedButton>
        </>
      ) : (
        <>
          <YellowButton type="button" onClick={toggleEditable}>
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
