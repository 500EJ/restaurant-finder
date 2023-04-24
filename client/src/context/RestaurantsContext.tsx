import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode
} from "react";
import Restaurant from "../routes/restaurants/Restaurant";

type RestaurantsContextType =
  | [Restaurant[], Dispatch<SetStateAction<Restaurant[]>>]
  | undefined;
const RestaurantsContext = createContext<RestaurantsContextType>(undefined);

interface RestaurantsContextProviderProps {
  value: RestaurantsContextType;
  children: ReactNode;
}

export function RestaurantsContextProvider({
  value,
  children
}: RestaurantsContextProviderProps) {
  const [restaurant, setRestaurants] = useState<Restaurant[]>([]);
  const data = value || [restaurant, setRestaurants];
  return (
    <RestaurantsContext.Provider value={data}>
      {children}
    </RestaurantsContext.Provider>
  );
}

export default function useRestaurants() {
  const context = useContext(RestaurantsContext);
  if (!context) {
    throw new Error("useRestaurants must be used within a RestaurantProvider");
  }
  return context;
}
