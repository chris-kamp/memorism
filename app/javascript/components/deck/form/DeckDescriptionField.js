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
          {...register("description", { required: true })}
          form={formId}
        />
        {errors.description && (
          <ErrorPara>Please provide a description</ErrorPara>
        )}
      </div>
    </>
  );
};

export default DeckDescriptionField;
