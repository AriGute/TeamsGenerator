import { createContext } from 'react';

interface DisplayContextType {
	toClear: Function[];
	toUpdate: Function[];
}
export const DisplayContext = createContext<DisplayContextType>({ toClear: [], toUpdate: [] });
