import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
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

  const createDeck = ({title, description, isPublic}) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .post("/api/decks", {
        title,
        description,
        public: isPublic
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

  const removeDeck = (id) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .delete(`/api/decks/${id}`)
      .then(() => {
        setDecks(
          decks.reduce((arr, deck) => {
            if (deck.id !== id) {
              arr.push(deck);
            }
            return arr;
          }, [])
        );
      })
      .catch((error) => console.log(error));
  };

  // react-hook-form setup
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      {loaded && (
        <ul style={{width: "max-content"}}>
          {decks.map((deck) => (
            <li key={deck.id} style={{display: "flex", justifyContent: "space-between"}}>
              <Link to={`/decks/${deck.id}`}>{deck.attributes.title}</Link>
              <button style={{marginLeft: "1rem"}} onClick={() => removeDeck(deck.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSubmitEdit}>Edit the first deck!</button>
      <h2>New Deck</h2>
      <form onSubmit={handleSubmit((data) => createDeck(data))}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title", {required: true })} />
        <br />
        {errors.title && <span style={{color: "red"}}>Please provide a title</span>}
        <br />
        <label htmlFor="description">Description</label>
        <input id="description" {...register("description", {required: true })} />
        <br />
        {errors.description && <span style={{color: "red"}}>Please provide a description</span>}
        <br />
        <input type="radio" id="public-true" value="true" {...register("isPublic", {required: true})} />
        <label htmlFor="public-true">Public</label>
        <input type="radio" id="public-false" value="false" defaultChecked {...register("isPublic", {required: true})} />
        <label htmlFor="public-false">Private</label>
        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  );
};

export default Decks;
