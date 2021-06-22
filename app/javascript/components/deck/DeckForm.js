import React from "react";
import { useForm } from "react-hook-form";

const DeckForm = ({ deck, toggleEditable, editDeck }) => {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => editDeck(data))}>
      <input
        id="title"
        defaultValue={deck.title}
        {...register("title", { required: true })}
        style={{ fontSize: "2.5rem" }}
      />
      <br />
      {errors.title && (
        <><span style={{ color: "red" }}>Title cannot be empty</span><br /></>
      )}
      <br />
      <input
        type="radio"
        id="public-true"
        value="true"
        defaultChecked={deck.public}
        {...register("isPublic", { required: true })}
        style={{ margin: "0 0.25rem" }}
      />
      <label htmlFor="public-true">Public</label>
      <input
        type="radio"
        id="public-false"
        value="false"
        defaultChecked={!deck.public}
        {...register("isPublic", { required: true })}
        style={{ margin: "0 0.25rem" }}
      />
      <label htmlFor="public-false">Private</label>
      <br />
      <input
        id="description"
        defaultValue={deck.description}
        {...register("description", { required: true })}
      />
      <br />
      {errors.description && (
        <span style={{ color: "red" }}>Description cannot be empty</span>
      )}
      <br />
      <input type="submit" value="Confirm" />
      <button type="button" onClick={toggleEditable}>Cancel</button>
    </form>
  );
};

export default DeckForm;
