import {
	ReactNode,
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";

type Client = {
	name: string;
	email: string;
	address: string;
};

type Product = {
	name: string;
	imageUrl: string;
	price: number;
};

interface Database {
	clients: Client[];
	products: Product[];
}

interface InventoryContextData {
	database: Database;
	setDatabase: Dispatch<SetStateAction<Database>>;
}

interface InventoryProviderProps {
	children: ReactNode;
}

export const InventoryContext = createContext({} as InventoryContextData);

export default function InventoryProvider({
	children,
}: InventoryProviderProps) {
	const [database, setDatabase] = useState({
		clients: [],
		products: [],
	} as Database);

	useEffect(() => {
		const initInventory = '{"clients":[], "products":[]}';
		const inventory = localStorage.getItem("inventory");
		if (!inventory) {
			localStorage.setItem("inventory", initInventory);
			return setDatabase(JSON.parse(initInventory));
		}
		return setDatabase(JSON.parse(inventory));
	}, []);

	return (
		<InventoryContext.Provider
			value={{
				database,
				setDatabase,
			}}
		>
			{children}
		</InventoryContext.Provider>
	);
}
