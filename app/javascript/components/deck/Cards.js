import React from "react";
import Card from "../card/Card";
import NewCard from "../card/NewCard";



const Cards = ({ addingCard, toggleAddingCard, createCard, cardIds, deleteCard }) => {

  // Map card ids to Card components for rendering
  // For now, reverse so newest is first when adding cards
  const cardsList = cardIds
    .map((cardId) => <Card id={cardId} key={cardId} deleteCard={deleteCard} />)
    .reverse();

  return (
    <>
      {" "}
      <h3>Cards:</h3>
      <button
        type="button"
        onClick={toggleAddingCard}
        style={{ marginBottom: "0.5rem" }}
      >
        Add a Card
      </button>
      {addingCard && (
        <NewCard
          toggleAddingCard={toggleAddingCard}
          createCard={createCard}
          id="0"
        />
      )}
      {cardIds.length === 0 ? <p>Deck is currently empty</p> : cardsList}
    </>
  );
};

export default Cards;
