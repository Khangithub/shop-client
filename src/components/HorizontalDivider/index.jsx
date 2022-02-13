import React from "react";

function HorizontalDevider({ line }) {
  return (
    <>
      {Array(line ? line : 2)
        .fill()
        .map((_, index) => (
          <br key={index} />
        ))}
    </>
  );
}

export default HorizontalDevider;
