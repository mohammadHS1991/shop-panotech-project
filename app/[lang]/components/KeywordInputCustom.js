"use client";
import React, { useState } from "react";

import customTagInputSearchFunction from "./customTagInputSearchFunction";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../reducers/productSlice";
import { selectAllEvents } from "../reducers/eventSlice";
import { selectAllNews } from "../reducers/newsSlice";

const KeywordInputCustom = ({
  state,
  setState,
  label,
  placeholder,
  dir = "rtl",
}) => {
  const products = useSelector(selectAllProducts);
  const events = useSelector(selectAllEvents);
  const news = useSelector(selectAllNews);

  const [items, setItems] = useState([]);
  const tagInput = document.getElementById(label);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      setItems(
        customTagInputSearchFunction(e.target.value, [
          ...products,
          ...events,
          ...news,
        ])
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      if (!value.trim()) return;
      setState([...state, value.trim()]);
      e.target.value = "";
      setItems([]);
    }
    if (e.key === "Backspace" && e.target.value.length === 1) {
      setItems([]);
    }
  };

  const handleClick = (e) => {
    const value = e.target.innerText;
    if (!value.trim()) return;
    setState([...state, value.trim()]);
    setItems([]);
    tagInput.value = "";
  };

  return (
    <div
      className="w-full border-2 rounded-xl border-success shadow-lg py-2 px-3 flex flex-col gap-5 group group-focus-within:shadow-success-300"
      // dir={dir}
    >
      <div className="space-y-2">
        <label className="text-success text-sm block">
          {label}{" "}
          <span className="text-xs text-warning">
            (لطفاً بعد از هر کلمه enter را بزنید.)
          </span>
        </label>
        <div className="relative w-1/3">
          <input
            id={label}
            className="rounded-lg w-full border-2 border-success shadow-md px-2 py-3 focus-within:outline-0 
              focus-within:shadow-lg group-focus-within:shadow-success-300 text-success text-sm"
            type="text"
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            dir={dir}
          />
          {items.length > 0 && (
            <ul
              id="searchItems"
              className="absolute rounded-lg p-2 top-14 left-0 right-0 border-2 border-success shadow-lg
              shadow-success/30 bg-white w-auto z-50 max-h-40 overflow-y-auto scroll-smooth"
            >
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => handleClick(e)}
                    className="border-2 border-success text-success bg-white cursor-pointer py-1 px-2 rounded-lg my-2 text-sm"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 min-h-5 max-h-24 flex-wrap overflow-y-auto">
        {state.map((value, index) => (
          <div
            key={index}
            className="border-2 border-success text-success rounded-lg px-2 py-1 flex items-center justify-center gap-2 text-sm"
          >
            <span>{value}</span>
            <span
              className="rounded-full text-warning flex items-center justify-center cursor-pointer pt-1"
              onClick={() =>
                setState((prev) => prev.filter((item) => item !== prev[index]))
              }
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordInputCustom;
