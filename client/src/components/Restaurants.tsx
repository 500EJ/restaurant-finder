import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import useRestaurants from "../context/RestaurantsContext";

export default function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useRestaurants();

  const updateHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    navigate(`/restaurants/${id}/edit`);
  };

  const deleteHandler = async (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    try {
      const response = await fetch(`/api/restaurants/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table
      className="table table-dark table-hover text-center mx-auto align-middle"
      style={{ width: "90%" }}
    >
      <thead>
        <tr className="table-primary">
          <th scope="col">Restaurant</th>
          <th scope="col">Location</th>
          <th scope="col">Price Range</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map(restaurant => (
          <tr
            onClick={() => navigate(`/restaurants/${restaurant.id}`)}
            key={restaurant.id}
          >
            <td>{restaurant.name}</td>
            <td>{restaurant.location}</td>
            <td>{"$".repeat(restaurant.price_range)}</td>
            <td>
              <button
                onClick={event => updateHandler(event, restaurant.id)}
                className="btn btn-warning"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={event => deleteHandler(event, restaurant.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
