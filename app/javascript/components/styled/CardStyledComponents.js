import styled from "styled-components"

const CardContainer = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  border-radius: 0.25em;
  overflow: hidden;
`;

const CardSectionLeft = styled.div`
  width: 50%;
  border-right: 2px solid #324759;
`;

const CardSectionRight = styled(CardSectionLeft)`
  border: none;
`;

const CardSectionHeader = styled.div`
  width: 100%;
  background-color: #6080BF;
  position: relative;
  height: 2rem;
`;

const CardSectionHeading = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  display: inline-block;
  width: 100%;
`;

const CardSectionBody = styled.div`
  padding: 0.5rem;
  background-color: #D9D9D9;
  color: #020723;
`;

export {
  CardContainer,
  CardSectionLeft,
  CardSectionRight,
  CardSectionHeader,
  CardSectionHeading,
  CardSectionBody,
};
