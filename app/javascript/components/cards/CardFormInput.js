import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
`

const CardFormInput = ({side, cardData, register, errors, formId}) => {
  return (
    <>
      <Input
        defaultValue={cardData.attributes[side]}
        {...register(side, { required: true, maxLength: 200 })}
        form={formId}
      />
      <br />
      {errors[side]?.type === "required" && (
        <>
          <span style={{ color: "red" }}>The {side} field cannot be empty</span>
          <br />
        </>
      )}
      {errors[side]?.type === "maxLength" && (
        <>
          <span style={{ color: "red" }}>Content cannot exceed 200 characters</span>
          <br />
        </>
      )}
    </>
  );
};

export default CardFormInput;
