import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPasswordCustom = ({
  name,
  label,
  formik,
  dir = "rtl",
  isRequired = true,
  variant = "flat",
  defaultValue = "",
}) => {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      id={name}
      name={name}
      type={isVisible ? "text" : "password"}
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
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={()=>setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
    // <Input
    //   className="max-w-xs"
    //   endContent={
    //     <button
    //       aria-label="toggle password visibility"
    //       className="focus:outline-none"
    //       type="button"
    //       onClick={toggleVisibility}
    //     >
    //       {isVisible ? (
    //         <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    //       ) : (
    //         <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    //       )}
    //     </button>
    //   }
    //   label="Password"
    //   placeholder="Enter your password"
    //   type={isVisible ? "text" : "password"}
    //   variant="bordered"
    // />
  );
};

export default InputPasswordCustom;
