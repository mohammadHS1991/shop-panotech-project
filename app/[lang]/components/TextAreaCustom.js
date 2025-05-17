import { Textarea } from "@nextui-org/react";
import React from "react";

const TextAreaCustom = ({
  name,
  label,
  formik,
  dir = "rtl",
  isRequired = true,
  variant = "flat",
  defaultValue = "",
}) => {
  return (
    <Textarea
      className="my-5"
      id={name}
      name={name}
      dir={dir}
      label={label}
      defaultValue={defaultValue}
      variant={variant}
      isRequired={isRequired}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      errorMessage={formik.touched[name] && formik.errors[name]}
      isInvalid={formik.touched[name] && formik.errors[name] ? true : false}
    />
  );
};

export default TextAreaCustom;
