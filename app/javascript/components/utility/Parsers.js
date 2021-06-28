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

export { findUser, parseUser, findCards, parseCards, parseDeck, parseDecks };
