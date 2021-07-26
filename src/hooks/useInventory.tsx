import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

export default function useInventory() {
	return useContext(InventoryContext);
}
