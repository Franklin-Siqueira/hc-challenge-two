import { BrowserRouter, Route, Switch as Routes } from "react-router-dom";
import Header from "./components/Header";
import NewClient from "./components/NewClient";
import NewProduct from "./components/NewProduct";
import Home from "./pages/Home";

import InventoryProvider from "./contexts/InventoryContext";

function App() {
	return (
		<BrowserRouter>
			<InventoryProvider>
				<Header />
				<Routes>
					<Route path="/" exact component={Home} />
					<Route path="/newclient" component={NewClient} />
					<Route path="/newproduct" component={NewProduct} />
				</Routes>
			</InventoryProvider>
		</BrowserRouter>
	);
}

export default App;
