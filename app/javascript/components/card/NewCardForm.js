import React from 'react'
import { useForm } from "react-hook-form";


const NewCardForm = ( {createCard, toggleAddingCard} ) => {
    // react-hook-form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => createCard(data))}>
      <label htmlFor="front">Front: </label>
      <input
        id="front"
        placeholder="front"
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
        placeholder="back"
        {...register("back", { required: true })}
      />
      <br />
      {errors.back && (
        <>
          <span style={{ color: "red" }}>Back field cannot be empty</span>
          <br />
        </>
      )}
      <input type="submit" value="Create" />
      <button type="button" onClick={toggleAddingCard}>
        Cancel
      </button>
    </form>
  )
}

export default NewCardForm
