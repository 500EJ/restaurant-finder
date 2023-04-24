import { useParams, Navigate } from "react-router-dom";
import useRestaurants from "../../context/RestaurantsContext";
import RestaurantForm from "../../components/RestaurantForm";

export default function EditRestaurant() {
  const { id } = useParams();
  const restaurants = useRestaurants()[0];
  const restaurant = restaurants.find(restaurant => restaurant.id === id);
  return (
    <>
      {restaurant ? (
        <>
          <h1 className="text-center">Update {restaurant.name}</h1>
          <RestaurantForm restaurant={restaurant} />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
