import styled from "styled-components";
import { TilePara } from "../styled/SharedStyledComponents";
import { RedButton } from "../styled/ButtonStyledComponents";

const ReviewContainer = styled.section`
  width: 640px;
  height: 480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
`;

const ReviewArrowContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
  background-color: rgba(80, 117, 191, 10%);
  &:hover {
    background-color: rgba(80, 117, 191, 20%);
  }
  &:active {
    background-color: rgba(80, 117, 191, 30%);
  }
`;

const ReviewBlock = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
`;

const ReviewBlockHeader = styled.header`
  background-color: #6080bf;
  text-align: center;
`;

const ReviewBlockHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const ReviewBlockSubheading = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

const ReviewBlockBody = styled.div`
  background-color: #d9d9d9;
  color: #020723;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReviewPara = styled(TilePara)`
  text-align: center;
  font-size: 1.5rem;
`;

const ReviewFooter = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const EmptyNotice = styled.p`
  font-size: 3rem;
  text-align: center;
`;

const ReviewInstructionsContainer = styled.div`
  width: 640px;
  background-color: #8bb4d9;
  border-radius: 0.5rem;
  margin: 0 auto 2rem auto;
  display: grid;
  grid-template-columns: 1fr 2rem;
  grid-template-rows: 2rem 1fr;
`;

const ReviewInstructionsPara = styled.p`
  color: #020723;
  font-size: 1.2rem;
  grid-row: 2 / span 1;
  grid-column: 1 / span 2;
  margin-bottom: 0;
`;

const CloseInstructionsButton = styled(RedButton)`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
`;

export {
  ReviewContainer,
  ReviewArrowContainer,
  ReviewBlock,
  ReviewBlockHeader,
  ReviewBlockHeading,
  ReviewBlockSubheading,
  ReviewBlockBody,
  ReviewPara,
  ReviewFooter,
  EmptyNotice,
  ReviewInstructionsContainer,
  ReviewInstructionsPara,
  CloseInstructionsButton,
};
