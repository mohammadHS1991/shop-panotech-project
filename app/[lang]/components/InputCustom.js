import { Input } from "@nextui-org/react";
import React from "react";

const InputCustom = ({
  name,
  label,
  formik,
  dir = "rtl",
  type = "text",
  isRequired = true,
  variant = "flat",
  defaultValue = "",
}) => {
  return (
    <Input
      id={name}
      name={name}
      type={type}
      label={label}
      dir={dir}
      variant={variant}
      defaultValue={defaultValue}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="my-2"
      isRequired={isRequired}
      errorMessage={formik.touched[name] && formik.errors[name]}
      isInvalid={formik.touched[name] && formik.errors[name] ? true : false}
    />
  );
};

export default InputCustom;
