import React from "react";
import { useForm } from "react-hook-form";
import {
  TileBody,
  TileSubheader,
  TileSpan,
  BlockHeading,
  TileHeader,
  TilePara
} from "../styled/DeckStyledComponents";
import { DeckFormHeader, DeckBlockContainer } from "../styled/NewDeckStyledComponents";
import DeckTitleField from "./form/DeckTitleField";
import DeckVisibilityField from "./form/DeckVisibilityField";
import DeckDescriptionField from "./form/DeckDescriptionField";
import DeckButtons from "./form/DeckButtons";
import DeckCardsSpan from "./DeckCardsSpan";

const DeckBlock = ({ formAction, toggleForm, editable, deck }) => {

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
    formAction(data, () => {
      // Send callback to reset form values if new deck creation succeeds
      // Callback will not be used by edit deck function
      reset({
        title: "",
        description: "",
        isPublic: "true",
      });
    });
  };

  // **************
  //    RENDER
  // **************

  return (
    <DeckBlockContainer>
      {/* New deck form. Individual fields reference this by id. */}
      {editable && <form onSubmit={handleSubmit(onFormSubmit)} id="deckForm" />}
      
        {/* Title text input field for the deck form */}
        {editable ? (<DeckFormHeader><DeckTitleField
          formId="deckForm"
          fieldId="deckFormTitle"
          required={true}
          register={register}
          errors={errors}
        /></DeckFormHeader>) : (
          <TileHeader>
            <BlockHeading>{deck.title}</BlockHeading>
            <TileSpan>{deck.user.username}</TileSpan>
          </TileHeader>
        )}
      
      <TileBody>
        <TileSubheader>
          <DeckCardsSpan deck={deck} />
          {/* Visibility select field for the deck form */}
          {editable ? (<DeckVisibilityField
            formId="deckForm"
            fieldId="deckFormVisibility"
            register={register}
            errors={errors}
          />) : (
            <TileSpan>{deck.visibility}</TileSpan>
          )}
        </TileSubheader>
        {/* Description textarea field for the deck form */}
        {editable? (<DeckDescriptionField
          formId="deckForm"
          fieldId="deckFormDescription"
          register={register}
          errors={errors}
        />) : (
          <TilePara>{deck.description}</TilePara>
        )}
        {/* Submit and cancel buttons for the deck form */}
        {editable && <DeckButtons formId="deckForm" handleCancel={toggleForm} />}
      </TileBody>
    </DeckBlockContainer>
  );
};

export default DeckBlock;
