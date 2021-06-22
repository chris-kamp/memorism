import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import NewCardForm from "../card/NewCardForm";
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

  // Map card ids to Card components for rendering
  // For now, reverse so newest is first when adding cards
  const cardsList = cardIds.map((cardId) => (
    <Card id={cardId} key={cardId} deleteCard={deleteCard} />
  )).reverse();

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
    <div>
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
          <h3>Cards:</h3>
          <button
            type="button"
            onClick={toggleAddingCard}
            style={{ marginBottom: "0.5rem" }}
          >
            Add a Card
          </button>

          {addingCard && (
            <>
              <div
                style={{
                  border: "solid 2px blue",
                  marginBottom: "0.5rem",
                  padding: "0.25rem",
                }}
              >
                <h5>New Card</h5>
                <NewCardForm
                  toggleAddingCard={toggleAddingCard}
                  createCard={createCard}
                />
              </div>
            </>
          )}
          <div>
            {cardIds.length === 0 ? <p>Deck is currently empty</p> : cardsList}
          </div>
        </>
      )}
    </div>
  );
};

export default Deck;
