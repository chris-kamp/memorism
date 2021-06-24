import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import NewDeckForm from "./deck/NewDeckForm";

const Decks = ({ pushError, clearErrors }) => {
  const [decks, setDecks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [addingDeck, setAddingDeck] = useState(false);

  const toggleAddingDeck = () => setAddingDeck(!addingDeck);

  // Get data for all decks, and update state accordingly
  useEffect(() => {
    let mounted = true;
    axios
      .get("/api/decks")
      .then((response) => {
        // Update state only if component is mounted
        if (mounted) {
          setDecks(response.data.data);
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

  const createDeck = ({ title, description, isPublic }) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .post("/api/decks", {
        title,
        description,
        public: isPublic,
      })
      .then((response) => {
        clearErrors();
        setDecks([...decks, response.data.data]);
        toggleAddingDeck();
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

  const removeDeck = (id) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .delete(`/api/decks/${id}`)
      .then(() => {
        clearErrors();
        setDecks(
          decks.reduce((arr, deck) => {
            if (deck.id !== id) {
              arr.push(deck);
            }
            return arr;
          }, [])
        );
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

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h1>Decks</h1>
      {/* Condiitonally display button to reveal deck creation form or the form itself */}
      {addingDeck ? (
        <NewDeckForm
          createDeck={createDeck}
          toggleAddingDeck={toggleAddingDeck}
        />
      ) : (
        <button
          type="button"
          onClick={toggleAddingDeck}
          style={{ marginBottom: "1rem" }}
        >
          Add a Deck
        </button>
      )}
      {loaded && (
        <div style={{ width: "max-content" }}>
          {decks.map((deck) => (
            <p
              key={deck.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link to={`/decks/${deck.id}`}>{deck.attributes.title}</Link>
              <button
                style={{ marginLeft: "1rem" }}
                onClick={() => removeDeck(deck.id)}
              >
                X
              </button>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Decks;
