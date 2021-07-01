import React from "react";

const SortSelect = ({options, value, setSortBy}) => {
  return (
    <>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 1rem auto",
          paddingLeft: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            marginRight: "0.5rem",
            fontSize: "1.5rem",
          }}
        >
          Sort by:{" "}
        </span>
        <select value={value} onChange={(e) => setSortBy(e.target.value)}>
          {options.map(option => (
            <option key={option.display} value={option.value}>{option.display}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SortSelect;
