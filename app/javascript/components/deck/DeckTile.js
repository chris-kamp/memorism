import React from "react";
import {
  CornerButtonContainer,
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
import DeckCardsSpan from "./DeckCardsSpan";

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
        <CornerButtonContainer>
          <RedButton onClick={(() => removeDeck(deck.id))}>X</RedButton>
        </CornerButtonContainer>
      </TileHeader>
      <TileBody>
        <TileSubheader>
          <DeckCardsSpan deck={deck} />
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
