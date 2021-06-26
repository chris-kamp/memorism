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
          <TileHeading className="m-0">{deck.attributes.title}</TileHeading>
        </Link>
        <TileSpan>Username</TileSpan>
        <ButtonContainer>
          <RedButton onClick={(() => removeDeck(deck.id))}>X</RedButton>
        </ButtonContainer>
      </TileHeader>
      <TileBody>
        <TileSubheader>
          <TileSpan># Cards</TileSpan>
          <TileSpan>{deck.attributes.public ? "Public" : "Private"}</TileSpan>
        </TileSubheader>
        <TilePara>
          {truncate(
            deck.attributes.description,
            100
          )}
        </TilePara>
      </TileBody>
    </Tile>
  );
};

export default DeckTile;
