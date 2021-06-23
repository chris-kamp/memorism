import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import CardFormInput from "./CardFormInput";
import CardButtons from "./CardButtons";

const CardContainer = styled.div`
  border: 2px solid #66a8c4;
  margin-bottom: 0.5rem;
  display: flex;
  border-radius: 0.25em;
`;

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

const Card = ({ id, deleteCard }) => {
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
        toggleEditable();
        setCardData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Render card details only when data has been returned by the axios request */}
      {loaded && (
        <CardContainer>
          {editable && (
            <form
              id="editCardForm"
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
                />
              ) : (
                cardData.attributes.front
              )}
            </CardSectionBody>
          </CardSectionLeft>

          <CardSectionRight>
            <CardSectionHeader>
              <CardSectionHeading className="m-0">Back</CardSectionHeading>
              <CardButtons editable={editable} toggleEditable={toggleEditable} deleteCard={deleteCard} id={id} />
            </CardSectionHeader>
            <CardSectionBody>
              {editable ? (
                <CardFormInput
                  side="back"
                  cardData={cardData}
                  register={register}
                  errors={errors}
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
