import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeckDetails from "./DeckDetails";
import DeckForm from "./DeckForm";
import styled from "styled-components";
import NewCard from "../card/NewCard";
import Cards from "./Cards";

const DeckContainer = styled.div`
  width: 80%;
  max-width: 1024px;
  margin: 0 auto;
  @media (max-width: 640px) {
    width: 95%;
  }
`;

const Deck = () => {
  // Get deck id from URL params using a react-router-dom method
  const { id } = useParams();
  // Initialise deck as an empty object
  const [deck, setDeck] = useState({});
  // Initialise cards as an empty array
  const [cardIds, setCardIds] = useState([]);
  // Track whether deck details are being edited, initially false
  const [editable, setEditable] = useState(false);
  // Track whether a new card is being created, initially false
  const [addingCard, setAddingCard] = useState(false);

  // Helper function to check if object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  // Get the deck with the ID obtained from URL params
  useEffect(() => {
    axios
      .get(`/api/decks/${id}`)
      .then((response) => {
        setDeck(response.data.data.attributes);
        setCardIds(
          response.data.data.relationships.cards.data.map((card) => {
            return card.id;
          })
        );
      })
      .catch((error) => console.log(error));
  }, [id, cardIds.length]);

  // Send request to delete a card from the database, and remove the card
  // from state if successful
  const deleteCard = (deletionId) => {
    // Get CSRF token and send in header
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    // Send delete request with the id of the relevant card
    axios
      .delete(`/api/cards/${deletionId}`)
      .then(() => setCardIds(cardIds.filter((cardId) => cardId !== deletionId)))
      .catch((error) => console.log(error));
  };

  // Attempt to create a new card in the relevant deck,
  // and add it to state if successful
  const createCard = ({ front, back }) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .post("/api/cards", {
        front,
        back,
        deck_id: id,
      })
      .then((response) => {
        setCardIds([...cardIds, response.data.data.id]);
        toggleAddingCard();
      })
      .catch((error) => console.log(error));
  };

  // Toggle whether deck is being edited
  const toggleEditable = () => {
    setEditable(!editable);
  };

  // Toggle whether a new card is being added (and the new card form is shown)
  const toggleAddingCard = () => {
    setAddingCard(!addingCard);
  };

  // Attempt to edit deck details
  const editDeck = ({ title, description, isPublic }) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .put(`/api/decks/${id}`, { title, description, public: isPublic })
      .then((response) => {
        toggleEditable();
        setDeck(response.data.data.attributes);
      })
      .catch((error) => console.log(error));
  };

  return (
    <DeckContainer>
      {isEmpty(deck) ? (
        <p>Deck with id {id} does not exist or could not be accessed</p>
      ) : (
        <>
            {/* Render deck details display or edit form depending on whether deck is currently being edited */}
            {editable ? (
              <DeckForm
                deck={deck}
                toggleEditable={toggleEditable}
                editDeck={editDeck}
              />
            ) : (
              <DeckDetails deck={deck} toggleEditable={toggleEditable} />
            )}
          <Cards addingCard={addingCard} toggleAddingCard={toggleAddingCard} createCard={createCard} cardIds={cardIds} deleteCard={deleteCard} />
        </>
      )}
    </DeckContainer>
  );
};

export default Deck;
