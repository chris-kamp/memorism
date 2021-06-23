import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
`

const CardFormInput = ({side, cardData, register, errors}) => {
  return (
    <>
      <Input
        defaultValue={cardData.attributes[side]}
        {...register(side, { required: true })}
        form="editCardForm"
      />
      <br />
      {errors.back && (
        <>
          <span style={{ color: "red" }}>The {side} field cannot be empty</span>
          <br />
        </>
      )}
    </>
  );
};

export default CardFormInput;
