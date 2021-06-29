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

const DeckBlock = ({ formAction, toggleForm, editable }) => {

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
            <BlockHeading>DECK TITLE</BlockHeading>
            <TileSpan>USERNAME</TileSpan>
          </TileHeader>
        )}
      
      <TileBody>
        <TileSubheader>
          <TileSpan>CARDS</TileSpan>
          {/* Visibility select field for the deck form */}
          {editable ? (<DeckVisibilityField
            formId="deckForm"
            fieldId="deckFormVisibility"
            register={register}
            errors={errors}
          />) : (
            <TileSpan>VISIBILITY</TileSpan>
          )}
        </TileSubheader>
        {/* Description textarea field for the deck form */}
        {editable? (<DeckDescriptionField
          formId="deckForm"
          fieldId="deckFormDescription"
          register={register}
          errors={errors}
        />) : (
          <TilePara>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, accusantium amet vel officiis, eos impedit iusto reiciendis quis culpa repudiandae, tenetur repellat exercitationem rerum. Culpa alias veritatis eius asperiores incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum iste id molestiae perspiciatis eum commodi aliquam, perferendis earum incidunt quos autem quas, libero aperiam, dicta omnis quaerat. Mollitia, porro facilis.</TilePara>
        )}
        {/* Submit and cancel buttons for the deck form */}
        {editable && <DeckButtons formId="deckForm" handleCancel={toggleForm} />}
      </TileBody>
    </DeckBlockContainer>
  );
};

export default DeckBlock;
