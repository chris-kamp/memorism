import React from "react";
import {
  LeftLabel,
  VisibilitySelect,
} from "../../styled/NewDeckStyledComponents";
const DeckVisibilityField = ({ formId, fieldId, register }) => {
  return (
    <div>
      <LeftLabel htmlFor="isPublic">Visibility: </LeftLabel>
      <VisibilitySelect
        id={fieldId}
        {...register("isPublic")}
        form={formId}
      >
        <option value="true">Public</option>
        <option value="false">Private</option>
      </VisibilitySelect>
    </div>
  );
};

export default DeckVisibilityField;
