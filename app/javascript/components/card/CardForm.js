import React from "react";
import { useForm } from "react-hook-form";

const CardForm = ({ editCard, cardData, toggleEditable }) => {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => editCard(data))}>
      <label htmlFor="front">Front: </label>
      <input
        id="front"
        defaultValue={cardData.attributes.front}
        {...register("front", { required: true })}
      />
      <br />
      {errors.front && (
        <>
          <span style={{ color: "red" }}>Front field cannot be empty</span>
          <br />
        </>
      )}
      <br />
      <label htmlFor="back">Back: </label>
      <input
        id="back"
        defaultValue={cardData.attributes.back}
        {...register("back", { required: true })}
      />
      <br />
      {errors.back && (
        <>
          <span style={{ color: "red" }}>Back field cannot be empty</span>
          <br />
        </>
      )}
      <input type="submit" value="Confirm" />
      <button type="button" onClick={toggleEditable}>
        Cancel
      </button>
    </form>
  );
};

export default CardForm;
