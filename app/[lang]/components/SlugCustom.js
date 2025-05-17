import React from "react";
import { Input } from "@nextui-org/react";

const SlugCustom = ({ inputName, valueName, label, formik }) => {
  return (
    <Input
      id={inputName}
      isRequired
      isDisabled
      type="text"
      label={label}
      variant="bordered"
      value={
        (formik.values[inputName] = formik.values[valueName]
          .toLowerCase()
          .replace(/[(<{}>)._,،.*&$^#@%|:;'"?؟!/\s]+/g, "-")
          .replace(/[-]{2,}/g, "-")
          .replace(/[-]$/, ""))
      }
      {...formik.getFieldProps(inputName)}
      className="hidden"
    />
  );
};

export default SlugCustom;
