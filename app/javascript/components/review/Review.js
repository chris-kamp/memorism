import React, { useState, useEffect } from "react";
import ReviewTitle from "./ReviewTitle";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { isEmpty } from "../utility/Utils";
import { parseDeck } from "../utility/Parsers";
import {
  CenteredButtonContainer,
  BlueButton,
} from "../styled/ButtonStyledComponents";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReviewInstructions from "./ReviewInstructions";
import {
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
} from "../styled/ReviewStyledComponents";

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
      {!loading && !isEmpty(deck) && <CenteredButtonContainer style={{ margin: "2rem 0" }}>
        <BlueButton onClick={() => history.push(`/decks/${deck.id}`)}>
          BACK TO DECK
        </BlueButton>
      </CenteredButtonContainer>}
      {/* Display instructions unless closed or deck is empty */}
      {showInstructions && !loading && !isEmpty(deck) && deck.cards.length > 0 && (
        <ReviewInstructions {...{ closeInstructions }} />
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
