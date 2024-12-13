import { createContext, useEffect, useState } from "react";
import { item } from "../data";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
	const [data, setData] = useState(item);

	return (
		<DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
	);
};

export default DataContextProvider;
