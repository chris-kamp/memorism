import React from "react";

import { ErrorPara } from "../../styled/SharedStyledComponents";
import { TitleInput, TitleLabel } from "../../styled/NewDeckStyledComponents";

const DeckTitleField = ({ formId, fieldId, required, register, errors }) => {
  return (
    <>
      <TitleLabel htmlFor="newDeckTitle">TITLE:</TitleLabel>
      <div>
        <TitleInput
          id={fieldId}
          {...register("title", { required: required })}
          form={formId}
        />
        {errors.title && <ErrorPara>Please provide a title</ErrorPara>}
      </div>
    </>
  );
};

export default DeckTitleField;
