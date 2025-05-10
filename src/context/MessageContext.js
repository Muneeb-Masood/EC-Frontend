import React, { createContext, useContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [displayMessage, setDisplayMessage] = useState("");

  return (
    <MessageContext.Provider value={{ displayMessage, setDisplayMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
