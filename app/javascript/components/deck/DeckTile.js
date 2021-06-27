import React from "react";
import {
  ButtonContainer,
  YellowButton,
  RedButton,
} from "../styled/ButtonStyledComponents";
import { Link } from "react-router-dom";
import {
  Tile,
  TileHeader,
  TileHeading,
  TileSpan,
  TileBody,
  TileSubheader,
  TilePara,
} from "../styled/DeckStyledComponents";

const truncate = (str, len) => str.length > len ? str.substring(0, len) + "..." : str;

const DeckTile = ({ deck, removeDeck }) => {
  return (
    <Tile>
      <TileHeader>
        <Link
          to={`/decks/${deck.id}`}
          style={{ color: "#F5F5F5", textDecoration: "underline" }}
        >
          <TileHeading className="m-0">{deck.title}</TileHeading>
        </Link>
        <TileSpan>{deck.user.username}</TileSpan>
        <ButtonContainer>
          <RedButton onClick={(() => removeDeck(deck.id))}>X</RedButton>
        </ButtonContainer>
      </TileHeader>
      <TileBody>
        <TileSubheader>
          <TileSpan>{deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}</TileSpan>
          <TileSpan>{deck.public ? "Public" : "Private"}</TileSpan>
        </TileSubheader>
        <TilePara>
          {truncate(
            deck.description,
            100
          )}
        </TilePara>
      </TileBody>
    </Tile>
  );
};

export default DeckTile;
