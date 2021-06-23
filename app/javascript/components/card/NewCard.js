import React from "react";
import { useForm } from "react-hook-form";
import CardFormInput from "./CardFormInput";
import CardButtons from "./CardButtons";
import {
  CardContainer,
  CardSectionLeft,
  CardSectionRight,
  CardSectionHeader,
  CardSectionHeading,
  CardSectionBody,
} from "./styled/CardStyledComponents";

const NewCard = ({ createCard, toggleAddingCard, id }) => {
  const cardData = {
    attributes: {
      front: "",
      back: "",
    },
  };

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <CardContainer>
        <form
          id="newCardForm"
          onSubmit={handleSubmit((data) => createCard(data))}
        />

        <CardSectionLeft>
          <CardSectionHeader>
            <CardSectionHeading className="m-0">Front</CardSectionHeading>
          </CardSectionHeader>
          <CardSectionBody>
            <CardFormInput
              side="front"
              cardData={cardData}
              register={register}
              errors={errors}
              formId="newCardForm"
            />
          </CardSectionBody>
        </CardSectionLeft>

        <CardSectionRight>
          <CardSectionHeader>
            <CardSectionHeading className="m-0">Back</CardSectionHeading>
            <CardButtons
              editable={true}
              handleToggle={toggleAddingCard}
              deleteCard={toggleAddingCard}
              id={id}
              formId="newCardForm"
            />
          </CardSectionHeader>
          <CardSectionBody>
            <CardFormInput
              side="back"
              cardData={cardData}
              register={register}
              errors={errors}
              formId="newCardForm"
            />
          </CardSectionBody>
        </CardSectionRight>
      </CardContainer>
    </>
  );
};

export default NewCard;
