import React from "react";
import styled from "styled-components";
import { ButtonContainer, YellowButton, RedButton } from "../styled/ButtonStyledComponents"
import { Link } from "react-router-dom";

const Tile = styled.section`
  width: 24rem;
  height: 12rem;
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const TileHeader = styled.header`
  background-color: #6080bf;
  color: #f5f5f5;
  text-align: center;
  position: relative;
`;

const TileHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.03);
  }
`;

const TileSpan = styled.span`
  font-weight: bold;
  display: inline-block;
`;

const TileBody = styled.div`
  background-color: #D9D9D9;
  padding: 0.5rem;
`

const TileSubheader = styled.div`
  display: flex;
  justify-content: space-between;
`

const TilePara = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
  
`

const truncate = (str, len) => str.substring(0, len) + "..."

const DeckTile = ({id}) => {
  return (
    <Tile>
      <TileHeader>
        <Link to={`/decks/${id}`} style={{color: "#F5F5F5", textDecoration: "underline"}}>
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
          {truncate("Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, sunt earum autem obcaecati esse dolore provident repellendus cupiditate quibusdam atque totam minus deleniti rerum. Facilis fugit magni recusandae aliquid vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, sunt earum autem obcaecati esse dolore provident repellendus cupiditate quibusdam atque totam minus deleniti rerum. Facilis fugit magni recusandae aliquid vero!", 100)} 
        </TilePara> 
      </TileBody>
    </Tile>
  );
};

export default DeckTile;
