import React from "react";

let data = {
  loaderValue: false,
  setLoaderValue: () => {},
  loaderText: "loading...",
  setLoaderText: () => {},
};

export const LoaderContext = React.createContext(data);
