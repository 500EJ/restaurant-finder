import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useRestaurants from "../context/RestaurantsContext";

export default function RestaurantForm({ restaurant }: Props) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useRestaurants();
  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [priceRange, setPriceRange] = useState(restaurant.price_range);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !location || !Number(priceRange)) return;
    const newRestaurant = { name, location, price_range: priceRange };
    try {
      const response = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRestaurant)
      });
      if (!response.ok) return;
      const responseJSON = await response.json();
      setRestaurants(
        restaurants.map(r => (r.id === restaurant.id ? responseJSON : r))
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="mx-auto" style={{ width: "90%" }}>
      <div className="mb-3">
        <label htmlFor="edit-restaurant__name" className="form-label">
          Name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          id="edit-restaurant__name"
          placeholder={restaurant ? restaurant.name : ""}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edit-restaurant__location" className="form-label">
          Location
        </label>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          id="edit-restaurant__location"
          placeholder={restaurant ? restaurant.location : ""}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edit-restaurant__price-range" className="form-label">
          Price Range
        </label>
        <select
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          id="edit-restaurant__price-range"
          className="form-select"
        >
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
          <option value={5}>$$$$$</option>
        </select>
      </div>
      <div>
        <button className="btn btn-primary">Update</button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-outline-secondary mx-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

interface Props {
  restaurant: Restaurant;
}
