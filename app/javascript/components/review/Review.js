import React, { useState, useEffect } from "react";
import ReviewTitle from "./ReviewTitle";
import styled from "styled-components";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TilePara } from "../styled/SharedStyledComponents";
import { RedButton } from "../styled/ButtonStyledComponents";
import { useParams } from "react-router-dom";
import { isEmpty } from "../utility/Utils";
import { parseDeck } from "../utility/Parsers";
import {
  CenteredButtonContainer,
  BlueButton,
} from "../styled/ButtonStyledComponents";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
  font-size: 2rem;
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

const Review = ({ pushError, clearErrors, pushAlert, clearAlerts }) => {
  const history = useHistory();
  const { id } = useParams();
  // Initialise deck as an empty object
  const [deck, setDeck] = useState({});
  // Track whether page is loading, initially true
  const [loading, setLoading] = useState(true);
  const [visibleSide, setVisibleSide] = useState("front");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Get the relevant deck with the ID obtained from URL params
  useEffect(() => {
    axios
      .get(`/api/decks/${id}`)
      .then((response) => {
        clearErrors();
        const parsedDeck = parseDeck(
          response.data.data,
          response.data.included
        );
        setDeck(parsedDeck);
      })
      .catch(() =>
        pushError(`Deck with id ${id} does not exist or could not be accessed`)
      )
      .finally(() => setLoading(false));
  }, [id]);

  // Alert loading while loading, then clear alerts
  useEffect(() => {
    loading ? pushAlert("Loading...") : clearAlerts();
  }, [loading]);

  // Listen for keypresses to navigate through deck and flip card
  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [deck, visibleSide, currentCardIndex]);

  // Handle a keypress, destructuring the key code from the event
  const handleKeypress = ({ code }) => {
    switch (code) {
      case "ArrowLeft":
        prevCard();
        break;
      case "ArrowRight":
        nextCard();
        break;
      case "Space":
      case "ArrowUp":
      case "ArrowDown":
        flipCard();
        break;
    }
  };

  // Navigate to the previous card if not at the start of the deck
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setVisibleSide("front");
    }
  };

  // Navigate to the next card if not at the end of the deck
  const nextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setVisibleSide("front");
    }
  };

  // Flip the current card
  const flipCard = () =>
    setVisibleSide(visibleSide === "front" ? "back" : "front");

  const closeInstructions = () => setShowInstructions(false);

  return (
    <>
      <ReviewTitle />
      <CenteredButtonContainer style={{ margin: "2rem 0" }}>
        <BlueButton onClick={() => history.push(`/decks/${deck.id}`)}>
          BACK TO DECK
        </BlueButton>
      </CenteredButtonContainer>
      {/* Display instructions unless closed */}
      {showInstructions && (
        <ReviewInstructionsContainer>
          <CloseInstructionsButton onClick={closeInstructions}>
            X
          </CloseInstructionsButton>
          <ReviewInstructionsPara>
            Use the onscreen arrows or the left and right arrow keys on your
            keyboard to navigate through the deck. Click the card or press
            space, up or down on your keyboard to flip the card over.
          </ReviewInstructionsPara>
        </ReviewInstructionsContainer>
      )}
      {!loading &&
        !isEmpty(deck) &&
        (deck.cards.length > 0 ? (
          <>
            <ReviewContainer>
              <ReviewArrowContainer onClick={prevCard}>
                <BiLeftArrow size={50} color="#8BB4D9" />
              </ReviewArrowContainer>
              <ReviewBlock onClick={flipCard}>
                <ReviewBlockHeader>
                  <ReviewBlockHeading>{deck.title}</ReviewBlockHeading>
                  <ReviewBlockSubheading>{visibleSide}</ReviewBlockSubheading>
                </ReviewBlockHeader>
                <ReviewBlockBody>
                  <ReviewPara>
                    {deck.cards[currentCardIndex][visibleSide]}
                  </ReviewPara>
                </ReviewBlockBody>
              </ReviewBlock>
              <ReviewArrowContainer onClick={nextCard}>
                <BiRightArrow size={50} color="#8BB4D9" />
              </ReviewArrowContainer>
            </ReviewContainer>
            <ReviewFooter>
              {currentCardIndex + 1} / {deck.cards.length}
            </ReviewFooter>
          </>
        ) : (
          <EmptyNotice>
            "{deck.title}" does not contain any cards to review! Try adding some
            cards first.
          </EmptyNotice>
        ))}
    </>
  );
};

export default Review;
