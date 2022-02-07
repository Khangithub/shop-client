import React from "react";
import "./_seeMoreLink.scss";
import { useHistory } from "react-router-dom";

function SeeMoreLink({ btnText, link, align = "left" }) {
  const history = useHistory();

  return (
    <h5
      className="see-more-link"
      onClick={() => history.push(link)}
      style={{ textAlign: align }}
    >
      {btnText}
    </h5>
  );
}

export default SeeMoreLink;
