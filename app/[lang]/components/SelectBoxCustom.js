import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { vazirFD } from "../fonts/font";

//? selectItems most be in this format: [{ id: "id", key: "key", value: "value" },{ id: "id", key: "key", value: "value" }]
const SelectBoxCustom = ({
  name,
  label,
  formik,
  selectItems,
  defaultSelectedKeys = [],
  autoFocus = false,
  isRequired = true,
}) => {
  return (
    <Select
      id={name}
      name={name}
      label={label}
      autoFocus={autoFocus}
      isRequired={isRequired}
      className="w-full"
      defaultSelectedKeys={defaultSelectedKeys}
      isInvalid={formik.touched[name] && formik.errors[name] ? true : false}
      errorMessage={formik.touched[name] && formik.errors[name]}
      {...formik.getFieldProps(name)}
    >
      {selectItems.map((selectItem) => (
        <SelectItem key={selectItem.key} className={`${vazirFD.className}`}>
          {selectItem.value}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectBoxCustom;
