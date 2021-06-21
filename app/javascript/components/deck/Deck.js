import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../card/Card";

const Deck = () => {
  // Get deck id from URL params using a react-router-dom method
  const { id } = useParams();
  // Initialise deck as an empty object
  const [deck, setDeck] = useState({});
  // Initialise cards as an empty array
  const [cardIds, setCardIds] = useState([]);

  // Helper function to check if object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  // Get the deck with the ID obtained from URL params
  useEffect(() => {
    axios
      .get(`/api/decks/${id}`)
      .then((response) => {
        setDeck(response.data.data.attributes);
        setCardIds(response.data.data.relationships.cards.data.map((card) => {
          return card.id
        }))
      })
      .catch((error) => console.log(error));
  }, [id, cardIds.length]);

  // Map card ids to Card components for rendering
  const cardsList = cardIds.map((cardId) => (<Card id={cardId} key={cardId} />)
  )

  return (
    <div>
      {isEmpty(deck) ? (<p>Deck with id {id} does not exist or could not be accessed</p>) : (<><h1>{deck.title}</h1>
      <p className="font-weight-bold">{deck.public ? "(Public)" : "(Private)"}</p>
      <p>{deck.description}</p>
      <h3>Cards:</h3>
      <div>
        {cardIds.length === 0 ? (<p>Deck is currently empty</p>) : cardsList}
      </div></>)}
    </div>
  );
};

export default Deck;
