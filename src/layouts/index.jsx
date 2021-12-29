import React from "react";

function Layout({ children, bg, mb }) {

  const style = {
    maxWidth: "1548px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div className="container-layout" style={{ background: bg, marginBottom: mb }}>
      <div style={style}>{children}</div>
    </div>
  );
}

export default Layout;
