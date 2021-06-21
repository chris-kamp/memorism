import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Decks = () => {
  const [decks, setDecks] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
      .catch((error) => console.log(error));
    // Set mounted to false when component unmounted

    return () => {
      mounted = false;
    };
  }, [decks.length]);

  const handleSubmitAdd = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .post("/api/decks", {
        title: "New Deck",
        description: "This is the new description",
        public: true,
      })
      .then((response) => {
        console.log(response);
        return Promise.resolve(response);
      })
      .then((response) => setDecks([...decks, response.data.data]))
      .catch((error) => console.log(error));
  };

  const handleSubmitEdit = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .patch(`/api/decks/${decks[0].id}`, { title: "I'm a changed title" })
      .then((response) => {
        console.log(response);
        setDecks(
          decks.map((deck) => {
            return deck.id === response.data.data.id
              ? response.data.data
              : deck;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitRemove = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .delete(`/api/decks/${decks[0].id}`)
      .then((response) => {
        console.log(`Delete response: ${response}`);
        setDecks(
          decks.reduce((arr, deck) => {
            if (deck.id !== decks[0].id) {
              arr.push(deck);
            }
            return arr;
          }, [])
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {loaded && (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id}>
              <Link to={`/decks/${deck.id}`}>{deck.attributes.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSubmitAdd}>Add a deck!</button>
      <button onClick={handleSubmitEdit}>Edit the first deck!</button>
      <button onClick={handleSubmitRemove}>Remove the first deck</button>
    </>
  );
};

export default Decks;
