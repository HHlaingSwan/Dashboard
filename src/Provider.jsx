import React from "react";

import DataContextProvider from "./Context/DataContext";

const Provider = ({ children }) => {
	return <DataContextProvider>{children}</DataContextProvider>;
};

export default Provider;
