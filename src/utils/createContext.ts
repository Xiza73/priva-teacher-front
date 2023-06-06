import React from "react";

export const createContext = <T>(initialContext: T) => {
  const context = React.createContext<T>(initialContext);

  const useContext = () => {
    try {
      const ctx = React.useContext(context);
      if (!ctx)
        throw new Error("useContext must be inside a Provider with a value");

      return ctx;
    } catch (error) {
      console.error(error);
      return initialContext;
    }
  };

  return [context, useContext] as const;
};
