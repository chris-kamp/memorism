import styled from "styled-components";

const Tile = styled.section`
  width: 24rem;
  height: 12rem;
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 0.25rem;
  overflow: hidden;
  margin: 0 auto;
`;

const TileHeader = styled.header`
  background-color: #6080bf;
  text-align: center;
  position: relative;
`;

const TileHeading = styled.h2`
  display: inline-block;
  width: auto;
  text-decoration: underline;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.03);
  }
`;

const TileSpan = styled.span`
  font-weight: bold;
  display: block;
`;

const TileBody = styled.div`
  background-color: #d9d9d9;
  color: #020723;
  padding: 0.5rem;
`;

const TileSubheader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TilePara = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
`;

const GridContainer = styled.div`
  max-width: 1280px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  margin: 0 auto;
`;

export {
  Tile,
  TileHeader,
  TileHeading,
  TileSpan,
  TileBody,
  TileSubheader,
  TilePara,
  GridContainer,
};
