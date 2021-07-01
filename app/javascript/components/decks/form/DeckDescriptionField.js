import React from "react";
import { ErrorPara } from "../../styled/SharedStyledComponents";
import {
  TopLabel,
  DescriptionTextArea,
} from "../../styled/NewDeckStyledComponents";
const DeckDescriptionField = ({ formId, fieldId, register, errors }) => {
  return (
    <>
      <TopLabel htmlFor={fieldId}>Description:</TopLabel>
      <div style={{ marginBottom: "0.5rem" }}>
        <DescriptionTextArea
          id={fieldId}
          {...register("description", { required: true, maxLength: 100 })}
          form={formId}
        />
        {errors.description?.type === "required" && (
          <ErrorPara>Please provide a description</ErrorPara>
        )}
        {errors.description?.type === "maxLength" && (
          <ErrorPara>Title must not exceed 100 characters</ErrorPara>
        )}
      </div>
    </>
  );
};

export default DeckDescriptionField;
