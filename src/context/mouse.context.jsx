import React, { createContext, useState } from "react";

export const MouseCtx = createContext();

function MouseCtxProvider({ children }) {
  const [corr, setCorr] = useState({
    xCorr: 0,
    yCorr: 0,
  });

  return (
    <MouseCtx.Provider value={{ corr, setCorr }}>{children}</MouseCtx.Provider>
  );
}

export default MouseCtxProvider;
