import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import DeckDetails from "./DeckDetails";
import DeckForm from "./DeckForm";

const Deck = () => {
  // Get deck id from URL params using a react-router-dom method
  const { id } = useParams();
  // Initialise deck as an empty object
  const [deck, setDeck] = useState({});
  // Initialise cards as an empty array
  const [cardIds, setCardIds] = useState([]);
  // Track whether deck details are being edited, initially false
  const [editable, setEditable] = useState(false);

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

  // Map card ids to Card components for rendering
  const cardsList = cardIds.map((cardId) => (
    <Card id={cardId} key={cardId} deleteCard={deleteCard} />
  ));

  // Toggle whether deck is being edited
  const toggleEditable = () => {
    setEditable(!editable);
  }

  return (
    <div>
      {isEmpty(deck) ? (
        <p>Deck with id {id} does not exist or could not be accessed</p>
      ) : (
        <>
          {/* Render deck details display or edit form depending on whether deck is currently being edited */}
          {editable ? <DeckForm deck={deck} toggleEditable={toggleEditable} /> : <DeckDetails deck={deck} toggleEditable={toggleEditable} />}
          <h3>Cards:</h3>
          <div>
            {cardIds.length === 0 ? <p>Deck is currently empty</p> : cardsList}
          </div>
        </>
      )}
    </div>
  );
};

export default Deck;
