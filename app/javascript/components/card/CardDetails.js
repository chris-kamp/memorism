import React from "react";
import styled from "styled-components";

const CardSectionLeft = styled.div`
  width: 50%;
  border-right: 2px solid gray;
`;

const CardSectionRight = styled(CardSectionLeft)`
  border: none;
`;

const CardSectionHeader = styled.div`
  width: 100%;
  background-color: #d2ecf9;
  position: relative;
`;

const CardSectionHeading = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  display: inline-block;
  width: 100%;
`;

const CardSectionBody = styled.div`
  padding: 0.5rem;
  background-color: #e1f2f9;
`;

const ButtonContainer = styled.div`
position: absolute;
right: 0px;
top: 0px;
`

const Button = styled.button`
  border: none;
  text-align: center;
  border-radius: 0.25rem;
  font-weight: bold;
  color: #FDFDFF;
  height: 1.7rem;
`

const DeleteButton = styled(Button)`
  background-color: #d43b3b;
`

const EditButton = styled(Button)`
  background-color: #dcb532;
  margin-right: 0.25rem;
`

const CardDetails = ({ id, cardData, deleteCard, toggleEditable }) => {
  return (
    <>
      <CardSectionLeft>
        <CardSectionHeader>
          <CardSectionHeading className="m-0">Front</CardSectionHeading>
        </CardSectionHeader>
        <CardSectionBody>{cardData.attributes.front}</CardSectionBody>
      </CardSectionLeft>
      <CardSectionRight>
        <CardSectionHeader>
          <CardSectionHeading className="m-0">Back</CardSectionHeading>
          <ButtonContainer>
            <EditButton
              type="button"
              onClick={toggleEditable}
            >
              Edit
            </EditButton>
            <DeleteButton type="button" onClick={() => deleteCard(id)}>
              Delete
            </DeleteButton>
          </ButtonContainer>
        </CardSectionHeader>
        <CardSectionBody>{cardData.attributes.back}</CardSectionBody>
      </CardSectionRight>
    </>
  );
};

export default CardDetails;
