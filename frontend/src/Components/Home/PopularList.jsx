import React from "react";
import ProductCard from "../Reausable/ProductCards/ProductCard";
import bird from "../../Assets/Popular/bird.png";
import card from "../../Assets/Popular/card.png";
import frame from "../../Assets/Popular/Frame.png";
import infi_Mirror from "../../Assets/Popular/infinite.png";

const products = [
  {
    id: 1,
    name: "Beautiful custom clothes for your feathered friends",
    image: bird,
    price: "500",
    disc_price: "300",
    rating: 4.5,
    reviews: 10,
  },
  {
    id: 2,
    name: "Personalized greeting cards for every occasion",
    image: card,
    price: "250",
    disc_price: "100",
    rating: 3.5,
    reviews: 8,
  },
  {
    id: 3,
    name: "Photo frames that light up your favorite moments",
    image: frame,
    price: "1999",
    disc_price: "999",
    rating: 5.0,
    reviews: 15,
  },
  {
    id: 4,
    name: "A mesmerizing mirror with infinite reflections.",
    image: infi_Mirror,
    price: "500",
    disc_price: "800",
    rating: 2.5,
    reviews: 5,
  },
];

function PopularList() {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          disc_price={product.disc_price}
          rating={product.rating}
          reviews={product.reviews}
        />
      ))}
    </div>
  );
}

export default PopularList;
