import React from "react";
import { useForm } from "react-hook-form";
import {
  TileBody,
  TileSubheader,
  TileSpan,
} from "../styled/DeckStyledComponents";
import { NewDeckHeader, DeckBlockContainer } from "../styled/NewDeckStyledComponents";
import DeckTitleField from "./form/DeckTitleField";
import DeckVisibilityField from "./form/DeckVisibilityField";
import DeckDescriptionField from "./form/DeckDescriptionField";
import DeckButtons from "./form/DeckButtons";

const DeckBlock = ({ createDeck, toggleAddingDeck }) => {
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
    <DeckBlockContainer>
      {/* New deck form. Individual fields reference this by id. */}
      <form onSubmit={handleSubmit(onFormSubmit)} id="newDeckForm" />
      <NewDeckHeader>
        {/* Title text input field for the deck form */}
        <DeckTitleField
          formId="newDeckForm"
          fieldId="newDeckTitle"
          required={true}
          register={register}
          errors={errors}
        />
      </NewDeckHeader>
      <TileBody>
        <TileSubheader>
          <TileSpan>0 cards</TileSpan>
          {/* Visibility select field for the deck form */}
          <DeckVisibilityField
            formId="newDeckForm"
            fieldId="isPublic"
            register={register}
            errors={errors}
          />
        </TileSubheader>
        {/* Description textarea field for the deck form */}
        <DeckDescriptionField
          formId="newDeckForm"
          fieldId="description"
          register={register}
          errors={errors}
        />
        {/* Submit and cancel buttons for the deck form */}
        <DeckButtons formId="newDeckForm" handleCancel={toggleAddingDeck} />
      </TileBody>
    </DeckBlockContainer>
  );
};

export default DeckBlock;
