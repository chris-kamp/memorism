import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { GreenButton, RedButton, CenteredButtonContainer } from "../styled/ButtonStyledComponents";
import {
  TileHeader,
  TileBody,
  TileSubheader,
  TileSpan,
} from "../styled/DeckStyledComponents";
import { ErrorPara } from "../styled/SharedStyledComponents";

const NewDeckHeader = styled.header`
  background-color: #6080bf;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
`;

const TopSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const TopHeading = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  font-size: 4rem;
`;

const NewDeckTile = styled.div`
  width: 36rem;
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  padding: 0;
  background-color: #f5f5f5;
  color: #020723;
  border: 1px solid #324759;
  border-radius: 0.25rem;
  width: 100%;
`;

const LeftLabel = styled.label`
  margin: 0 0.5rem 0 0;
  font-weight: bold;
`;

const TopLabel = styled.label`
  margin: 0 0 0.5rem 0;
  font-weight: bold;
`;

const TitleLabel = styled(LeftLabel)`
  font-size: 1.5rem;
`;

const DescriptionTextArea = styled.textarea`
  width: 100%;
  background-color: #f5f5f5;
  height: 8rem;
  vertical-align: top;
`;

const VisibilitySelect = styled.select`
  background-color: #f5f5f5;
`;


const DecksTopSection = ({ createDeck, toggleAddingDeck, addingDeck }) => {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Callback function to run when new deck form is submitted
  const onFormSubmit = (data) => {
    // Create a new deck from the form data
    createDeck(data);
    // Reset form field values on submit
    reset({
      title: "",
      description: "",
      isPublic: "true"
    });
  }

  return (
    <TopSection>
      <TopHeading>DECKS</TopHeading>
      {addingDeck ? (
        <RedButton onClick={toggleAddingDeck} style={{ marginBottom: "1rem" }}>
          CANCEL
        </RedButton>
      ) : (
        <GreenButton onClick={toggleAddingDeck}>NEW DECK</GreenButton>
      )}
      {addingDeck && (
        <NewDeckTile>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            id="newDeckForm"
          />
          <NewDeckHeader>
            <TitleLabel htmlFor="newDeckTitle">TITLE:</TitleLabel>
            <div>
              <TitleInput
                id="newDeckTitle"
                {...register("title", { required: true })}
                form="newDeckForm"
              />
              {errors.title && <ErrorPara>Please provide a title</ErrorPara>}
            </div>
          </NewDeckHeader>
          <TileBody>
            <TileSubheader>
              <TileSpan>0 cards</TileSpan>
              <div>
                <LeftLabel htmlFor="isPublic">Visibility: </LeftLabel>
                <VisibilitySelect
                  id="isPublic"
                  {...register("isPublic")}
                  form="newDeckForm"
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </VisibilitySelect>
              </div>
            </TileSubheader>
            <TopLabel htmlFor="description">Description:</TopLabel>
            <div style={{marginBottom: "0.5rem"}}>
              <DescriptionTextArea
                id="description"
                {...register("description", { required: true })}
                form="newDeckForm"
              />
              {errors.description && <ErrorPara>Please provide a description</ErrorPara>}
            </div>
            <CenteredButtonContainer>
              <GreenButton as="input" type="submit" value="CONFIRM" form="newDeckForm" />
              <RedButton
                onClick={toggleAddingDeck}
                style={{ marginBottom: "1rem" }}
              >
                CANCEL
              </RedButton>
            </CenteredButtonContainer>
          </TileBody>
        </NewDeckTile>
      )}

      {/* <GreenButton>New Deck</GreenButton> */}
      {/* <h1>Decks</h1> */}
      {/* Condiitonally display button to reveal deck creation form or the form itself */}
      {/* {addingDeck ? (
        <NewDeckForm
          createDeck={createDeck}
          toggleAddingDeck={toggleAddingDeck}
        />
      ) : (
        <button
          type="button"
          onClick={toggleAddingDeck}
          // style={{ marginBottom: "1rem" }}
        >
          Add a Deck
        </button>
      )} */}
    </TopSection>
  );
};

export default DecksTopSection;
