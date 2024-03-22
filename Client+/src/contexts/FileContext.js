import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [userFiles, setUserFiles] = useState([]);

  const value = {
    userFiles,
    setUserFiles,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFile = () => {
  return useContext(FileContext);
};
