import React from "react";
import {
  ErrorSection,
  FlashHeading,
  FlashItem,
} from "../styled/FlashStyledComponents";

const FlashError = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <ErrorSection>
          <FlashHeading>Error:</FlashHeading>
          <ul>
            {errors.map((error, index) => {
              return <FlashItem key={`error${index}`}>{error}</FlashItem>;
            })}
          </ul>
        </ErrorSection>
      )}
    </>
  );
};

export default FlashError;
