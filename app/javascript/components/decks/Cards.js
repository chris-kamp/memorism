import React from "react";
import Card from "../cards/Card";
import NewCard from "../cards/NewCard";
import { GreenButton } from "../styled/ButtonStyledComponents"


const Cards = ({ addingCard, toggleAddingCard, createCard, cardIds, deleteCard, pushError, clearErrors }) => {

  // Map card ids to Card components for rendering
  // For now, reverse so newest is first when adding cards
  const cardsList = cardIds
    .map((cardId) => <Card id={cardId} key={cardId} deleteCard={deleteCard} pushError={pushError} clearErrors={clearErrors} />)
    .reverse();

  return (
    <>
      {" "}
      <h3>Cards:</h3>
      <GreenButton
        type="button"
        onClick={toggleAddingCard}
        style={{ marginBottom: "0.5rem" }}
      >
        Add a Card
      </GreenButton>
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
