import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeckDetails from "./DeckDetails";
import DeckForm from "./DeckForm";
import styled from "styled-components";
import Cards from "./Cards";
import DeckLoadingMessage from "./DeckLoadingMessage";
import { parseDeck } from "../utility/Parsers";

const DeckContainer = styled.div`
  width: 80%;
  max-width: 1024px;
  margin: 0 auto;
  @media (max-width: 640px) {
    width: 95%;
  }
`;

const Deck = ({ pushAlert, clearAlerts, pushError, clearErrors }) => {
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
  // Track whether page is loading, initially true
  const [loading, setLoading] = useState(true);

  // Helper function to check if object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  // Get the deck with the ID obtained from URL params
  useEffect(() => {
    axios
      .get(`/api/decks/${id}`)
      .then((response) => {
        clearErrors();
        const parsedDeck = parseDeck(
          response.data.data,
          response.data.included
        );
        setDeck(parsedDeck);
        setCardIds(parsedDeck.cards.map((card) => card.id));
      })
      .catch(() =>
        pushError(`Deck with id ${id} does not exist or could not be accessed`)
      )
      .finally(() => setLoading(false));
  }, [id, cardIds.length]);

  // Alert loading while loading, then clear alerts
  useEffect(() => {
    loading ? pushAlert("Loading...") : clearAlerts();
  }, [loading]);

  // Send request to delete a card from the database, and remove the card
  // from state if successful
  const deleteCard = (deletionId) => {
    // Get CSRF token and send in header
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    // Send delete request with the id of the relevant card
    axios
      .delete(`/api/cards/${deletionId}`)
      .then(() => {
        clearErrors();
        setCardIds(cardIds.filter((cardId) => cardId !== deletionId));
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          pushError(
            "Deletion failed: only the deck owner may delete a card. If you are the owner, you may need to log in."
          );
        } else if (status === 500) {
          pushError(
            "Deletion failed: the server did not respond. Try again later."
          );
        } else {
          pushError("Deletion failed. Try again later.");
        }
      });
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
        clearErrors();
        setCardIds([...cardIds, response.data.data.id]);
        toggleAddingCard();
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          pushError(
            "Card creation failed: only the deck owner may add a card. If you are the owner, you may need to log in."
          );
        } else if (status === 500) {
          pushError(
            "Card creation failed: the server did not respond. Try again later."
          );
        } else {
          pushError("Card creation failed. Try again later.");
        }
      });
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
        clearErrors();
        toggleEditable();
        setDeck(response.data.data.attributes);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          pushError(
            "Edit failed: only the deck owner may edit the deck details. If you are the owner, you may need to log in."
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
    <DeckContainer>
      {/* Display loading message while loading */}
      {loading && <DeckLoadingMessage />}
      {/* If not loading and deck object not empty, display deck page */}
      {!loading && !isEmpty(deck) && (
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
          <Cards
            addingCard={addingCard}
            toggleAddingCard={toggleAddingCard}
            createCard={createCard}
            cardIds={cardIds}
            deleteCard={deleteCard}
            clearErrors={clearErrors}
            pushError={pushError}
          />
        </>
      )}
    </DeckContainer>
  );
};

export default Deck;
