import React from "react";
import { useForm } from "react-hook-form";

const NewDeckForm = ({createDeck, toggleAddingDeck }) => {
    // react-hook-form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  return (
    <>
      <h2>New Deck</h2>
      <form onSubmit={handleSubmit((data) => createDeck(data))}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title", { required: true })} />
        <br />
        {errors.title && (
          <span style={{ color: "red" }}>Please provide a title</span>
        )}
        <br />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          {...register("description", { required: true })}
        />
        <br />
        {errors.description && (
          <span style={{ color: "red" }}>Please provide a description</span>
        )}
        <br />
        <input
          type="radio"
          id="public-true"
          value="true"
          {...register("isPublic", { required: true })}
          style={{ margin: "0 0.25rem" }}
        />
        <label htmlFor="public-true">Public</label>
        <input
          type="radio"
          id="public-false"
          value="false"
          defaultChecked
          {...register("isPublic", { required: true })}
          style={{ margin: "0 0.25rem" }}
        />
        <label htmlFor="public-false">Private</label>
        <br />
        <input type="submit" value="Create" style={{marginRight: "0.5rem"}} />
        <button type="button" onClick={toggleAddingDeck}>Cancel</button>
      </form>
    </>
  );
};

export default NewDeckForm;
