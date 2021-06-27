import React from "react";
import { useForm } from "react-hook-form";
import {
  TileHeader,
  TileBody,
  TileSubheader,
  TileSpan,
} from "../styled/DeckStyledComponents";
import { ErrorPara } from "../styled/SharedStyledComponents";
import {
  NewDeckHeader,
  NewDeckTile,
  TitleInput,
  LeftLabel,
  TopLabel,
  TitleLabel,
  DescriptionTextArea,
  VisibilitySelect,
} from "../styled/NewDeckStyledComponents"
import {
  GreenButton,
  RedButton,
  CenteredButtonContainer,
} from "../styled/ButtonStyledComponents";

const NewDeckForm = ({createDeck, toggleAddingDeck}) => {
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
    createDeck(data, () => {
      // Send callback to reset form values if creation succeeds
      reset({
        title: "",
        description: "",
        isPublic: "true",
      });
    });
  };
  return (
    <NewDeckTile>
      <form onSubmit={handleSubmit(onFormSubmit)} id="newDeckForm" />
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
        <div style={{ marginBottom: "0.5rem" }}>
          <DescriptionTextArea
            id="description"
            {...register("description", { required: true })}
            form="newDeckForm"
          />
          {errors.description && (
            <ErrorPara>Please provide a description</ErrorPara>
          )}
        </div>
        <CenteredButtonContainer>
          <GreenButton
            as="input"
            type="submit"
            value="CONFIRM"
            form="newDeckForm"
          />
          <RedButton
            onClick={toggleAddingDeck}
            style={{ marginBottom: "1rem" }}
          >
            CANCEL
          </RedButton>
        </CenteredButtonContainer>
      </TileBody>
    </NewDeckTile>
  );
};

export default NewDeckForm;
