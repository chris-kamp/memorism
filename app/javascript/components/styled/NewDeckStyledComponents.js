import styled from "styled-components";

const DeckFormHeader = styled.header`
  background-color: #6080bf;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
`;

const DeckBlockContainer = styled.div`
  width: 36rem;
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  padding: 0;
  background-color: #f5f5f5;
  color: #020723;
  border: 1px solid #324759;
  border-radius: 0.25rem;
  width: 100%;
`;

const LeftLabel = styled.label`
  margin: 0 0.5rem 0 0;
  font-weight: bold;
`;

const TopLabel = styled.label`
  margin: 0 0 0.5rem 0;
  font-weight: bold;
`;

const TitleLabel = styled(LeftLabel)`
  font-size: 1.5rem;
`;

const DescriptionTextArea = styled.textarea`
  width: 100%;
  background-color: #f5f5f5;
  height: 8rem;
  vertical-align: top;
`;

const VisibilitySelect = styled.select`
  background-color: #f5f5f5;
`;

export {
  DeckFormHeader,
  DeckBlockContainer,
  TitleInput,
  LeftLabel,
  TopLabel,
  TitleLabel,
  DescriptionTextArea,
  VisibilitySelect,
};
