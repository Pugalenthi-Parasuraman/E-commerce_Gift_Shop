import React from "react";
import HomeCard from "../Reausable/ProductCards/HomeCard";
import Birthday from "../../Assets/Occasion/Birthday.jpg";
import Valentaine from "../../Assets/Occasion/Valentine.jpg";
import Wedding from "../../Assets/Occasion/Wedding.jpg";
import Anniversary from "../../Assets/Occasion/Anniversery.jpg";
import chirstmas from "../../Assets/Occasion/Chirstmas.jpg";

const cards = [
  {
    id: 1,
    name: "Birthday",
    image: Birthday,
    rating: 5,
    reviews: 16,
  },
  {
    id: 2,
    name: "Valentine",
    image: Valentaine,
    rating: 4.5,
    reviews: 20,
  },
  {
    id: 3,
    name: "Wedding",
    image: Wedding,
    rating: 3,
    reviews: 10,
  },
  {
    id: 4,
    name: "Anniversary",
    image: Anniversary,
    rating: 3.5,
    reviews: 5,
  },
  {
    id: 5,
    name: "Chirstmas",
    image: chirstmas,
    rating: 4,
    reviews: 12,
  },
];

function OccasionCard() {
  return (
    <div className="products flex items-center justify-center flex-wrap gap-5">
      {cards.map((card) => (
        <HomeCard
          key={card.id}
          name={card.name}
          image={card.image}
          rating={card.rating}
          reviews={card.reviews}
        />
      ))}
    </div>
  );
}

export default OccasionCard;
