import React, { useState, useEffect } from "react";
import axios from "axios";
import DeckTilesContainer from "./deck/DeckTilesContainer";
import DeckTile from "./deck/DeckTile";
import DecksTopSection from "./deck/DecksTopSection";
import { parseDeck, parseDecks } from "./utility/Parsers";

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
        setDecks([
          ...decks,
          parseDeck(response.data.data, response.data.included),
        ]);
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
      <DecksTopSection
        createDeck={createDeck}
        toggleAddingDeck={toggleAddingDeck}
        addingDeck={addingDeck}
      />
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
