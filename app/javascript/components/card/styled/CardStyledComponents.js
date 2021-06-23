import styled from "styled-components"

const CardContainer = styled.div`
  border: 2px solid #66a8c4;
  margin-bottom: 0.5rem;
  display: flex;
  border-radius: 0.25em;
`;

const CardSectionLeft = styled.div`
  width: 50%;
  border-right: 2px solid gray;
`;

const CardSectionRight = styled(CardSectionLeft)`
  border: none;
`;

const CardSectionHeader = styled.div`
  width: 100%;
  background-color: #d2ecf9;
  position: relative;
`;

const CardSectionHeading = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  display: inline-block;
  width: 100%;
`;

const CardSectionBody = styled.div`
  padding: 0.5rem;
  background-color: #e1f2f9;
`;

export {
  CardContainer,
  CardSectionLeft,
  CardSectionRight,
  CardSectionHeader,
  CardSectionHeading,
  CardSectionBody,
};
