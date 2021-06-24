import axios from "axios";
import React, { useEffect, useState } from "react";
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
} from "./styled/CardStyledComponents"

const Card = ({ id, deleteCard, clearErrors, pushError }) => {
  const [cardData, setCardData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [editable, setEditable] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get data for the card with the given id. Then, set value of cardData
  // and update "loaded" state
  useEffect(() => {
    let mounted = true;
    axios.get(`/api/cards/${id}`).then((response) => {
      // Update state only if component is mounted
      if (mounted) {
        setCardData(response.data.data);
        setLoaded(true);
      }
    });
    // Set mounted to false when component unmounted
    return () => {
      mounted = false;
    };
  }, [id]);

  // Toggle whether card is being edited
  const toggleEditable = () => {
    setEditable(!editable);
  };

  // Attempt to edit card details
  const editCard = ({ front, back }) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .put(`/api/cards/${id}`, { front, back })
      .then((response) => {
        clearErrors();
        toggleEditable();
        setCardData(response.data.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          pushError(
            "Edit failed: only the deck owner may edit card details. If you are the owner, you may need to log in."
          );
        } else if (status === 500) {
          pushError(
            "Edit failed: the server did not respond. Try again later."
          );
        } else {
          pushError("Edit failed. Try again later.");
        }
      });
  };

  return (
    <>
      {/* Render card details only when data has been returned by the axios request */}
      {loaded && (
        <CardContainer>
          {editable && (
            <form
              id={`editCardForm${id}`}
              onSubmit={handleSubmit((data) => editCard(data))}
            />
          )}
          <CardSectionLeft>
            <CardSectionHeader>
              <CardSectionHeading className="m-0">Front</CardSectionHeading>
            </CardSectionHeader>
            <CardSectionBody>
              {editable ? (
                <CardFormInput
                  side="front"
                  cardData={cardData}
                  register={register}
                  errors={errors}
                  formId={`editCardForm${id}`}
                />
              ) : (
                cardData.attributes.front
              )}
            </CardSectionBody>
          </CardSectionLeft>

          <CardSectionRight>
            <CardSectionHeader>
              <CardSectionHeading className="m-0">Back</CardSectionHeading>
              <CardButtons editable={editable} handleToggle={toggleEditable} deleteCard={deleteCard} id={id} formId={`editCardForm${id}`} />
            </CardSectionHeader>
            <CardSectionBody>
              {editable ? (
                <CardFormInput
                  side="back"
                  cardData={cardData}
                  register={register}
                  errors={errors}
                  formId={`editCardForm${id}`}
                />
              ) : (
                cardData.attributes.back
              )}
            </CardSectionBody>
          </CardSectionRight>
        </CardContainer>
      )}
    </>
  );
};

export default Card;
