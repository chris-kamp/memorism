import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components"

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

const CardForm = ({ editCard, cardData, toggleEditable }) => {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    // <form onSubmit={handleSubmit((data) => editCard(data))}>
    //   <label htmlFor="front">Front: </label>
    // <input
    //   id="front"
    //   defaultValue={cardData.attributes.front}
    //   {...register("front", { required: true })}
    // />
    // <br />
    // {errors.front && (
    //   <>
    //     <span style={{ color: "red" }}>Front field cannot be empty</span>
    //     <br />
    //   </>
    // )}
    //   <br />
    // <label htmlFor="back">Back: </label>
    // <input
    //   id="back"
    //   defaultValue={cardData.attributes.back}
    //   {...register("back", { required: true })}
    // />
    // <br />
    // {errors.back && (
    //   <>
    //     <span style={{ color: "red" }}>Back field cannot be empty</span>
    //     <br />
    //   </>
    // )}
    //   <input type="submit" value="Confirm" />
    //   <button type="button" onClick={toggleEditable}>
    //     Cancel
    //   </button>
    // </form>
    <>
      <form id="editCardForm" onSubmit={handleSubmit((data) => editCard(data))} />
      <CardSectionLeft>
        <CardSectionHeader>
          <CardSectionHeading className="m-0">Front</CardSectionHeading>
        </CardSectionHeader>
        <CardSectionBody>
          <input
            id="front"
            defaultValue={cardData.attributes.front}
            {...register("front", { required: true })}
            form="editCardForm"
          />
          <br />
          {errors.front && (
            <>
              <span style={{ color: "red" }}>Front field cannot be empty</span>
              <br />
            </>
          )}
        </CardSectionBody>
      </CardSectionLeft>
      <CardSectionRight>
        <CardSectionHeader>
          <CardSectionHeading className="m-0">Back</CardSectionHeading>
          <ButtonContainer>
            <EditButton type="button" onClick={toggleEditable}>
              Edit
            </EditButton>
            <DeleteButton type="button" onClick={() => deleteCard(id)}>
              Delete
            </DeleteButton>
          </ButtonContainer>
        </CardSectionHeader>
        <CardSectionBody>
          <input
            id="back"
            defaultValue={cardData.attributes.back}
            {...register("back", { required: true })}
            form="editCardForm"
          />
          <br />
          {errors.back && (
            <>
              <span style={{ color: "red" }}>Back field cannot be empty</span>
              <br />
            </>
          )}
        </CardSectionBody>
      </CardSectionRight>
    </>
  );
};

export default CardForm;
