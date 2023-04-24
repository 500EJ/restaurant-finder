import { FormEvent, useState } from "react";
import useRestaurants from "../context/RestaurantsContext";

export default function AddRestaurant() {
  const [restaurants, setRestaurants] = useRestaurants();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(0);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !location || !Number(priceRange)) return;
    const restaurant = { name, location, price_range: priceRange };
    try {
      const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurant)
      });
      if (!response.ok) return;
      const responseJSON: Restaurant = await response.json();
      setRestaurants(restaurants.concat(responseJSON));
      setName("");
      setLocation("");
      setPriceRange(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="row mx-auto mb-3"
      style={{ width: "90%" }}
      onSubmit={submitHandler}
    >
      <div className="col" style={{ paddingLeft: "0" }}>
        <input
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          placeholder="Location"
          className="form-control"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <div className="col">
        <select
          className="form-select"
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
        >
          <option disabled value={0}>
            Price Range
          </option>
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
          <option value={5}>$$$$$</option>
        </select>
      </div>
      <div className="col-auto" style={{ paddingRight: "0" }}>
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
}
