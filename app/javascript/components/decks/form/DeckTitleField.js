import React from "react";

import { ErrorPara } from "../../styled/SharedStyledComponents";
import { TitleInput, TitleLabel } from "../../styled/NewDeckStyledComponents";

const DeckTitleField = ({ formId, fieldId, register, errors }) => {
  return (
    <>
      <TitleLabel htmlFor={fieldId}>TITLE:</TitleLabel>
      <div>
        <TitleInput
          id={fieldId}
          {...register("title", { required: true, maxLength: 20 })}
          form={formId}
        />
        {errors.title?.type === "required" && <ErrorPara>Please provide a title</ErrorPara>}
        {errors.title?.type === "maxLength" && <ErrorPara>Title must not exceed 20 characters</ErrorPara>}
      </div>
    </>
  );
};

export default DeckTitleField;
