import styled from "styled-components";

const TopSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

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

const BlockHeading = styled.h2`
  display: inline-block;
  width: auto;
  margin: 0 auto;
  font-size: 2rem;
  font-weight: bold;
`

const TileHeading = styled(BlockHeading)`
  text-decoration: underline;
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
  TopSection,
  BlockHeading,
};
