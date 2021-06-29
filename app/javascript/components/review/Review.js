import React from "react";
import ReviewTitle from "./ReviewTitle";
import styled from "styled-components";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TilePara } from "../styled/SharedStyledComponents"

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
`;

const ReviewBlock = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
`

const ReviewBlockHeader = styled.header`
  background-color: #6080BF;
  text-align: center;
`
const ReviewBlockHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
`

const ReviewBlockSubheading = styled.span`
  font-weight: bold;
`

const ReviewBlockBody = styled.div`
  background-color: #D9D9D9;
  color: #020723;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ReviewPara = styled(TilePara)`
  text-align: center;
  font-size: 1.5rem;
`

const ReviewFooter = styled.p`
  font-size: 1.5rem;
  text-align: center;
`

const Review = () => {
  return (
    <>
      <ReviewTitle />
      <ReviewContainer>
        <ReviewArrowContainer>
          <BiLeftArrow size={50} color="#8BB4D9" />
        </ReviewArrowContainer>
        <ReviewBlock>
          <ReviewBlockHeader>
            <ReviewBlockHeading>
              FRONT
            </ReviewBlockHeading>
            <ReviewBlockSubheading>
              (CLICK TO FLIP)
            </ReviewBlockSubheading>
          </ReviewBlockHeader>
          <ReviewBlockBody>
            <ReviewPara>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo repudiandae nisi praesentium consectetur modi eos? Inventore, assumenda natus delectus adipisci facilis error animi debitis officia autem repellat? Facere, vero eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </ReviewPara>
          </ReviewBlockBody>
        </ReviewBlock>
        <ReviewArrowContainer>
          <BiRightArrow size={50} color="#8BB4D9" />
        </ReviewArrowContainer>
      </ReviewContainer>
      <ReviewFooter>1 / 20</ReviewFooter>
    </>
  );
};

export default Review;
