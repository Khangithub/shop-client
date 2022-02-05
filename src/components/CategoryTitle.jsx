import React from "react";
import SeeMoreLink from "./SeeMoreLink";

function CategoryTitle({ title, btnText, link }) {
  return (
    <div className="category-title">
      <h1>{title}</h1>

      <SeeMoreLink btnText={btnText} link={link} />
    </div>
  );
}

export default CategoryTitle;
