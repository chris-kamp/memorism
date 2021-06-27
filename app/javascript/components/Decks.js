import React, { useState, useEffect } from "react";
import axios from "axios";
import DeckTilesContainer from "./deck/DeckTilesContainer";
import DeckTile from "./deck/DeckTile";
import DecksTopSection from "./deck/DecksTopSection";

// Given a response object and a user_id, return the corresponding user data
const findUser = (included, user_id) =>
  included.find(
    (element) => element.type === "user" && element.id === user_id.toString()
  );

// Parse user data into an object in useable format
const parseUser = (data) => ({
  id: data.id,
  username: data.attributes.username,
});

// Given deck data and included relationships, return an array of the included cards which belong to that deck
const findCards = (deck, included) => {
  const deckCardIds = deck.relationships.cards.data.map(
    (element) => element.id
  );
  return included.filter(
    (element) => element.type === "card" && deckCardIds.includes(element.id)
  );
};

// Parse an array of card data into an array of card objects in useable format
const parseCards = (data) =>
  data.map((cardData) => ({
    id: cardData.id,
    back: cardData.attributes.back,
    front: cardData.attributes.front,
    deck_id: cardData.attributes.deck_id,
  }));

// Given deck data and included relationships from a response object, return a deck object in useable format
const parseDeck = (deckData, included) => ({
  id: deckData.id,
  title: deckData.attributes.title,
  description: deckData.attributes.description,
  public: deckData.attributes.public,
  user_id: deckData.attributes.user_id,
  user: parseUser(findUser(included, deckData.attributes.user_id)),
  cards: parseCards(findCards(deckData, included)),
});

// Parse a response object containing a collection of decks into an array of deck objects in useable format
const parseDecks = (response) =>
  response.data.data.map((deckData) =>
    parseDeck(deckData, response.data.included)
  );

const Decks = ({ pushError, clearErrors }) => {
  const [decks, setDecks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [addingDeck, setAddingDeck] = useState(false);

  // Toggle state for whether the new deck creation form is open
  const toggleAddingDeck = () => setAddingDeck(!addingDeck);

  // Get data for all decks, parse to useable deck objects, and update state accordingly
  useEffect(() => {
    let mounted = true;
    axios
      .get("/api/decks")
      .then((response) => {
        // Update state only if component is mounted
        if (mounted) {
          setDecks(parseDecks(response));
          setLoaded(true);
        }
      })
      .catch(() => {
        pushError("Failed to load decks. Try reloading the page shortly.");
      });
    // Set mounted to false when component unmounted

    return () => {
      mounted = false;
    };
  }, [decks.length]);

  // Get CSRF token and set default axios headers
  useEffect(() => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  }, []);

  // Attempt to create a new deck, and add it to state if response indicates success
  // Optionally, run a given callback (eg. to reset form after creation) only if post succeeds
  const createDeck = ({ title, description, isPublic }, callback) => {
    axios
      .post("/api/decks", {
        title,
        description,
        public: isPublic,
      })
      .then((response) => {
        clearErrors();
        setDecks([...decks, parseDeck(response.data.data, response.data.included)]);
        toggleAddingDeck();
        callback && callback();
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          pushError(
            "Deck creation failed: you must be logged in to create a deck."
          );
        } else if (status === 500) {
          pushError(
            "Deck creation failed: the server did not respond. Try again later."
          );
        } else {
          pushError("Deck creation failed. Try again later.");
        }
      });
  };

  // Attempt to delete a deck and remove it from display if successful
  const removeDeck = (id) => {
    axios
      .delete(`/api/decks/${id}`)
      .then(() => {
        clearErrors();
        setDecks(decks.filter((deck) => deck.id !== id));
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          pushError(
            "Deletion failed: only the deck owner may delete a deck. If you are the owner, you may need to log in."
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


  return (
    <>
      <DecksTopSection createDeck={createDeck} toggleAddingDeck={toggleAddingDeck} addingDeck={addingDeck} />
      {loaded && (
        <DeckTilesContainer>
          {decks.map((deck) => {
            return (
              <DeckTile key={deck.id} deck={deck} removeDeck={removeDeck} />
            );
          })}
        </DeckTilesContainer>
      )}
    </>
  );
};

export default Decks;
