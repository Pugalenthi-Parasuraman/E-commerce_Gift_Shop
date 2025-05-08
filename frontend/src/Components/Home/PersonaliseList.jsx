import React from "react";
import ProductCard from "../Reausable/ProductCards/ProductCard";
import date from "../../Assets/Personalized/Personal Date.jpg";
import embraydory from "../../Assets/Personalized/embraydory.png";
import lamp from "../../Assets/Personalized/Led Lamp.jpg";
import qube from "../../Assets/Personalized/qube.png";
import led from "../../Assets/Personalized/led.png";


const products = [
  {
    id: 1,
    name: "Special Dates Personalized Wooden Photo Frame",
    image: date,
    price: "600",
    disc_price: "400",
    rating: 4.5,
    reviews: 16,
  },
  {
    id: 2,
    name: "Lovely Colorful And Beige Embroidery Birds",
    image: embraydory,
    price: "850",
    disc_price: "1200",
    rating: 5,
    reviews: 7,
  },
  {
    id: 3,
    name: "Love You Mom - Personalized LED Lamp",
    image: lamp,
    price: "950",
    disc_price: "1500",
    rating: 4.0,
    reviews: 5,
  },
  {
    id: 4,
    name: "Favourite Person Personalized Photo Cube",
    image: qube,
    price: "200",
    disc_price: "500",
    rating: 3.5,
    reviews: 8,
  },
  {
    id: 5,
    name: "Welcome Home - Personalized LED Name Plate",
    image: led,
    price: "600",
    disc_price: "800",
    rating: 3,
    reviews: 14,
  },
];

function PersonaliseList() {
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

export default PersonaliseList;
