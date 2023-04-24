import { useParams, Navigate } from "react-router-dom";
import useRestaurants from "../../context/RestaurantsContext";

export default function Restaurant() {
  const { id } = useParams();
  const restaurants = useRestaurants()[0];
  const restaurant = restaurants.find(r => r.id === id);
  return restaurant ? (
    <h1 className="display-1 text-center">{restaurant.name}</h1>
  ) : (
    <Navigate to="/" />
  );
}
