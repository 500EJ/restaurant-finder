import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import Restaurants from "../components/Restaurants";

export default function Home() {
  return (
    <>
      <Header />
      <AddRestaurant />
      <Restaurants />
    </>
  );
}

export function homeLoader() {
  return fetch("/api/restaurants");
}
