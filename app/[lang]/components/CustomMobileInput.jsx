"use client";
import React, { useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import "./styleCustomMobileInput.css";
import { Input } from "@nextui-org/react";
import { countries } from "../data/data";

const CustomMobileInput = ({
  name,
  label,
  formik,
  selected,
  setSelected,
  setCode,
  setCountry,
  lang = "fa",
  isRequired = false,
  isReadOnly = false,
  placeholder = "9012345678",
  defaultValue='',
  variant='flat'
}) => {

  useEffect(() => {
    setCode(countries[selected].primary);
    setCountry(countries[selected].name);
  }, [selected]);

  return (
    <Input
      id={name}
      dir="ltr"
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      type="text"
      defaultValue={defaultValue}
      label={label}
      placeholder={placeholder}
      variant={variant}
      errorMessage={formik.touched[name] && formik.errors[name]}
      isInvalid={formik.touched[name] && formik.errors[name]?true:false}
      {...formik.getFieldProps(name)}
      onFocus={(e) => e.target.select()}
      className='my-2'
      startContent={
        lang === "en" && (
          <ReactFlagsSelect
            id="flagInput"
            showSecondarySelectedLabel={false}
            // showOptionLabel={false}
            showSelectedLabel={false}
            showSecondaryOptionLabel={false}
            selected={selected}
            onSelect={(code) => {
              setSelected(code);
            }}
            className="!pb-0"
            countries={["IL"]}
            blacklistCountries
            searchable
            customLabels={countries}
            placeholder=""
          />
        )
      }
      endContent={
        lang !== "en" && (
          <ReactFlagsSelect
            id="flagInput"
            showSecondarySelectedLabel={false}
            // showOptionLabel={false}
            showSelectedLabel={false}
            showSecondaryOptionLabel={false}
            selected={selected}
            onSelect={(code) => {
              setSelected(code);
            }}
            className="!pb-0"
            countries={["IL"]}
            blacklistCountries
            searchable
            customLabels={countries}
            placeholder=""
          />
        )
      }
    />
  );
};

export default CustomMobileInput;
