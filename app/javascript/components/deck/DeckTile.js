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

const truncate = (str, len) => str.substring(0, len) + "...";

const DeckTile = ({ id }) => {
  return (
    <Tile>
      <TileHeader>
        <Link
          to={`/decks/${id}`}
          style={{ color: "#F5F5F5", textDecoration: "underline" }}
        >
          <TileHeading className="m-0">Deck Title</TileHeading>
        </Link>
        <TileSpan>Username</TileSpan>
        <ButtonContainer>
          <YellowButton>E</YellowButton>
          <RedButton>X</RedButton>
        </ButtonContainer>
      </TileHeader>
      <TileBody>
        <TileSubheader>
          <TileSpan>10 Cards</TileSpan>
          <TileSpan>Public</TileSpan>
        </TileSubheader>
        <TilePara>
          {truncate(
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, sunt earum autem obcaecati esse dolore provident repellendus cupiditate quibusdam atque totam minus deleniti rerum. Facilis fugit magni recusandae aliquid vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, sunt earum autem obcaecati esse dolore provident repellendus cupiditate quibusdam atque totam minus deleniti rerum. Facilis fugit magni recusandae aliquid vero!",
            100
          )}
        </TilePara>
      </TileBody>
    </Tile>
  );
};

export default DeckTile;
