import { useState } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import { RestaurantsContextProvider } from "../context/RestaurantsContext";

export default function Root() {
  const data = useLoaderData() as Restaurant[];
  data.sort((a, b) => (Number(a.id) < Number(b.id) ? -1 : 1));
  const [restaurants, setRestaurants] = useState<Restaurant[]>(data);
  return (
    <RestaurantsContextProvider value={[restaurants, setRestaurants]}>
      <Outlet />
    </RestaurantsContextProvider>
  );
}

export function rootLoader() {
  return fetch("/api/restaurants");
}
